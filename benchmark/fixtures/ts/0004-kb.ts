// このファイルは型定義を含む中サイズのTypeScriptファイルです

import { ReactNode, ComponentType, ComponentProps } from 'react';

// 基本的な型定義
export type Size = 'small' | 'medium' | 'large';
export type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type Alignment = 'left' | 'center' | 'right';

// 複合的な型定義
export interface BaseProps {
  className?: string;
  id?: string;
  testId?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  hidden?: boolean;
}

// オブジェクト型で定義されたProps
export interface ButtonProps extends BaseProps {
  variant?: Variant;
  size?: Size;
  rounded?: boolean;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  iconSpacing?: number;
  spinner?: ComponentType<any>;
  spinnerPlacement?: 'start' | 'end';
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// ユーティリティ関数
export function omit<T extends Record<string, any>, K extends keyof T>(
  object: T, 
  keys: K[]
): Omit<T, K> {
  const result = { ...object } as Record<string, any>;
  for (const key of keys) {
    delete result[key as string];
  }
  return result as Omit<T, K>;
}

export function pick<T extends Record<string, any>, K extends keyof T>(
  object: T, 
  keys: K[]
): Pick<T, K> {
  const result = {} as Record<string, any>;
  for (const key of keys) {
    if (key in object) {
      result[key as string] = object[key];
    }
  }
  return result as Pick<T, K>;
}

// 型ヘルパー
export type As<P = any> = React.ElementType<P>;

export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T>;

export type OmitCommonProps<
  Target,
  OmitAdditionalProps extends keyof any = never
> = Omit<
  Target,
  'as' | 'color' | 'h' | 'height' | 'size' | 'w' | 'width' | OmitAdditionalProps
>;

export type RightJoinProps<
  InjectProps extends object = {},
  OverrideProps extends object = {}
> = OmitCommonProps<InjectProps, keyof OverrideProps> & OverrideProps;

export type MergeWithAs<
  ComponentProps extends object,
  AsProps extends object,
  AdditionalProps extends object = {},
  AsComponent extends As = As
> = RightJoinProps<ComponentProps, AdditionalProps> & {
  as?: AsComponent;
} & RightJoinProps<AsProps, AdditionalProps>;

export type ComponentWithAs<Component extends As, Props extends object = {}> = {
  <AsComponent extends As = Component>(
    props: MergeWithAs<
      React.ComponentPropsWithoutRef<Component>,
      React.ComponentPropsWithoutRef<AsComponent>,
      Props,
      AsComponent
    >
  ): JSX.Element;

  displayName?: string;
  propTypes?: React.WeakValidationMap<any>;
  contextTypes?: React.ValidationMap<any>;
  defaultProps?: Partial<any>;
  id?: string;
};

// 実際のユーティリティ関数
export function filterUndefined<T extends Record<string, any>>(object: T): T {
  const result = {} as Record<string, any>;
  
  for (const key in object) {
    if (object[key] !== undefined) {
      result[key] = object[key];
    }
  }
  
  return result as T;
}

export function deepmerge<T extends Record<string, any>>(
  target: T,
  source: T
): T {
    let result: Record<string, any> = { ...target };
    
    for (const key in source) {
        const targetValue = target[key];
        const sourceValue = source[key];
        
        if (
            isObject(targetValue) &&
            isObject(sourceValue) &&
            !Array.isArray(targetValue) &&
            !Array.isArray(sourceValue)
        ) {
            result[key] = deepmerge(targetValue, sourceValue);
        } else if (sourceValue !== undefined) {
            result[key] = sourceValue;
        }
    }
    
    return result as T;
}

function isObject(value: any): boolean {
  return value !== null && typeof value === 'object';
}

const cache = new Map<string, boolean>();

export function memoizedGet<T>(
  object: T,
  path: string | string[],
  defaultValue?: any
): any {
  const cacheKey = Array.isArray(path) ? path.join('.') : path;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const keys = Array.isArray(path) ? path : path.split('.');
  let result: any = object;

  for (let i = 0; i < keys.length; i++) {
    if (result == null) {
      result = defaultValue;
      break;
    }
    result = (result as Record<string, any>)[keys[i]];
  }

  result = result === undefined ? defaultValue : result;
  cache.set(cacheKey, result);
  return result;
}