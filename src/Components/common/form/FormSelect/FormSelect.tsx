import { Icon, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import './form-select.scss';


interface IFormSelect extends IFormInput {
  options: IOption[];
}

export const FormSelect = React.forwardRef<HTMLDivElement, IFormSelect>(
  (props, ref) => {
    const {
      className = '',
      name,
      onChange,
      value,
      options,
      label,
      placeholder = '',
    } = props;

    return (
      <div className={`input-box input-box--select ${className}`} ref={ref}>
        <InputLabel id={`select-${name}`}>{label}</InputLabel>
        <Select
          labelId={`select-${name}`}
          id={`select-input-${name}`}
          value={value}
          name={name}
          onChange={onChange}
          className="select-menu"
          MenuProps={{ keepMounted: true, disablePortal: true }}
          placeholder={placeholder}
          IconComponent={() => <Icon className="icon-arr_left" />}
        >
          {options.map((o) => {
            return (
              <MenuItem key={o.value} value={o.value}>
                {o.label}
              </MenuItem>
            );
          })}
        </Select>
      </div>
    );
  },
);
