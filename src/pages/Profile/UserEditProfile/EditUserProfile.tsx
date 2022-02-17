import { useTypedController } from '@hookform/strictly-typed';
import { editUserInfoAction } from 'actions';
import {
  Button,
  FormCheckbox,
  FormDatePicker,
  FormPhoneNumber,
  FormTextInput
} from 'Components/common/form';
import { UploadAvatar } from 'Components/common/UploadAvatar/UploadAvatar';
import PageHeader from 'Components/PageHeader';
import {
  FULLNAME_VALIDATION, ProfileRoute,
  REQUIRED,
  USERNAME_VALIDATION
} from 'const';
import { makeSelector } from 'helpers';
import { usePrevious } from 'hooks';
import { usePhone } from 'hooks/usePhone';
import { IUserProfile, IUserProfileResp } from 'interfaces';
import React, { useEffect } from 'react';
import { UnpackNestedValue, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import '../user-profile.scss';

const EditUserProfile = (props: RouteComponentProps) => {
  const { history } = props;
  const userData = useSelector<any, IUserProfileResp>(
    makeSelector(['profileReducer', 'userData']),
  );

  const prevUserData = usePrevious(userData);

  const isLoading = useSelector<any, boolean>(
    makeSelector(['profileReducer', 'isLoading']),
  );

  const { phone, phoneIsDirty, onChangePhone, getPhone } = usePhone(
    `${(userData.prefix || '').replace('+', '')} ${userData.phone}`,
  );

  const {
    control,
    handleSubmit,
    errors,
    formState,
    watch,
    setValue,
    reset,
  } = useForm<IUserProfile>({
    defaultValues: {
      avatar: userData.avatar,
      username: userData.username,
      birthdate: userData.birthdate,
      prefix: userData.prefix,
      fullname: userData.fullname,
      paypal_email:userData.paypal_email,
      gameMtg: userData.nicknames['MTG ARENA'] || '',
      gamePokemon: userData.nicknames['POKEMON TCGO'] || '',
      gameYugioh: userData.nicknames['YU-GI-OH MASTER DUEL'] || '',
      gameMagic:userData.nicknames['MAGIC THE GATHERING ONLINE'] || '',
      phone: `${(userData.prefix || '').replace('+', '')} ${userData.phone}`,
      showIncome: userData.showIncome,
      referral_code:userData.referral_code,
    },
  });
  const TypedController: any = useTypedController<IUserProfile>({ control });
  const dispatch = useDispatch();

  const submitDataWrapper = (data: UnpackNestedValue<any>) => {
    /*
    //Don't allow common in-game names

    let {gamePokemon,gameMtg,gameYugioh} = data;
    let ingameNames = [gamePokemon,gameMtg,gameYugioh];
    function doesMatch(ingameNames) {
      return ingameNames.every(function (item,index,arr) {
        let otherItems = arr.filter((item,i) => i !== index).filter(Boolean);
        return item !== otherItems[0] && item !== otherItems[1];
      });
    }
    let doesItMatch = doesMatch(ingameNames);
    if(!doesItMatch){
      ShowToastError({
        title:"Don't use common in game names.",
        subtitle:'Each in game name should be different from the other.',
        btnTitle:'Ok',
        onClick:()=> void(null),
      });
    }else{
      dispatch(editUserInfoAction(data));
    }
    */
   
    /*
    //Check white space in in-game-names before submittion and show toast if there is. 
      let gamePokemonWhiteSpace = data.gamePokemon.length && !NO_WHITESPACE.test(data.gamePokemon);
      let gameMtgWhiteSpace = data.gameMtg.length && !NO_WHITESPACE.test(data.gameMtg);
      let gameYugiohWhiteSpace = data.gameYugioh.length && !NO_WHITESPACE.test(data.gameYugioh);
      if(gamePokemonWhiteSpace || gameMtgWhiteSpace  || gameYugiohWhiteSpace) {
        ShowToastError({
          title:"No whitespace",
          subtitle:"Don't add whitespace in your game names.",
          btnTitle:"Ok",
        })
      }else{
        dispatch(editUserInfoAction(data));
      }
    */ 

    dispatch(editUserInfoAction(data));

  };

  const onSubmit = handleSubmit((data) => {
    const fullData = {
      ...data,
      phone: getPhone(),
    };
    submitDataWrapper(fullData);
    reset({ ...data });
  });

  useEffect(() => {
    if (!prevUserData?.id && userData.id) {
      reset({
        avatar: userData.avatar,
        username: userData.username,
        birthdate: userData.birthdate,
        prefix: userData.prefix,
        fullname: userData.fullname,
        paypal_email:userData.paypal_email,
        gameMtg: userData.nicknames['MTG ARENA'] || '',
        gamePokemon: userData.nicknames['POKEMON TCGO'] || '',
        gameYugioh: userData.nicknames['YU-GI-OH MASTER DUEL'] || '',
        gameMagic: userData.nicknames['MAGIC THE GATHERING ONLINE'] || '',
        phone: `${(userData.prefix || '').replace('+', '')} ${userData.phone}`,
        showIncome: userData.showIncome,
        referral_code:userData.referral_code,
      });
    }
  }, [userData]);

  const handleRedirect = (path?: string) => () => {
    if (path) {
      history.push(path);
    } else {
      history.goBack();
    }
  };
  if (isLoading) return <div>Fetching Data...</div>;

  return (
    <div className="user-profile-wrapper">
      <PageHeader
        title={
          <>
            Edit Profile
            <div className="go-back-link" onClick={handleRedirect('/profile')}>
              <span className="go-back-link__arrow">⟶</span>
              <span>Go Back</span>
            </div>
          </>
        }
        btns={
          <>
            <div
              className="user-profile-header__settings"
              onClick={handleRedirect(ProfileRoute.USER_PROFILE_SETTINGS)}
            >
              <span className={`icon-settings`} />
              <span>Account settings</span>
            </div>
          </>
        }
      />

      <div className="user-edit-profile-block card-form columns">
        <div className="user-edit-profile-form__col card-form__col">
          <div className="form-element">
            <div className="photo-upload-block input-box ">
              <div className="photo-upload-block__image">
                <TypedController
                  name="avatar"
                  render={(props) => (
                    <UploadAvatar
                      {...props}
                      onChange={props.onChange}
                      name="avatar"
                      value={props.value}
                    />
                  )}
                />
              </div>
              {errors.avatar && (
                <div className="input-error">Please upload avatar</div>
              )}
            </div>
          </div>
          <div className="form-element">
            <TypedController
              name="username"
              rules={USERNAME_VALIDATION}
              render={(props) => (
                <FormTextInput
                  label="UserName"
                  name="user_name"
                  placeholder="Enter user name"
                  error={errors.username}
                  {...props}
                />
              )}
            />
          </div>
          <div className="form-element">
            <TypedController
              name="fullname"
              rules={FULLNAME_VALIDATION}
              render={(props) => (
                <FormTextInput
                  label="Full name"
                  name="full_name"
                  placeholder="Enter full name"
                  error={errors.fullname}
                  {...props}
                />
              )}
            />
          </div>
          <div className="form-element">
            <TypedController
              name="paypal_email"
              render={(props) => (
                <FormTextInput
                  label="PayPal Email Id (for Withdrawal)"
                  name="paypal_email"
                  placeholder="Enter PayPal Id"
                  error={errors.paypal_email}
                  {...props}
                />
              )}
            />
          </div>
          <div className="form-element">
            <TypedController
              name="birthdate"
              rules={REQUIRED}
              render={(props) => (
                <FormDatePicker
                  label="Birth date"
                  name="birth_date"
                  placeholder="Enter birth date"
                  error={errors.birthdate}           
                  {...props}
                />
              )}
            />
          </div>
          <div className="form-element">
            <TypedController
              name="phone"
              render={(props) => (
                <FormPhoneNumber
                  label="Phone Number"
                  name="phone_number"
                  error={errors.phone}
                  {...props}
                  value={phone}
                  onChangePhone={(value, dialCode) =>
                    onChangePhone(value, dialCode)
                  }
                />
              )}
            />
          </div>
          {!!userData.isAffiliated?(
            <div className="form-element">
            <TypedController
              name="referral_code"
              render={(props) => (
                <FormTextInput
                  label="Affiliated Code"
                  name="referral_code"
                  placeholder="Enter Referral Code"
                  error={errors.referral_code}
                  {...props}
                />
              )}
            />
          </div>
        ) : null
        }          
        </div>

        <div className="user-edit-profile-form__col right card-form__col">
          <div className="user-edit-profile-form__col-header">
            <TypedController
              name="showIncome"
              render={(props) => (
                <FormCheckbox
                  label="Show my income in public profile"
                  name="showIncome"
                  title="Show Income"
                  {...props}
                />
              )}
            />
          </div>
          <div className="user-edit-profile-form__col-games">
            <div className="games-title">In-Games Names</div>
            <div className="form-element">
              <TypedController
                name="gamePokemon"
                // rules={NO_WHITESPACE_ALLOWED}
                render={(props) => (
                  <FormTextInput
                    label="Pokemon tcgo"
                    name="pokemonGame"
                    placeholder="Enter username"
                    error={errors.gamePokemon}
                    {...props}
                  />
                )}
              />
            </div>
            <div className="form-element">
              <TypedController
                name="gameMtg"
                // rules={NO_WHITESPACE_ALLOWED}
                render={(props) => (
                  <FormTextInput
                    label="MTG Arena"
                    name="mtgArena"
                    placeholder="Enter username"
                    error={errors.gameMtg}
                    {...props}
                  />
                )}
              />
            </div>
            <div className="form-element">
              <TypedController
                name="gameYugioh"
                // rules={NO_WHITESPACE_ALLOWED}
                required={false}
                render={(props) => (
                  <FormTextInput
                    label="Yu-Gi-Oh Master Duel"
                    name="yugihoDuel"
                    placeholder="Enter username"
                    error={errors.gameYugioh}
                    {...props}
                  />
                )}
              />
            </div>
            <div className="form-element">
              <TypedController
                name="gameMagic"
                // rules={NO_WHITESPACE_ALLOWED}
                required={false}
                render={(props) => (
                  <FormTextInput
                    label="Magic The Gathering Online"
                    name="magic"
                    placeholder="Enter username"
                    error={errors.gameMagic}
                    {...props}
                  />
                )}
              />
            </div>            
          </div>
          <div className="form-element__btn">
            <Button
              onClick={onSubmit}
              type="submit"
              disabled={!formState.isDirty && !phoneIsDirty}
              isLoading={isLoading}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;
