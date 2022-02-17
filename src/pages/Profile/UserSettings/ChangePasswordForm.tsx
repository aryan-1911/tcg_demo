import React, { useState } from 'react';
import '../user-profile.scss';
import { useForm } from 'react-hook-form';
import { useTypedController } from '@hookform/strictly-typed';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordAction } from 'actions';
import { Button, FormPasswordInput } from 'Components/common/form';
import {
  CONFIRM_PASSWORD_VALIDATION,
  PASSWORD_VALIDATION,
  REQUIRED,
} from 'const';
import { makeSelector } from 'helpers';

interface FormValues {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export const ChangePasswordForm = () => {
  const { control, handleSubmit, reset, errors, watch } = useForm<FormValues>();
  const TypedController: any = useTypedController<FormValues>({ control });
  const dispatch = useDispatch();

  const onSubmit = handleSubmit((data) => {
    dispatch(changePasswordAction(data));
    reset({
      current_password: '',
      new_password: '',
      confirm_password: '',
    });
  });

  const isLoading = useSelector<any, boolean>(
    makeSelector(['authReducer', 'isLoading']),
  );

  const watchNewPassword = watch('new_password');

  return (
    <div className="user-settings-block__password card-form">
      <div className="card-form__col">
        <div className="title">Change password</div>
        <div className="user-settings-block__form">
          <form>
            <div className="form-element">
              <TypedController
                name="current_password"
                defaultValue=""
                rules={REQUIRED}
                render={(props) => (
                  <FormPasswordInput
                    label="Current password"
                    name="current_password"
                    placeholder="Enter your current password"
                    error={errors.current_password}
                    {...props}
                  />
                )}
              />
            </div>
            <div className="form-element">
              <TypedController
                name="new_password"
                defaultValue=""
                rules={PASSWORD_VALIDATION}
                render={(props) => (
                  <FormPasswordInput
                    isTooltipAvailable={true}
                    changePosForTooltip="top-position"
                    label="New password"
                    name="new_password"
                    placeholder="Create a strong password"
                    error={errors.new_password}
                    {...props}
                  />
                )}
              />
            </div>
            <div className="form-element">
              <TypedController
                name="confirm_password"
                defaultValue=""
                rules={CONFIRM_PASSWORD_VALIDATION(watchNewPassword)}
                render={(props) => (
                  <FormPasswordInput
                    label="Confirm password"
                    name="conf_password"
                    placeholder="Confirm new password"
                    error={errors.confirm_password}
                    {...props}
                  />
                )}
              />
            </div>
            <div className="form-element form-element__btn">
              <Button onClick={onSubmit} type="submit" isLoading={isLoading}>
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
