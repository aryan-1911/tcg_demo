import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useTypedController } from '@hookform/strictly-typed';
import {
  FormTextInput,
  Button,
  FormPasswordInput,
} from 'Components/common/form';
import {
  RegistrationRoute,
  EMAIL_VALIDATION,
  REQUIRED,
  MatchesRoute,
  LandingPageRouter,
} from 'const';
import { signInAction } from 'actions';
import { RouteComponentProps } from 'react-router-dom';
import { makeSelector } from 'helpers';

interface FormValues {
  email: string;
  password: string;
}

const LoginForm = (props: RouteComponentProps) => {
  const { control, handleSubmit, errors } = useForm<FormValues>();
  const TypedController: any = useTypedController<FormValues>({ control });
  const { history } = props;

  const isLoading = useSelector<any, any>(
    makeSelector(['authReducer', 'isLoading']),
  );

  const dispatch = useDispatch();
  const onSubmit = handleSubmit((data) => {
    dispatch(
      signInAction(data, { redirect: handleRedirect(LandingPageRouter.ROOT) }),
    );
  });

  const handleRedirect = (path: string) => () => {
    history.push(path);
  };

  return (
    <>
      <div className="login-page-form">
        <form onSubmit={onSubmit}>
          <div className="form-element">
            <TypedController
              name="email"
              rules={EMAIL_VALIDATION}
              render={(props) => (
                <FormTextInput
                  label="Email address"
                  name="email"
                  error={errors.email}
                  placeholder="you@example.com"
                  {...props}
                />
              )}
            />
          </div>
          <div className="form-element">
            <TypedController
              name="password"
              rules={REQUIRED}
              render={(props) => (
                <FormPasswordInput
                  handleRedirect={handleRedirect}
                  label="Password"
                  name="password"
                  forgotPasswordTextShow={true}
                  placeholder="Enter your password"
                  error={errors.password}
                  {...props}
                />
              )}
            />
          </div>
          <Button type="submit" onClick={onSubmit} isLoading={isLoading}>
            Sign In
          </Button>
        </form>
      </div>
      <div className="login-page-link">
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

export default LoginForm;
