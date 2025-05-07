// 大きめのTypeScriptファイル
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

// 型定義
export type SortDirection = 'asc' | 'desc';
export type FilterOperator = 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'startsWith' | 'endsWith' | 'in' | 'nin';

export interface SortConfig {
  field: string;
  direction: SortDirection;
}

export interface FilterConfig {
  field: string;
  operator: FilterOperator;
  value: any;
}

export interface PaginationConfig {
  page: number;
  pageSize: number;
}

export interface DataFetcherConfig<T> {
  baseUrl: string;
  resource: string;
  defaultSort?: SortConfig;
  defaultFilter?: FilterConfig[];
  defaultPagination?: PaginationConfig;
  transformResponse?: (data: any) => T[];
  headers?: Record<string, string>;
  onError?: (error: Error) => void;
  cache?: boolean;
  cacheTTL?: number;
  polling?: number;
  enableWebSockets?: boolean;
  webSocketUrl?: string;
  idField?: string;
  queryParams?: Record<string, string | number | boolean>;
  authToken?: string | (() => string | Promise<string>);
}

export interface FetchState<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
  totalItems: number;
  sort: SortConfig;
  filter: FilterConfig[];
  pagination: PaginationConfig;
  lastUpdated: Date | null;
}

export interface DataFetcherActions<T> {
  fetch: () => Promise<void>;
  sort: (config: SortConfig) => void;
  filter: (config: FilterConfig[]) => void;
  paginate: (config: PaginationConfig) => void;
  refresh: () => Promise<void>;
  update: (id: string | number, data: Partial<T>) => Promise<T>;
  create: (data: Partial<T>) => Promise<T>;
  remove: (id: string | number) => Promise<void>;
  cancelRequest: () => void;
  invalidateCache: () => void;
}

export type DataFetcherResult<T> = [FetchState<T>, DataFetcherActions<T>];

// キャッシュマネージャー
class CacheManager {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private defaultTTL: number = 5 * 60 * 1000; // デフォルトのTTL: 5分

  set(key: string, data: any, ttl: number = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now() + ttl,
    });
  }

  get(key: string): any | null {
    const cachedItem = this.cache.get(key);
    
    if (!cachedItem) {
      return null;
    }
    
    if (Date.now() > cachedItem.timestamp) {
      this.cache.delete(key);
      return null;
    }
    
    return cachedItem.data;
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }

  invalidateAll(): void {
    this.cache.clear();
  }

  getKeys(): string[] {
    return Array.from(this.cache.keys());
  }
}

// グローバルキャッシュインスタンス
const globalCache = new CacheManager();

