import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { defaultCountryCode } from 'const';

interface IFormPhoneNumber extends IFormInput {
  label: string;
  className?: string;
  handlerBlur?: (name: string) => void; 
  onChangePhone?: (value: string, dialCode: string) => void;
  value: string;
}

export const FormPhoneNumber = React.forwardRef<
  HTMLDivElement,
  IFormPhoneNumber
>((props, ref) => {
  const {
    label,
    className = '',
    onChangePhone,
    handlerBlur,
    value,
  } = props;

  const handleInput = (value: any, data) => {
    onChangePhone && onChangePhone(value, data.dialCode);
  };

  return (
    <div className={`phone-number-box ${className}`} ref={ref}>
      <label className="input-label">
        {label}
        <span className='add-info'> (optional)</span>
      </label>
      <div className="phone-number-box__input">
        <PhoneInput
          placeholder= 'Phone number'
          country={defaultCountryCode}
          value={value}
          onChange={handleInput}
          onBlur={() => handlerBlur ? handlerBlur('phone-num') : undefined}
          inputProps={{
            name: 'phone-num',
          }}
        />
      </div>
    </div>
  );
});
