export interface ISelectOption<T> {
  key: T;
  value: T;
  label: string;
  disabled?: boolean;
}
