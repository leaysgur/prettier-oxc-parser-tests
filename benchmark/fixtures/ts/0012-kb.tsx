// 中サイズのTSXファイル
// 参考: フォームライブラリから抽出

import React, { useState, useEffect, useCallback, useMemo } from 'react';

// 型定義
export type FieldValue = string | number | boolean | null | undefined;
export type FieldValues = Record<string, FieldValue>;

export type FormErrors<T> = {
  [K in keyof T]?: string;
};

export type FieldValidator<T> = (value: T, allValues: FieldValues) => string | undefined;
export type FormValidator<T> = (values: T) => FormErrors<T>;

export interface FieldProps {
  name: string;
  label?: string;
  value: FieldValue;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
}

export interface FormProps<T extends FieldValues> {
  initialValues: T;
  onSubmit: (values: T) => void;
  validate?: FormValidator<T>;
  children: (props: FormRenderProps<T>) => React.ReactNode;
}

export interface FormRenderProps<T extends FieldValues> {
  values: T;
  errors: FormErrors<T>;
  touched: Record<keyof T, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
  getFieldProps: (name: keyof T) => FieldProps;
  handleSubmit: (e: React.FormEvent) => void;
  setFieldValue: (name: keyof T, value: FieldValue) => void;
  setFieldTouched: (name: keyof T, touched: boolean) => void;
  resetForm: () => void;
}

// フォームコンポーネント
export function Form<T extends FieldValues>({
  initialValues,
  onSubmit,
  validate,
  children,
}: FormProps<T>) {
  // フォームの状態
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(() => {
    const initialTouched: Partial<Record<keyof T, boolean>> = {};
    for (const key in initialValues) {
      initialTouched[key] = false;
    }
    return initialTouched as Record<keyof T, boolean>;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // フォームのバリデーション
  const validateForm = useCallback(() => {
    if (!validate) return {};
    return validate(values);
  }, [values, validate]);

  // フォームが有効かどうか
  const isValid = useMemo(() => {
    const validationErrors = validateForm();
    return Object.keys(validationErrors).length === 0;
  }, [validateForm]);

  // フィールドのプロパティを取得
  const getFieldProps = useCallback(
    (name: keyof T) => {
      return {
        name: name as string,
        value: values[name],
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          const { value: newValue, type, checked } = e.target;
          let fieldValue: FieldValue;

          // 入力タイプに基づいて値を変換
          if (type === 'checkbox') {
            fieldValue = checked;
          } else if (type === 'number') {
            fieldValue = newValue === '' ? '' : Number(newValue);
          } else {
            fieldValue = newValue;
          }

          setValues((prev) => ({ ...prev, [name]: fieldValue }));
        },
        onBlur: () => {
          setTouched((prev) => ({ ...prev, [name]: true }));
        },
        error: touched[name] ? errors[name] : undefined,
        touched: touched[name],
      };
    },
    [values, errors, touched]
  );

  // フィールドの値を直接設定
  const setFieldValue = useCallback((name: keyof T, value: FieldValue) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  // フィールドのタッチ状態を設定
  const setFieldTouched = useCallback((name: keyof T, isTouched: boolean) => {
    setTouched((prev) => ({ ...prev, [name]: isTouched }));
  }, []);

  // フォームをリセット
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched(() => {
      const resetTouched: Partial<Record<keyof T, boolean>> = {};
      for (const key in initialValues) {
        resetTouched[key] = false;
      }
      return resetTouched as Record<keyof T, boolean>;
    });
  }, [initialValues]);

  // フォーム送信ハンドラー
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      
      // すべてのフィールドをタッチ済みにする
      const allTouched: Partial<Record<keyof T, boolean>> = {};
      for (const key in values) {
        allTouched[key] = true;
      }
      setTouched(allTouched as Record<keyof T, boolean>);
      
      // バリデーションエラーをチェック
      const validationErrors = validateForm();
      setErrors(validationErrors);
      
      if (Object.keys(validationErrors).length === 0) {
        setIsSubmitting(true);
        onSubmit(values);
      }
    },
    [values, validateForm, onSubmit]
  );

  // バリデーションエラーを更新
  useEffect(() => {
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
    }
  }, [values, validate]);

  // 送信完了後にフラグをリセット
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSubmitting) {
      timer = setTimeout(() => {
        setIsSubmitting(false);
      }, 500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isSubmitting]);

  // 子コンポーネントにレンダープロップスを渡す
  return children({
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    getFieldProps,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    resetForm,
  });
}

