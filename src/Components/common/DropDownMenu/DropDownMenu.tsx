import { Icon, Menu, MenuItem } from '@material-ui/core';
import React, { ReactElement } from 'react';

import './drop-down-menu.scss';

export interface IDropDownOption {
  label: string;
  onClick(): void;
}

interface IDropDownMenuProps {
  button?: ReactElement;
  options: IDropDownOption[];
}

export const DropDownMenu = (props: IDropDownMenuProps) => {
  const { options, button } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderButton = () => {
    if (button) {
      return (
        <>
          {button}
          <Icon className="icon-arr_down drop-down-menu__button-ico" />
        </>
      );
    }
    return <Icon className="icon-ic_more drop-down-menu__button-dots" />;
  };

  return (
    <div className="drop-down-menu">
      <div
        className={`drop-down-menu__button ${
          Boolean(anchorEl) ? 'is-open' : ''
        }`}
        onClick={handleClick}
      >
        {renderButton()}
      </div>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disablePortal
        className="drop-down-menu__box"
      >
        {options.map((o) => {
          const { onClick, label } = o;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                handleClose();
                onClick();
              }}
            >
              {label}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};
