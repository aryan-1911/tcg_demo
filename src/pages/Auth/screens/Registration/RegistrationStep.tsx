import React from 'react';

interface IProps {
  step: string;
  head: string;
  children: any;
  isCompleted?: boolean;
}

const RegistrationStep = (props: IProps) => {
  const { step, head, children, isCompleted } = props;

  return (
    <div className="user-profile-form-section">
      <div className="user-profile-form-section__name">
        <div className={`section-number${isCompleted ? ' completed' : ''}`}>
          <span className="step">{step}</span>
          <span className="icon-check_sign"></span>
        </div>
        <div className="section-name">{head}</div>
      </div>
      <div className="user-profile-form-block">{children}</div>
    </div>
  );
};

export default RegistrationStep;