// メインフック
export function useDataFetcher<T>(config: DataFetcherConfig<T>): DataFetcherResult<T> {
  // デフォルト値をマージ
  const {
    baseUrl,
    resource,
    defaultSort = { field: 'id', direction: 'asc' },
    defaultFilter = [],
    defaultPagination = { page: 1, pageSize: 10 },
    transformResponse = (data) => data as T[],
    headers = {},
    onError = console.error,
    cache = false,
    cacheTTL = 5 * 60 * 1000, // 5分
    polling = 0,
    enableWebSockets = false,
    webSocketUrl = '',
    idField = 'id',
    queryParams = {},
    authToken,
  } = config;

  // 状態
  const [state, setState] = useState<FetchState<T>>({
    data: [],
    loading: true,
    error: null,
    totalItems: 0,
    sort: defaultSort,
    filter: defaultFilter,
    pagination: defaultPagination,
    lastUpdated: null,
  });

  // AbortControllerを保持するためのref
  const abortControllerRef = useRef<AbortController | null>(null);

  // WebSocketインスタンスを保持するためのref
  const webSocketRef = useRef<WebSocket | null>(null);

  // ポーリングタイマーを保持するためのref
  const pollingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // クエリパラメータを構築
  const buildQueryParams = useCallback(() => {
    const params = new URLSearchParams();
    
    // ソート
    params.append('_sort', state.sort.field);
    params.append('_order', state.sort.direction);
    
    // ページネーション
    params.append('_page', String(state.pagination.page));
    params.append('_limit', String(state.pagination.pageSize));
    
    // フィルター
    state.filter.forEach((filter) => {
      if (filter.operator === 'eq') {
        params.append(filter.field, String(filter.value));
      } else {
        params.append(`${filter.field}_${filter.operator}`, String(filter.value));
      }
    });
    
    // 追加のクエリパラメータ
    Object.entries(queryParams).forEach(([key, value]) => {
      params.append(key, String(value));
    });
    
    return params.toString();
  }, [state.sort, state.pagination, state.filter, queryParams]);

  // キャッシュキーを生成
  const getCacheKey = useCallback(() => {
    return `${baseUrl}/${resource}?${buildQueryParams()}`;
  }, [baseUrl, resource, buildQueryParams]);

  // 認証トークンを取得
  const getAuthToken = useCallback(async () => {
    if (!authToken) return null;
    
    if (typeof authToken === 'function') {
      return await authToken();
    }
    
    return authToken;
  }, [authToken]);

  // ヘッダーを構築
  const buildHeaders = useCallback(async () => {
    const token = await getAuthToken();
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    };
    
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
    
    return defaultHeaders;
  }, [headers, getAuthToken]);

  // データをフェッチする関数
  const fetchData = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      
      // 以前のリクエストをキャンセル
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      // 新しいAbortControllerを作成
      abortControllerRef.current = new AbortController();
      
      // キャッシュから取得を試みる
      const cacheKey = getCacheKey();
      if (cache) {
        const cachedData = globalCache.get(cacheKey);
        if (cachedData) {
          setState((prev) => ({
            ...prev,
            data: cachedData.data,
            totalItems: cachedData.totalItems,
            loading: false,
            lastUpdated: new Date(),
          }));
          return;
        }
      }
      
      // URLを構築
      const url = `${baseUrl}/${resource}?${buildQueryParams()}`;
      
      // リクエストヘッダーを構築
      const requestHeaders = await buildHeaders();
      
      // データをフェッチ
      const response = await fetch(url, {
        method: 'GET',
        headers: requestHeaders,
        signal: abortControllerRef.current.signal,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // レスポンスデータを取得
      const responseData = await response.json();
      
      // 総アイテム数を取得
      const totalItems = response.headers.get('X-Total-Count')
        ? parseInt(response.headers.get('X-Total-Count') || '0', 10)
        : responseData.length;
      
      // データを変換
      const transformedData = transformResponse(responseData);
      
      // 状態を更新
      setState((prev) => ({
        ...prev,
        data: transformedData,
        totalItems,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      }));
      
      // キャッシュに保存
      if (cache) {
        globalCache.set(
          getCacheKey(),
          { data: transformedData, totalItems },
          cacheTTL
        );
      }
    } catch (error) {
      // AbortErrorの場合は無視
      if (error.name === 'AbortError') {
        return;
      }
      
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error as Error,
      }));
      
      onError(error as Error);
    }
  }, [
    baseUrl,
    resource,
    buildQueryParams,
    buildHeaders,
    transformResponse,
    onError,
    cache,
    cacheTTL,
    getCacheKey,
  ]);

  // データを更新する関数
  const updateData = useCallback(
    async (id: string | number, data: Partial<T>): Promise<T> => {
      try {
        // リクエストヘッダーを構築
        const requestHeaders = await buildHeaders();
        
        // URLを構築
        const url = `${baseUrl}/${resource}/${id}`;
        
        // データを更新
        const response = await fetch(url, {
          method: 'PATCH',
          headers: requestHeaders,
          body: JSON.stringify(data),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // 更新されたデータを取得
        const updatedData = await response.json();
        
        // キャッシュを無効化
        if (cache) {
          globalCache.invalidate(getCacheKey());
        }
        
        // データを再取得
        fetchData();
        
        return updatedData;
      } catch (error) {
        onError(error as Error);
        throw error;
      }
    },
    [baseUrl, resource, buildHeaders, fetchData, cache, getCacheKey, onError]
  );

  // データを作成する関数
  const createData = useCallback(
    async (data: Partial<T>): Promise<T> => {
      try {
        // リクエストヘッダーを構築
        const requestHeaders = await buildHeaders();
        
        // URLを構築
        const url = `${baseUrl}/${resource}`;
        
        // データを作成
        const response = await fetch(url, {
          method: 'POST',
          headers: requestHeaders,
          body: JSON.stringify(data),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // 作成されたデータを取得
        const createdData = await response.json();
        
        // キャッシュを無効化
        if (cache) {
          globalCache.invalidate(getCacheKey());
        }
        
        // データを再取得
        fetchData();
        
        return createdData;
      } catch (error) {
        onError(error as Error);
        throw error;
      }
    },
    [baseUrl, resource, buildHeaders, fetchData, cache, getCacheKey, onError]
  );

  // データを削除する関数
  const removeData = useCallback(
    async (id: string | number): Promise<void> => {
      try {
        // リクエストヘッダーを構築
        const requestHeaders = await buildHeaders();
        
        // URLを構築
        const url = `${baseUrl}/${resource}/${id}`;
        
        // データを削除
        const response = await fetch(url, {
          method: 'DELETE',
          headers: requestHeaders,
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // キャッシュを無効化
        if (cache) {
          globalCache.invalidate(getCacheKey());
        }
        
        // データを再取得
        fetchData();
      } catch (error) {
        onError(error as Error);
        throw error;
      }
    },
    [baseUrl, resource, buildHeaders, fetchData, cache, getCacheKey, onError]
  );

  // ソートを変更する関数
  const sortData = useCallback((sortConfig: SortConfig) => {
    setState((prev) => ({
      ...prev,
      sort: sortConfig,
    }));
  }, []);

  // フィルターを変更する関数
  const filterData = useCallback((filterConfig: FilterConfig[]) => {
    setState((prev) => ({
      ...prev,
      filter: filterConfig,
      // フィルターが変更されたら最初のページに戻る
      pagination: {
        ...prev.pagination,
        page: 1,
      },
    }));
  }, []);

  // ページネーションを変更する関数
  const paginateData = useCallback((paginationConfig: PaginationConfig) => {
    setState((prev) => ({
      ...prev,
      pagination: paginationConfig,
    }));
  }, []);

  // リクエストをキャンセルする関数
  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  // キャッシュを無効化する関数
  const invalidateCache = useCallback(() => {
    if (cache) {
      globalCache.invalidate(getCacheKey());
    }
  }, [cache, getCacheKey]);

  // WebSocketに接続する関数
  const connectWebSocket = useCallback(() => {
    if (!enableWebSockets || !webSocketUrl) return;
    
    // 既存の接続を閉じる
    if (webSocketRef.current) {
      webSocketRef.current.close();
    }
    
    // 新しい接続を作成
    const ws = new WebSocket(webSocketUrl);
    
    ws.onopen = () => {
      console.log('WebSocket connected');
      // リソースをサブスクライブ
      ws.send(JSON.stringify({ action: 'subscribe', resource }));
    };
    
    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        
        if (message.type === 'update' && message.resource === resource) {
          // データが更新された場合はキャッシュを無効化してデータを再取得
          if (cache) {
            globalCache.invalidate(getCacheKey());
          }
          fetchData();
        }
      } catch (error) {
        console.error('WebSocket message parsing error:', error);
      }
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    ws.onclose = () => {
      console.log('WebSocket disconnected');
      // 接続が閉じられたら再接続を試みる
      setTimeout(connectWebSocket, 5000);
    };
    
    webSocketRef.current = ws;
  }, [enableWebSockets, webSocketUrl, resource, cache, getCacheKey, fetchData]);

  // ポーリングを開始する関数
  const startPolling = useCallback(() => {
    if (polling <= 0) return;
    
    // 既存のタイマーをクリア
    if (pollingTimerRef.current) {
      clearInterval(pollingTimerRef.current);
    }
    
    // 新しいタイマーを設定
    pollingTimerRef.current = setInterval(fetchData, polling);
  }, [polling, fetchData]);

  // マウント/アンマウント時の処理
  useEffect(() => {
    // 初回データ取得
    fetchData();
    
    // WebSocketに接続
    if (enableWebSockets) {
      connectWebSocket();
    }
    
    // ポーリングを開始
    if (polling > 0) {
      startPolling();
    }
    
    // クリーンアップ関数
    return () => {
      // リクエストをキャンセル
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      // WebSocket接続を閉じる
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
      
      // ポーリングタイマーをクリア
      if (pollingTimerRef.current) {
        clearInterval(pollingTimerRef.current);
      }
    };
  }, [fetchData, enableWebSockets, connectWebSocket, polling, startPolling]);

  // 依存関係が変更されたときにデータを再取得
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // アクション
  const actions: DataFetcherActions<T> = useMemo(
    () => ({
      fetch: fetchData,
      sort: sortData,
      filter: filterData,
      paginate: paginateData,
      refresh: fetchData,
      update: updateData,
      create: createData,
      remove: removeData,
      cancelRequest,
      invalidateCache,
    }),
    [
      fetchData,
      sortData,
      filterData,
      paginateData,
      updateData,
      createData,
      removeData,
      cancelRequest,
      invalidateCache,
    ]
  );

  return [state, actions];
}

// 使用例
function usersExample() {
  interface User {
    id: number;
    name: string;
    email: string;
    role: string;
  }

  const [state, actions] = useDataFetcher<User>({
    baseUrl: 'https://api.example.com',
    resource: 'users',
    defaultSort: { field: 'name', direction: 'asc' },
    defaultFilter: [{ field: 'role', operator: 'eq', value: 'admin' }],
    defaultPagination: { page: 1, pageSize: 20 },
    cache: true,
    cacheTTL: 10 * 60 * 1000, // 10分
    polling: 60 * 1000, // 1分ごとにポーリング
    idField: 'id',
  });

  // 状態へのアクセス
  const { data, loading, error, totalItems, pagination } = state;

  // ソートの更新
  const handleSort = (field: string, direction: SortDirection) => {
    actions.sort({ field, direction });
  };

  // フィルターの更新
  const handleFilter = (role: string) => {
    actions.filter([{ field: 'role', operator: 'eq', value: role }]);
  };

  // ページネーションの更新
  const handlePageChange = (page: number) => {
    actions.paginate({ ...pagination, page });
  };

  // ユーザーの作成
  const handleCreateUser = async (userData: Partial<User>) => {
    const newUser = await actions.create(userData);
    console.log('Created user:', newUser);
  };

  // ユーザーの更新
  const handleUpdateUser = async (id: number, userData: Partial<User>) => {
    const updatedUser = await actions.update(id, userData);
    console.log('Updated user:', updatedUser);
  };

  // ユーザーの削除
  const handleDeleteUser = async (id: number) => {
    await actions.remove(id);
    console.log('User deleted');
  };

  // 手動での更新
  const handleRefresh = () => {
    actions.refresh();
  };

  // キャッシュの無効化
  const handleInvalidateCache = () => {
    actions.invalidateCache();
  };
}

// その他のユーティリティ関数
export function formatData<T>(data: T[], formatter: (item: T) => any): any[] {
  return data.map(formatter);
}

export function filterData<T>(
  data: T[],
  filters: FilterConfig[]
): T[] {
  return data.filter((item) => {
    return filters.every((filter) => {
      const { field, operator, value } = filter;
      const itemValue = (item as any)[field];

      switch (operator) {
        case 'eq':
          return itemValue === value;
        case 'neq':
          return itemValue !== value;
        case 'gt':
          return itemValue > value;
        case 'gte':
          return itemValue >= value;
        case 'lt':
          return itemValue < value;
        case 'lte':
          return itemValue <= value;
        case 'contains':
          return String(itemValue).includes(String(value));
        case 'startsWith':
          return String(itemValue).startsWith(String(value));
        case 'endsWith':
          return String(itemValue).endsWith(String(value));
        case 'in':
          return Array.isArray(value) && value.includes(itemValue);
        case 'nin':
          return Array.isArray(value) && !value.includes(itemValue);
        default:
          return true;
      }
    });
  });
}

export function sortData<T>(
  data: T[],
  { field, direction }: SortConfig
): T[] {
  return [...data].sort((a, b) => {
    const aValue = (a as any)[field];
    const bValue = (b as any)[field];

    if (aValue === bValue) return 0;

    const comparison = aValue < bValue ? -1 : 1;
    return direction === 'asc' ? comparison : -comparison;
  });
}

export function paginateData<T>(
  data: T[],
  { page, pageSize }: PaginationConfig
): T[] {
  const startIndex = (page - 1) * pageSize;
  return data.slice(startIndex, startIndex + pageSize);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (this: any, ...args: Parameters<T>) {
    const context = this;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  let lastFunc: NodeJS.Timeout;
  let lastRan: number;

  return function (this: any, ...args: Parameters<T>) {
    const context = this;

    if (!inThrottle) {
      func.apply(context, args);
      lastRan = Date.now();
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// APIキー管理
class ApiKeyManager {
  private static instance: ApiKeyManager;
  private apiKeys: Map<string, string> = new Map();

  private constructor() {}

  public static getInstance(): ApiKeyManager {
    if (!ApiKeyManager.instance) {
      ApiKeyManager.instance = new ApiKeyManager();
    }
    return ApiKeyManager.instance;
  }

  public setApiKey(service: string, key: string): void {
    this.apiKeys.set(service, key);
  }

  public getApiKey(service: string): string | undefined {
    return this.apiKeys.get(service);
  }

  public removeApiKey(service: string): void {
    this.apiKeys.delete(service);
  }

  public clearAllApiKeys(): void {
    this.apiKeys.clear();
  }
}

export const apiKeyManager = ApiKeyManager.getInstance();

// エラーリポーティング
class ErrorReporter {
  private static instance: ErrorReporter;
  private errors: Error[] = [];
  private maxErrors: number = 50;
  private reportingEndpoint: string | null = null;

  private constructor() {}

  public static getInstance(): ErrorReporter {
    if (!ErrorReporter.instance) {
      ErrorReporter.instance = new ErrorReporter();
    }
    return ErrorReporter.instance;
  }

  public setReportingEndpoint(endpoint: string): void {
    this.reportingEndpoint = endpoint;
  }

  public captureError(error: Error): void {
    this.errors.push(error);
    
    // エラースタックが大きくなりすぎないように管理
    if (this.errors.length > this.maxErrors) {
      this.errors.shift();
    }
    
    // エラーを報告
    this.reportError(error);
  }

  private async reportError(error: Error): Promise<void> {
    if (!this.reportingEndpoint) return;
    
    try {
      await fetch(this.reportingEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (e) {
      console.error('Failed to report error:', e);
    }
  }

  public getErrors(): Error[] {
    return [...this.errors];
  }

  public clearErrors(): void {
    this.errors = [];
  }
}

export const errorReporter = ErrorReporter.getInstance();