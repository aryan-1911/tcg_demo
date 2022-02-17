import { useTypedController } from '@hookform/strictly-typed';
import { CircularProgress } from '@material-ui/core';
import { confirmResetPasswordAction } from 'actions';
import { Button, FormPasswordInput } from 'Components/common/form';
import {
  AuthRoute,
  CONFIRM_PASSWORD_VALIDATION,
  PASSWORD_VALIDATION
} from 'const';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

interface FormValues {
  new_password: string;
  confirm_password: string;
}

type Params = {
  id: string;
};

const RessetPasswordForm = (props: RouteComponentProps<Params>) => {
  const dispatch = useDispatch();
  const { control, handleSubmit, errors, watch } = useForm<FormValues>();
  const TypedController: any = useTypedController<FormValues>({ control });

  const { id } = props.match.params;
  const hash = props.location.search.replace(/^\?hash=/, '');

  const onSubmit = handleSubmit((data) =>
    dispatch(
      confirmResetPasswordAction(
        { id, hash, password: data.new_password },
        { redirect: () => props.history.push(AuthRoute.ROOT) },
      ),
    ),
  );

  const watchNewPassword = watch('new_password');

  return (
    <>
    <CircularProgress variant="determinate"/>
      <form onSubmit={onSubmit}>
        <div className="form-element">
          <TypedController
            name="new_password"
            defaultValue=""
            rules={PASSWORD_VALIDATION}
            render={(props) => (
              <FormPasswordInput
                isTooltipAvailable={true}
                label="New Password"
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
                label="Confirm Password"
                name="confirm_password"
                placeholder="Confirm your new password"
                error={errors.confirm_password}
                {...props}
              />
            )}
          />
        </div>
        <div className="reset-password-btn">
          <Button type="submit" onClick={onSubmit}>
            Reset Password & Sign in
          </Button>
        </div>
      </form>
    </>
  );
};

export default RessetPasswordForm;
