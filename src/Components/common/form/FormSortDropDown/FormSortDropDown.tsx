import React, { useMemo, useState } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Button } from '..';
import { Icon } from '@material-ui/core';

import './form-sort-drop-down.scss';
import { QueryOrder } from 'const';
import { DropDownMenu, IDropDownOption } from 'Components/common/DropDownMenu';
import { IMatchesFilterQuery } from 'interfaces/matches/matches';

interface IOption {
  label: string;
  value: QueryOrder;
}

interface IFormSortDropDown {
  options: IOption[];
  defaultValue: IOption['value'];
  onSort(value: IOption['value'], filters: IMatchesFilterQuery): void;
  filters: IMatchesFilterQuery;
}

const growStyles = (placement: string) => ({
  transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
  boxShadow: ' 0 4px 20px rgba(0, 0, 0, 0.3)',
  borderTop: '2px solid #f36c48',
  backgroundColor: '#30313a',
  borderRadius: '0',
  minWidth: '155px',
});

export const FormSortDropDown = (props: IFormSortDropDown) => {
  const { options, defaultValue, onSort, filters } = props;
  const [open, setDropDownOpen] = React.useState<boolean>(false);
  const [currentOption, setCurrentOption] = useState<string>(defaultValue);

  const handleToggleDropDown = () => setDropDownOpen(!open);
  const handleClose = () => setDropDownOpen(false);

  const handleOptionClick = (option: IOption, filters) => () => {
    setCurrentOption(option.value);
    onSort(option.value, filters);
    handleClose();
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      handleClose();
    }
  };

  const selectedOption = options?.find((o) => o.value === currentOption);

  const menuOptions: IDropDownOption[] = useMemo(() => {
    return options.map((o) => {
      return {
        ...o,
        onClick: handleOptionClick(o, filters),
      };
    });
  }, [options, filters]);

  return (
    <div className="sort-drop-down">
      <DropDownMenu
        options={menuOptions}
        button={
          <Button
            onClick={() => {}}
            className="sort-drop-down__btn match-page__controls-item"
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
          >
            <>
              <span className="sort-drop-down__btn-text">
                <Icon className="icon-sort" />
                Sort:
              </span>
              <span className="sort-drop-down__btn-val">
                {selectedOption?.label}
              </span>
            </>
          </Button>
        }
      />
    </div>
  );
};
