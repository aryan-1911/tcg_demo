import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import React from 'react';
import './form-radio-switch.scss';


interface IFormRadioSwitchProps extends IFormInput {
  options: IOption[];
}



export const FormRadioSwitch = React.forwardRef<
HTMLDivElement,
IFormRadioSwitchProps
>((props, ref) => {
  const { options, onChange, name, value, label } = props;
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    newValue: string,
  ) => {
    let out: string | number = newValue;
    if (typeof value === 'number') {
      out = Number(newValue);
    }
     onChange(out);
  };

  return (
    <div className="radio-switch" ref={ref}>
      <label className="input-label" htmlFor={name}>
        {label}
      </label>
      <RadioGroup
        aria-label={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        {options.map((o) => {
          return (
            <FormControlLabel
              className={`${o.value === value ? 'is-selected' : ''} `}
              key={o.value}
              value={o.value}
              control={<Radio />}
              label={o.label}
            />
          );
        })}
      </RadioGroup>
    </div>
  );
});
