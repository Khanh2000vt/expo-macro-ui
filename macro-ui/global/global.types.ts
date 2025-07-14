export type ItemSelectType<T extends object = {}> = {
  label: string;
  value: any;
} & Partial<T>;
