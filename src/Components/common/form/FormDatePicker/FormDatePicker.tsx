import DateFnsUtils from '@date-io/date-fns';
import { InputAdornment } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { FORMAT_DATE_SERVER } from 'const';
import { format } from 'date-fns';
import { formatDatePicker, makeSelector } from 'helpers';
import { IUserProfileResp } from 'interfaces';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './form-date-picker.scss';

interface IFormDatePicker extends IFormInput {
  className?: string;
  formatOutput?: string;
}

export const FormDatePicker = React.forwardRef<HTMLDivElement, IFormDatePicker>(
  (props, ref) => {
    const {
      label,
      className,
      onChange,
      error = '',
      value,
      formatOutput = FORMAT_DATE_SERVER,
    } = props;

    const {birthdate} = useSelector<any, IUserProfileResp>(
      makeSelector(['profileReducer', 'userData']),
    );

    const maxYear = +format(new Date(), 'y') - 16;
    const minYear = +format(new Date(), 'y') - 100;
    const minDateValue = new Date(`${minYear}-01-01`);
    const maxDateValue = new Date(`${maxYear}-12-31`);

    const [selectedDate, setSelectedDate] = React.useState<
    Date | null | string | number | undefined 
  >(maxDateValue);


    const { id: myProfileId } = useSelector<any, IUserProfileResp>(
      makeSelector(['profileReducer', 'userData']),
    );

    let {location} = useHistory();
    
    let isEditProfile = location.pathname.includes('edit-profile');



    const [userBirthdate, setUserBirthdate] = React.useState<
    Date | null | string | number | undefined 
  >(birthdate);



    const handleDateChange = (date: Date | null) => {
      setSelectedDate(date);
      onChange(formatDatePicker(formatOutput)(date));
      setUserBirthdate(date);
    };

    const displayError = () => {
      if (error.hasOwnProperty('type')) {
        return (
          typeof error === 'object' &&
          error?.type === 'required' && 
          'Field Should Not Be Empty'
        );
      }
    };


    return (
      <div
        className={`date-picker-box${
          error.hasOwnProperty('type') ? ' error-field' : ''
        } ${className}`}
        ref={ref}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            placeholder="mm/dd/yyyy"
            openTo="year"
            format="MM/dd/yyyy"
            label={label}
            views={['month','date','year']}
            value={isEditProfile?userBirthdate:selectedDate}
            minDate={minDateValue}
            maxDate={maxDateValue}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <span className="icon-calendar"></span>
                </InputAdornment>
              ),
            }}
          />
        </MuiPickersUtilsProvider>
        <span className="input-error">{displayError()}</span>
      </div>
    );
  },
);
