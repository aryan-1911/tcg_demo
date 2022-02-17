import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

interface IFormTextArea extends IFormInput {
  rowsMax?: number;
  handleChangeField?: (e: any, fieldName: string) => void;
}

export const FormTextArea = React.forwardRef<
  HTMLTextAreaElement,
  IFormTextArea
>((props, ref) => {
  const {
    label,
    placeholder,
    name,
    onBlur,
    onChange,
    value,
    rowsMax = 4,
    error = 'Error',
    handleChangeField,
  } = props;

  const displayError = () => {
    if (error.hasOwnProperty('type')) {
      return typeof error === 'object' && error?.type === 'required'
        ? 'Field Should Not Be Empty'
        : 'Email is invalid';
    }
  };

  const handleChange = (e: any) => {
    handleChangeField && handleChangeField(e.target.value, name);

    onChange(e);
  };

  return (
    <div
      className={`text-area-box${
        error.hasOwnProperty('type') ? ' error-field' : ''
      }`}
    >
      <label className="input-label" htmlFor={name}>
        {label}
      </label>
      <TextareaAutosize
        rowsMax={rowsMax}
        aria-label="maximum height"
        placeholder={placeholder}
        className="text-area-box__input"
        onChange={handleChange}
        name={name}
        value={value}
        ref={ref}
      />
      <div className="input-error">{displayError()}</div>
    </div>
  );
});
