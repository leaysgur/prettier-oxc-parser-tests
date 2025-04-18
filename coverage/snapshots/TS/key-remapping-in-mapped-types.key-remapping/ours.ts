type MappedTypeWithNewKeys<T> = {
  readonly [K in keyof T as NewKeyType]?: T[K];
};

type RemoveKindField<T> = {
  readonly [K in keyof T as Exclude<K, "kind">]?: T[K];
};

type PickByValueType<T, U> = {
  readonly [K in keyof T as T[K] extends U ? K : never]?: T[K];
};
