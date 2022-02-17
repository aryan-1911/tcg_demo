import {
  FormControl, IconButton, InputAdornment, TextField
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { AuthRoute } from 'const';
import React, { useState } from 'react';
import { FormPasswordTooltip } from './FormPasswordTooltip/FormPasswordTooltip';

interface IFormPasswordInput extends IFormInput {
  className?: string;
  isTooltipAvailable?: boolean;
  handleRedirect?: (path: string) => () => void;
  forgotPasswordTextShow?: boolean;
  changePosForTooltip?: string;
}

export const FormPasswordInput = React.forwardRef<
  HTMLDivElement,
  IFormPasswordInput
>((props, ref) => {
  const {
    label,
    placeholder,
    className,
    value,
    isTooltipAvailable = false,
    forgotPasswordTextShow = false,
    handleRedirect,
    error = '',
    changePosForTooltip,
    ...rest
  } = props;
  const [isShowPassword, setPasswordVisibility] = useState<boolean>(false);
  const [isTooltipVisible, setTooltipVisibility] = useState<boolean>(false);
  const inputType = isShowPassword ? 'text' : 'password';

  const handleShowPassword = () => setPasswordVisibility(!isShowPassword);

  const onMouseDownHandler = () => {};

  const handleOnFocus = () => setTooltipVisibility(true);

  const handleOnBlur = () => setTooltipVisibility(false);

  const handleForgotPassword = () => {
    if (handleRedirect) {
      handleRedirect(AuthRoute.FORGOT_PASSWORD)();
    }
  };

  const displayError = () => {
    if (error.hasOwnProperty('type')) {
      if (typeof error === 'object' && error.message) {
        return error.message;
      }
      return (
        typeof error === 'object' &&
        error?.type === 'required' &&
        'Field Should Not Be Empty'
      );
    }
  };

  return (
    <FormControl className={`password-input ${className}`} ref={ref}>
      <div
        className={`password-box${
          error.hasOwnProperty('type') ? ' error-field' : ''
        }`}
      >
        <div className="password-input__heading">
          <label className="input-label">{label}</label>
          {forgotPasswordTextShow && (
            <span
              className="forgot-password-text"
              onClick={handleForgotPassword}
            >
              Forgot password?
            </span>
          )}
        </div>
        <TextField
          type={inputType}
          placeholder={placeholder}
          onFocus={handleOnFocus}
          onBlurCapture={handleOnBlur}
          value={value}
          {...rest}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPassword}
                  onMouseDown={onMouseDownHandler}
                >
                  {isShowPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <span className="input-error">{displayError()}</span>
      {isTooltipAvailable && isTooltipVisible && (
        <FormPasswordTooltip
          value={String(value)}
          additionalStyles={changePosForTooltip}
        />
      )}
    </FormControl>
  );
});
