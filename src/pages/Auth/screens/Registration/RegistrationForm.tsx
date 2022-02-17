import { useTypedController } from '@hookform/strictly-typed';
import { signUpAction } from 'actions';
import {
  Button,
  FormDatePicker,
  FormPasswordInput,
  FormTextInput
} from 'Components/common/form';
import {
  EMAIL_VALIDATION, FULLNAME_VALIDATION, PASSWORD_VALIDATION, RegistrationRoute, REQUIRED, StaticPagesRoute, USERNAME_VALIDATION
} from 'const';
import { makeSelector } from 'helpers';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

interface FormValues {
  fullname: string;
  username: string;
  referral_code?: string;
  birthdate: string;
  email: string;
  password: string;
}

function RegistrationForm(props: RouteComponentProps) {
  const { history } = props;
  const dispatch = useDispatch();
  const { control, handleSubmit, errors } = useForm<FormValues>();
  const TypedController: any = useTypedController<FormValues>({ control });

  const isLoading = useSelector<any, boolean>(
    makeSelector(['authReducer', 'isLoading']),
  );

  const [passCheck, setPassCheck] = useState(false);
  const [showErrMsg, setShowErrMsg] = useState(false);


  const onSubmit = handleSubmit((data) => {

    let userPass = data.password.toLocaleLowerCase();
    let passDoesNotContainFullName = userPass.includes(data.fullname.toLocaleLowerCase().replace(/\s+/, ""));
    let passDoesNotContainEmail = userPass.includes(data.email.toLocaleLowerCase().replace(/\s+/, ""));
    if ((passDoesNotContainFullName || passDoesNotContainEmail)) {
      setPassCheck(true);
      setShowErrMsg(true);
      setTimeout(() => {
        setShowErrMsg(false);
      }, 7000);
    } else {
      setPassCheck(false);
      dispatch(
        signUpAction(data, {
          redirect: handleRedirect(RegistrationRoute.EMAIL_CONFIRMATION),
        }));
    }
  });

  const handleRedirect = (path: string) => () => {
    history.push(path);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-element">
          <TypedController
            name="fullname"
            defaultValue=""
            rules={FULLNAME_VALIDATION}
            render={(props) => (
              <FormTextInput
                label="Full name"
                name="full_name"
                placeholder="What’s your full name?"
                error={errors && errors.fullname}
                {...props}
              />
            )}
          />
        </div>
        <div className="form-element">
          <TypedController
            name="username"
            rules={USERNAME_VALIDATION}
            defaultValue=""
            render={(props) => (
              <FormTextInput
                label="Username"
                name="user_name"
                placeholder="Must be unique"
                error={errors.username}
                {...props}
              />
            )}
          />
        </div>
        <div className="form-element has-info-tip">
          <div className='info-tip-wrap'>
            <label className="custom input-label" data-shrink="true">Referral Code</label>
            <span className="info-tip sign-up" data-tooltip="Enter the referral/affiliate code you receive from your friends/followers to earn free credits on signup, deposit money and play first match.">i</span>
          </div>
          <TypedController
            name="referral_code"
            defaultValue=""
            render={(props) => (
              <FormTextInput
                label="Referral Code"
                name="referral_code"
                placeholder="Enter Referral Code"
                error={errors.referral_code}
                {...props}
              />
            )}
          />
        </div>
        <div className="form-element">
          <TypedController
            name="birthdate"
            rules={REQUIRED}
            defaultValue=""
            render={(props) => (
              <FormDatePicker
                label="Birth date"
                name="birthDate"
                placeholder="Month/Day/Year"
                error={errors && errors.birthdate}
                {...props}
              />
            )}
          />
          <span className="add-info">
            You must be over 16 years old to use the platform
          </span>
        </div>
        <div className="form-element">
          <TypedController
            name="email"
            rules={EMAIL_VALIDATION}
            defaultValue=""
            render={(props) => (
              <FormTextInput
                label="Email Address"
                name="user_name"
                placeholder="you@example.com"
                error={errors.email}
                {...props}
              />
            )}
          />
        </div>
        <div className="form-element">
          <TypedController
            name="password"
            rules={PASSWORD_VALIDATION}
            defaultValue=""
            render={(props) => (
              <FormPasswordInput
                isTooltipAvailable={true}
                label="Password"
                name="password"
                error={errors.password}
                placeholder="Create a strong password"
                {...props}
              />
            )}
          />
          {passCheck && <span className={`check-pass-includes-msg ${(passCheck && showErrMsg) ? 'showErr' : 'hideErr'}`}>Your Password should not contains your name or email in it.</span>}
        </div>
        <div className="login-page-form__element">
          <Button type="submit" onClick={onSubmit} isLoading={isLoading}>
            Create account
          </Button>
        </div>
        <div className="terms-and-condtions-block">
          <span>
            By signing up, you agree to our{' '}
            <Link to={StaticPagesRoute.TERMS} className="conditions-link">
              Terms & Conditions
            </Link>
            &ensp;and&ensp;
            <Link
              to={StaticPagesRoute.PRIVACY_POLICY}
              className="conditions-link"
            >
              Privacy Policy.
            </Link>
          </span>
        </div>
      </form>
    </>
  );
}

export default RegistrationForm;