// 入力フィールドコンポーネント
export const TextField: React.FC<{
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
} & FieldProps> = ({
  label,
  type = 'text',
  placeholder,
  required = false,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
}) => {
  return (
    <div className="form-field">
      <label className="form-label" htmlFor={name}>
        {label}
        {required && <span className="required-mark">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value as string}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`form-input ${touched && error ? 'input-error' : ''}`}
      />
      {touched && error && <div className="error-message">{error}</div>}
    </div>
  );
};

// チェックボックスフィールドコンポーネント
export const CheckboxField: React.FC<{
  label: string;
  required?: boolean;
} & FieldProps> = ({
  label,
  required = false,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
}) => {
  return (
    <div className="form-field checkbox-field">
      <div className="checkbox-container">
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={Boolean(value)}
          onChange={onChange}
          onBlur={onBlur}
          className={`form-checkbox ${touched && error ? 'input-error' : ''}`}
        />
        <label className="form-label checkbox-label" htmlFor={name}>
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      </div>
      {touched && error && <div className="error-message">{error}</div>}
    </div>
  );
};

// 選択フィールドコンポーネント
export const SelectField: React.FC<{
  label: string;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
} & Omit<FieldProps, 'onChange'> & {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({
  label,
  options,
  required = false,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
}) => {
  return (
    <div className="form-field">
      <label className="form-label" htmlFor={name}>
        {label}
        {required && <span className="required-mark">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value as string}
        onChange={onChange}
        onBlur={onBlur}
        className={`form-select ${touched && error ? 'input-error' : ''}`}
      >
        <option value="">選択してください</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {touched && error && <div className="error-message">{error}</div>}
    </div>
  );
};

// 使用例
export const SignupForm: React.FC = () => {
  // フォームの初期値
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  };

  // フォームのバリデーション
  const validate = (values: typeof initialValues) => {
    const errors: FormErrors<typeof initialValues> = {};

    if (!values.firstName) {
      errors.firstName = '名を入力してください';
    }

    if (!values.lastName) {
      errors.lastName = '姓を入力してください';
    }

    if (!values.email) {
      errors.email = 'メールアドレスを入力してください';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = '有効なメールアドレスを入力してください';
    }

    if (!values.password) {
      errors.password = 'パスワードを入力してください';
    } else if (values.password.length < 8) {
      errors.password = 'パスワードは8文字以上である必要があります';
    }

    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'パスワードが一致しません';
    }

    if (!values.acceptTerms) {
      errors.acceptTerms = '利用規約に同意する必要があります';
    }

    return errors;
  };

  // フォーム送信ハンドラー
  const handleSubmit = (values: typeof initialValues) => {
    console.log('Form submitted with values:', values);
    // ここでAPIリクエストなどを行う
    alert('フォームが送信されました');
  };

  return (
    <div className="signup-form-container">
      <h2>アカウント登録</h2>
      <Form
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          isValid,
          isSubmitting,
          getFieldProps,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-row">
              <TextField
                label="姓"
                required
                {...getFieldProps('lastName')}
              />
              <TextField
                label="名"
                required
                {...getFieldProps('firstName')}
              />
            </div>
            
            <TextField
              label="メールアドレス"
              type="email"
              required
              {...getFieldProps('email')}
            />
            
            <TextField
              label="パスワード"
              type="password"
              required
              {...getFieldProps('password')}
            />
            
            <TextField
              label="パスワード（確認）"
              type="password"
              required
              {...getFieldProps('confirmPassword')}
            />
            
            <CheckboxField
              label="利用規約に同意します"
              required
              {...getFieldProps('acceptTerms')}
            />
            
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? '送信中...' : '登録する'}
            </button>
          </form>
        )}
      </Form>
    </div>
  );
};