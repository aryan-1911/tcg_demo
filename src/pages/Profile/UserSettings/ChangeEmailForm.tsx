import React from 'react';
import '../user-profile.scss';
import {
  Button,
  FormPasswordInput,
  FormTextInput,
} from 'Components/common/form';
import { useForm } from 'react-hook-form';
import { useTypedController } from '@hookform/strictly-typed';
import { useDispatch, useSelector } from 'react-redux';
import { changeEmailAction } from 'actions';
import { makeSelector } from 'helpers';
import { EMAIL_VALIDATION, REQUIRED } from 'const';

interface FormValues {
  email: string;
  password: string;
}

export const ChangeEmailForm = () => {
  const { control, handleSubmit, reset, errors } = useForm<FormValues>();
  const TypedController: any = useTypedController<FormValues>({ control });
  const dispatch = useDispatch();

  const onSubmit = handleSubmit((data) => {
    dispatch(changeEmailAction(data));
    reset({
      email: '',
      password: '',
    });
  });

  const isLoading = useSelector<any, boolean>(
    makeSelector(['authReducer', 'isLoading']),
  );

  return (
    <div className="user-settings-block__email card-form">
      <div className="card-form__col">
        <div className="title">Change email</div>
        <div className="user-settings-block__form">
          <form onSubmit={onSubmit}>
            <div className="form-element">
              <TypedController
                name="email"
                defaultValue=""
                rules={EMAIL_VALIDATION}
                render={(props) => (
                  <FormTextInput
                    label="New Email Address"
                    name="email"
                    placeholder="Enter email"
                    error={errors.email}
                    {...props}
                  />
                )}
              />
            </div>
            <div className="form-element">
              <TypedController
                name="password"
                defaultValue=""
                rules={REQUIRED}
                render={(props) => (
                  <FormPasswordInput
                    label="Current Password"
                    name="password"
                    placeholder="Enter your password"
                    error={errors.password}
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
