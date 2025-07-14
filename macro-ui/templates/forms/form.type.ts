import {Control, FieldValues, Path, RegisterOptions} from 'react-hook-form';
import {
  CheckboxProps,
  InputProps,
  RadioProps,
  SelectProps,
  SelectType,
  SwitchProps,
  TextareaProps,
} from '../components';
import {ItemSelectType} from '../global';
import {TextAppProps} from '../typography';

export type RulesFormType<T extends FieldValues> = Omit<
  RegisterOptions<T, Path<T>>,
  'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
>;

export type FormAppType =
  | 'input'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'select'
  | 'textarea'
  | 'text';

export type FormFieldType<T extends FieldValues> =
  | InputFieldType<T>
  | CheckboxFieldType<T>
  | RadioFieldType<T>
  | SwitchFieldType<T>
  | SelectFieldType<T>
  | TextareaFieldType<T>
  | TextFieldType;

export type FieldsType<T extends FieldValues> = Array<
  FormFieldType<T> | Array<FormFieldType<T>>
>;

export type FormAppProps<T extends FieldValues> = {
  fields: FieldsType<T>;
  control: Control<T, any, T>;
};

export type FormFieldProps<T extends FieldValues> = {
  field: FormFieldType<T>;
  control: Control<T, any, T>;
  isRow: boolean;
};

type BaseFormField<T extends FieldValues, K extends FormAppType> = {
  type: K;
  name: Path<T>;
  title?: string;
  rules?: RulesFormType<T>;
  hide?: boolean;
  defaultValue?: any;
};

type BaseFormSelect = {
  options: Array<ItemSelectType>;
  direction?: 'row' | 'column';
};

export type InputFieldType<T extends FieldValues> = BaseFormField<T, 'input'> &
  Partial<Omit<InputProps, 'value' | 'onChangeText' | 'error'>>;

export type CheckboxFieldType<T extends FieldValues> = BaseFormField<
  T,
  'checkbox'
> &
  Partial<Omit<CheckboxProps, 'onChange' | 'checked' | 'label'>> &
  BaseFormSelect;

export type RadioFieldType<T extends FieldValues> = BaseFormField<T, 'radio'> &
  Partial<Omit<RadioProps, 'onChange' | 'checked' | 'label'>> &
  BaseFormSelect;

export type SwitchFieldType<T extends FieldValues> = BaseFormField<
  T,
  'switch'
> &
  Partial<Omit<SwitchProps, 'onChange' | 'checked' | 'label'>>;

export type SelectFieldType<T extends FieldValues> = BaseFormField<
  T,
  'select'
> &
  Partial<Omit<SelectProps, 'onChange' | 'values' | 'type' | 'keySheet'>> & {
    typeSelect?: SelectType;
  };

export type TextareaFieldType<T extends FieldValues> = BaseFormField<
  T,
  'textarea'
> &
  Partial<Omit<TextareaProps, 'value' | 'onChangeText' | 'error'>>;

export type TextFieldType = {
  type: 'text';
  name: string;
  hide?: boolean;
} & Partial<TextAppProps>;
