import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { COLORS } from 'const/colors';
import clsx from 'clsx';
import Checkbox from '@material-ui/core/Checkbox';

export const useStyles = (isChecked: boolean) => {
  return makeStyles({
    root: {
      padding: '0 10px 0 0',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    icon: {
      borderRadius: 3,
      width: 16,
      height: 16,
      backgroundColor: 'transparent',
      transition: 'all .3s',
      border: isChecked
        ? `1px solid ${COLORS.RED}`
        : `1px solid ${COLORS.GRAY}`,
      '$root.Mui-focusVisible &': {
        outline: `2px auto ${COLORS.GRAY_WITH_OPACITY}`,
        outlineOffset: 2,
      },
      'input:hover ~ &': {
        backgroundColor: 'transparent',
      },
      'input:disabled ~ &': {
        boxShadow: 'none',
        background: `${COLORS.GRAY_WITH_OPACITY}`,
      },
    },

    checkedIcon: {
      backgroundColor: `${COLORS.RED}`,
      border: isChecked
        ? `1px solid ${COLORS.RED}`
        : `1px solid ${COLORS.GRAY}`,
      backgroundImage:
        'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      '&:before': {
        display: 'block',
        width: 16,
        height: 14,
        backgroundImage:
          "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
          " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
          "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""',
      },
      'input:hover ~ &': {
        backgroundColor: `${COLORS.RED}`,
      },
    },
    iconError: {
      transition: 'all .3s',
      boxShadow: `0px 0px 10px 0px rgba(243, 108, 72, 0.8)`,
    },
  });
};

export const FormCheckbox = React.forwardRef<HTMLDivElement, IFormCheckbox>(
  (props, ref) => {
    const { label, name, onChange, title = '', error, ...res } = props;
    const isChecked = Boolean(res.value);
    const classes = useStyles(isChecked)();

    const handleChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      checked: boolean,
    ) => {
      onChange(checked);
    };

    useEffect(() => {
      onChange(isChecked);
    }, [isChecked]);

    const isError = Boolean(error);

    return (
      <div className={`checkbox-input`} ref={ref}>
        {title && <span className="input-label">{title}</span>}
        <div>
          <Checkbox
            {...res}
            checked={isChecked}
            className={classes.root}
            color="default"
            checkedIcon={
              <span className={clsx(classes.icon, classes.checkedIcon)} />
            }
            icon={
              <span
                className={`${classes.icon} ${
                  isError ? classes.iconError : ''
                }`}
              />
            }
            inputProps={{ 'aria-label': 'decorative checkbox' }}
            onChange={handleChange}
            id={name}
            name={name}
          />
          <label htmlFor={name} className="checkbox-input__label">
            {label}
          </label>
        </div>
      </div>
    );
  },
);
