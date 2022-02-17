import { Icon } from '@material-ui/core';
import { LoadingButton } from 'Components/common/form/LoadingButton/LoadingButton';
import React, { ReactElement } from 'react';
import './button.scss';


export interface IButtonProps {
  children?: string | number | ReactElement;
  className?: string;
  btnType?: 'create'|'play';
  btnStyle?: 'red' | 'white' | 'white-fill';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  preffix?: ReactElement;
  href?: string;
  download?: boolean;
  onClick: (props?: any) => void;
  isLoading?: boolean;
}

export const Button = (props: IButtonProps) => {
  const {
    children,
    btnStyle = 'red',
    type = 'button',
    className = '',
    btnType = '',
    onClick,
    disabled,
    preffix,
    isLoading = false,
    href,
    download,
  } = props;

  const renderIco = () => {
    if (preffix) {
      return preffix;
    }
    if (btnType === 'create') {
      return <Icon className="icon-plus" />;
    }
    if (btnType === 'play') {
      return <Icon className="icon-play" />
    }
    return null;
  };

  if (href) {
    return (
      <div className={`btn-wrapper ${className}`}>
        <a
          href={href}
          className={`btn btn-${btnStyle}`}
          onClick={onClick}
          target="_blanck"
        >
          {renderIco()}
          {children}
        </a>
      </div>
    );
  }

  return (
    <div className={`btn-wrapper ${className}`}>
      <button
        type={type}
        className={`btn btn-${btnStyle} ${isLoading ? 'btn-loading' : 'btn-hover'}`}
        onClick={onClick}
        disabled={disabled}
      >
        {renderIco()}
        {
          isLoading ? (
          <>
            <LoadingButton />
            {children}
          </>
          ) :
          <>{children}</>
        }
      </button>
    </div>
  );
};
