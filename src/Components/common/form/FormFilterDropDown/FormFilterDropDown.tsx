import { useTypedController } from '@hookform/strictly-typed';
import { Icon } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { getDisabledFilterOptions, makeSelector } from 'helpers';
import { usePrevious } from 'hooks/usePrevious';
import { IMatchesFilterQuery } from 'interfaces';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Button, FormCheckbox, FormSlider } from '..';
import './form-filter-drop-down.scss';



export interface ICheckBoxGroup {
  group_name: string;
  checkbox: ICheckBox<IMatchesFilterQuery>[];
}

interface IFromFilterDropDown {
  options?: ICheckBoxGroup[];
  sliderMarks: ISliderMark[];
  defaultValues?: IMatchesFilterQuery;
  onFilter(data: any): void;
}

const growStyles = (placement: string) => ({
  transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
  boxShadow: ' 0 4px 20px rgba(0, 0, 0, 0.3)',
  border: 0,
  borderTop: '2px solid #f36c48',
  backgroundColor: '#30313a',
  borderRadius: '0',
  minWidth: '155px',
});

export const FromFilterDropDown = (props: IFromFilterDropDown) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const { options, sliderMarks, defaultValues, onFilter } = props;

  const prevDefaultValues = usePrevious(defaultValues);
  
  const filters = useSelector<any, IMatchesFilterQuery>(
    makeSelector(['filtersReducer', 'filters']),
  );

  const valueSlider = sliderMarks.find((i) => i.valueReal === filters.entry)
    ?.value;

  const [sliderValue, changeSliderValue] = useState(valueSlider);

  const open = Boolean(anchorEl);

  const handleToggle = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setAnchorEl(null);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setAnchorEl(null);
    }
  };

  const handleFilter = (data: IMatchesFilterQuery) => {
    const valueReal = sliderMarks.find((i) => i.value === sliderValue)
      ?.valueReal;

    const formData = {
      ...data,
      entry: valueReal,
    };

    onFilter(formData);
    setAnchorEl(null);
  };

  const handleChangeSlider = (value) => {
    changeSliderValue(value);
  };

  const { control, handleSubmit, reset, watch } = useForm<IMatchesFilterQuery>({
    defaultValues,
  });

  const TypedController: any = useTypedController<IMatchesFilterQuery>({ control });

  const submit = handleSubmit(handleFilter);

  useEffect(() => {
    if (defaultValues && prevDefaultValues !== defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues]);

  const watchedForm = watch();

  const disabledOptions = getDisabledFilterOptions(watchedForm);

  return (
    <form className="filter-drop-down" onSubmit={submit}>
      <Button
        className="filter-drop-down__btn match-page__controls-item"
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <>
          <Icon className="icon-filter" />
          Filters
        </>
      </Button>
      <Popper
        open={open}
        anchorEl={anchorEl}
        role={undefined}
        transition
        disablePortal
        className="filter-drop-down__box"
      >
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ ...growStyles(placement) }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem key="my_matches">
                    <TypedController
                      name="my_matches"
                      render={(props) => {
                        return (
                          <FormCheckbox
                            name="my_matches"
                            label="My matches"
                            {...props}
                          />
                        );
                      }}
                    />
                  </MenuItem>
                  {options?.map((item, index) => (
                    <MenuItem key={index} className="disable-animation">
                      <ul className="filter-group">
                        <span className="filter-label">{item.group_name}</span>
                        {item.checkbox.map((element, index) => {
                          const isDisabled = disabledOptions.find(
                            (g) => g === element.name,
                          );

                          return (
                            <MenuItem key={index} disableGutters>
                              <TypedController
                                name={element.name}
                                render={(props) => {
                                  return (
                                    <FormCheckbox
                                      {...props}
                                      value={isDisabled ? false : props.value}
                                      disabled={Boolean(isDisabled)}
                                      name={element.name}
                                      label={element.label}
                                    />
                                  );
                                }}
                              />
                            </MenuItem>
                          );
                        })}
                      </ul>
                    </MenuItem>
                  ))}
                  <MenuItem key="entry">
                    <div className="filter-group">
                      <span className="filter-label">ENTRY FEE</span>
                      <TypedController
                        name="entry"
                        render={(props) => {
                          return (
                            <FormSlider
                              name="entry"
                              sliderMarks={sliderMarks}
                              min={sliderMarks[0].value}
                              max={sliderMarks[sliderMarks.length - 1].value}
                              {...props}
                              onChange={handleChangeSlider}
                              value={sliderValue}
                            />
                          );
                        }}
                      />
                    </div>
                  </MenuItem>
                  <MenuItem key="button">
                    <div className="filter-group">
                      <Button type="submit" onClick={submit}>
                        APPLY FILTERS
                      </Button>
                    </div>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </form>
  );
};
