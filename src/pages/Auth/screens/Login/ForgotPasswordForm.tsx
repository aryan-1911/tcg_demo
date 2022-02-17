import { useTypedController } from '@hookform/strictly-typed';
import { forgotPasswordAction } from 'actions';
import { Button, FormTextInput } from 'Components/common/form';
import { AuthRoute, EMAIL_VALIDATION, RegistrationRoute } from 'const';
import { makeSelector } from 'helpers';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

interface FormValues {
  email: string;
}

const ForgotPasswordForm = (props: RouteComponentProps) => {
  const { control, handleSubmit, errors } = useForm<FormValues>();
  const TypedController: any = useTypedController<FormValues>({ control });

  const { history } = props;
  const dispatch = useDispatch();


  const isLoading = useSelector<any, boolean>(
    makeSelector(['authReducer', 'isLoading']),
  );

  const onSubmit = handleSubmit((data) => {
    dispatch(
      forgotPasswordAction(data, { redirect: handleRedirect(AuthRoute.ROOT) }),
    );
  });

  const handleRedirect = (path: string) => () => {
    history?.push(path);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-element">
          <TypedController
            name="email"
            defaultValue=""
            rules={EMAIL_VALIDATION}
            render={(props) => (
              <FormTextInput
                label="Email address"
                name="email"
                placeholder="you@example.com"
                error={errors.email}
                {...props}
              />
            )}
          />
        </div>
        <div>
          <Button type="submit" onClick={onSubmit} isLoading={isLoading}>
            Reset password
          </Button>
        </div>
      </form>
      <div className="login-page-link">
        <span className="m-btm-15">
          Return to{' '}
          <span
            className="link bold-text"
            onClick={handleRedirect(AuthRoute.ROOT)}
          >
            Sign In.
          </span>
        </span>
        <span>
          Dont’t have an account?{' '}
          <span
            className="link bold-text"
            onClick={handleRedirect(RegistrationRoute.ROOT)}
          >
            Sign Up
          </span>
        </span>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
