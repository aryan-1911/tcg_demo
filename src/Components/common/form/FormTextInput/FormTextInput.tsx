import { Icon, InputAdornment, TextField } from '@material-ui/core';
import React, { ReactElement } from 'react';
import InputMask from 'react-input-mask';
import './form-text-input.scss';

interface IFormTextInputProps extends IFormInput {
  preffix?: ReactElement;
  className?: string;
  inputMask?: string;
  isChecked?: boolean;
  maskChar?: string;
  handlerFocusDisabledInput?: () => void;
  handleChangeField?: (e: any, fieldName: string) => void;
}

export const FormTextInput = React.forwardRef<any, IFormTextInputProps>(
  (props, ref) => {
    const {
      label,
      className = '',
      placeholder,
      type = 'text',
      inputMask = '',
      maxlength,
      error = 'Error',
      isChecked,
      preffix,
      maskChar,
      handlerBlur,
      name,
      handlerFocusDisabledInput,
      handleChangeField,
      value,
      ...rest
    } = props;

    const displayError = () => {
      if (error.hasOwnProperty('type')) {
        if (typeof error === 'object' && error.message) {
          return error.message;
        }


        return typeof error === 'object' && error.type === 'required'
          ? 'Field Should Not Be Empty'
          : 'Email is invalid';
      }
    };

    const handleChange = (e: any) => {
      if (type === 'number') {
        props.onChange(e.target.valueAsNumber || '');
        return;
      }

      handleChangeField && handleChangeField(e.target.value, name);

      props.onChange(e);
    };

    return (
      <div
        className={`input-box ${className} ${
          error.hasOwnProperty('type') ? 'error-field' : ''
        }`}
      >
        {inputMask ? (
          <>
            <InputMask
              mask={inputMask}
              value={props.value}
              onChange={props.onChange}
              maskChar={maskChar}
              ref={ref}
              onBlur={handlerBlur ? () => handlerBlur(name) : undefined}
            >
              {() => (
                <TextField
                  label={label}
                  type={type}
                  placeholder={placeholder}
                  {...rest}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            </InputMask>
            <div className="input-error">{displayError()}</div>
          </>
        ) : (
          <>
            <TextField
              label={label}
              type={type}
              placeholder={placeholder}
              {...rest}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
              value={value}
              onBlur={handlerBlur ? () => handlerBlur(name) : undefined}
              onFocus={
                handlerFocusDisabledInput
                  ? () => handlerFocusDisabledInput()
                  : undefined
              }
              InputProps={{
                startAdornment: (
                  <>
                    {isChecked && props.value && (
                      <InputAdornment position="end">
                        <Icon className="icon-check_icon" />
                      </InputAdornment>
                    )}
                    {preffix && (
                      <InputAdornment position="start">
                        {preffix}
                      </InputAdornment>
                    )}
                  </>
                ),
              }}
              ref={ref}
            />
            <div className="input-error">{displayError()}</div>
          </>
        )}
      </div>
    );
  },
);
