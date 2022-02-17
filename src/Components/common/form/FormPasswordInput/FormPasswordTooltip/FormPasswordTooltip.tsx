import { PATTERN_PASSWORD_MATCH } from 'const';
import React from 'react';

interface IFormPasswordTooltip {
  value: string;
  additionalStyles?: string;
}

export const FormPasswordTooltip = (props: IFormPasswordTooltip) => {
  const { value, additionalStyles } = props;
  const fn = (pattern: any) => {
    let isInValid: string;
    if (pattern.name === 'passwordLength') {
      const isValidPassword = value.length >= pattern.minPasswordLength && value.length <= pattern.maxPasswordLength;
      isInValid = !isValidPassword ? 'error' : '';
      return (
        <div>
          {!isValidPassword ? <span className="icon-RedX" /> : <span className="icon-check_sign" />}
          <span className={`password-tooltip-box-validation__text ${isInValid}`}>{pattern.description}</span>
        </div>
      );
    }
    isInValid = pattern.name && !value.match(pattern.name) ? 'error' : '';
    return (
        <div>
          {pattern.name && !value.match(pattern.name) ? <span className="icon-RedX" /> : <span className="icon-check_sign" />}
          <span className={`password-tooltip-box-validation__text ${isInValid}`}>{pattern.description}</span>
        </div>
    );
  };
  return (
      <div className={`password-tooltip-box ${additionalStyles}`}>
        <div className="password-tooltip-box__heading">
          Password must:
        </div>
        <div className="password-tooltip-box-validation">
          {
            PATTERN_PASSWORD_MATCH.map((pattern) => {
              return (
                <div className="password-tooltip-box-validation__element" key={pattern.id}>
                  {fn(pattern)}
                </div>
              );
            })
          }
        </div>
        <div className="password-tooltip-box__triangle" />
      </div>
  );
};
