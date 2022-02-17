interface IFormInput {
  onChange: (...event: any[]) => void;
  onBlur?: () => void;
  value: string | number | undefined;
  name: string;
  placeholder?: string;
  label?: string | any;
  type?: 'text' | 'number' | 'password';
  maxlength?: number;
  error?: { type: string; message?: string } | string;
  className?: string;
  ref?: any;
  disabled?: boolean;
  handlerBlur?: (name: string) => void;
}

interface IFormCheckbox {
  name: string;
  label: string | any;
  checked?: boolean;
  value?: boolean | number | string;
  disabled?: boolean;
  onChange: (...event: any[]) => void;
  title?: string;
  error?: { type: string } | string;
}

interface ISliderMark {
  value: number;
  valueReal: number;
  label: string;
}

interface ICheckBox<T = {}> {
  name: keyof T;
  label: string;
}

interface IOption {
  label: string;
  value: string | number;
}

interface WithTermsAndConditions {
  terms_and_conditions?: boolean;
}

declare global {
  IFormInput;
  ISliderMark;
  ICheckBox;
  IFormCheckbox;
  IOption;
}
