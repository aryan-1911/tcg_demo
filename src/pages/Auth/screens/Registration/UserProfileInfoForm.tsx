import { useTypedController } from '@hookform/strictly-typed';
import { partialUserInfoEditingAction } from 'actions';
import {
  Button,
  creditCardInititalState,
  FormPayment,
  FormPhoneNumber,
  FormTextInput
} from 'Components/common/form';
import { UploadAvatar } from 'Components/common/UploadAvatar/UploadAvatar';
import { CREDIT_CARD, LandingPageRouter, MIN_CHAR_PHONE } from 'const';
import { makeSelector } from 'helpers';
import { useFillIndicator } from 'hooks/useFillIndicator';
import { usePhone } from 'hooks/usePhone';
import { IPartialUserInfoEditing } from 'interfaces';
import React from 'react';
import { FormProvider, UnpackNestedValue, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import RegistrationStep from './RegistrationStep';

const initialFormValues: IPartialUserInfoEditing = {
  avatar: '',
  username: '',
  fullname: '',
  birthdate: '',
  phone: '',
  showIncome: false,
  gamePokemon: '',
  gameMtg: '',
  gameYugioh: '',
  gameMagic:'',
  prefix: 1,
  payPal: false,
  creditCard: { ...creditCardInititalState },
};

const UserProfileInfoForm = (props: RouteComponentProps) => {
  const { phone, onChangePhone, getPhone } = usePhone(initialFormValues.phone);

  const dispatch = useDispatch();

  const methods = useForm<IPartialUserInfoEditing>({
    defaultValues: initialFormValues,
  });

  const { control, handleSubmit, errors, getValues } = methods;

  const TypedController: any = useTypedController<IPartialUserInfoEditing>({
    control,
  });

  const getPhoneValue = () => {
    if (phone.length >= MIN_CHAR_PHONE) {
      return phone;
    }
    return '';
  };

  const {
    isStep1Completed,
    isStep2Completed,
    isStep3Completed,
    handlerBlurStep,
  } = useFillIndicator(getValues, getPhoneValue);

  const isLoading = useSelector<any, boolean>(
    makeSelector(['profileReducer', 'isLoading']),
  );

  const handleRedirect = () => {
    props.history.push(LandingPageRouter.ROOT);
  };

  const submitDataWrapper = (
    data: UnpackNestedValue<IPartialUserInfoEditing>,
  ) => {

    /*
    // don't allow common in-game names
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
        dispatch(partialUserInfoEditingAction(data, { redirect: handleRedirect }));
      }
    */ 
    
    //allow common in-game names
      dispatch(partialUserInfoEditingAction(data, { redirect: handleRedirect }));
  };

  const onSubmit = handleSubmit((data) => {
    const fullData = {
      ...data,
      phone: getPhone(),
    };
    submitDataWrapper(fullData);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <RegistrationStep
          step="1"
          head="About you"
          isCompleted={isStep1Completed}
        >
          <div className="form-element mt-0">
            <div className="photo-upload-block input-box ">
              <TypedController
                name="avatar"
                render={(props) => (
                  <UploadAvatar
                    {...props}
                    onChange={props.onChange}
                    name="avatar"
                    value={props.value}
                    handlerBlur={handlerBlurStep(0)}
                  />
                )}
              />
              {errors.avatar && (
                <div className="input-error">Please upload avatar</div>
              )}
            </div>
          </div>
          <div className="form-element">
            <TypedController
              name="phone"
              defaultValue=""
              render={(props) => (
                <FormPhoneNumber
                  label="Phone Number"
                  name="phone_number"
                  {...props}
                  handlerBlur={handlerBlurStep(0)}
                  value={phone}
                  onChangePhone={(value, dialCode) =>
                    onChangePhone(value, dialCode)
                  }
                />
              )}
            />
          </div>
        </RegistrationStep>

        <RegistrationStep
          step="2"
          head="In-Games Names"
          isCompleted={isStep2Completed}
        >
          <div className="form-element">
            <div className="section-name">Must add one in-game to play</div>
          </div>
          <div className="form-element">
            <TypedController
              name="gamePokemon"
              defaultValue=""
              render={(props) => (
                <FormTextInput
                  label="Pokemon tcgo"
                  name="pokemon"
                  placeholder="In-game name"
                  {...props}
                  handlerBlur={handlerBlurStep(1)}
                />
              )}
            />
          </div>
          <div className="form-element">
            <TypedController
              name="gameMtg"
              defaultValue=""
              render={(props) => (
                <FormTextInput
                  label="MTG Arena"
                  name="mtg_arena"
                  placeholder="In-game name"
                  {...props}
                  handlerBlur={handlerBlurStep(1)}
                />
              )}
            />
          </div>
          <div className="form-element">
            <TypedController
              name="gameYugioh"
              defaultValue=""
              render={(props) => (
                <FormTextInput
                  label="Yu-Gi-Oh Master Duel"
                  name="duel_links"
                  placeholder="In-game name"
                  {...props}
                  handlerBlur={handlerBlurStep(1)}
                />
              )}
            />
          </div>
          <div className="form-element">
            <TypedController
              name="gameMagic"
              defaultValue=""
              render={(props) => (
                <FormTextInput
                  label="Magic The Gathering Online"
                  name="magic"
                  placeholder="In-game name"
                  {...props}
                  handlerBlur={handlerBlurStep(1)}
                />
              )}
            />
          </div>          
        </RegistrationStep>

        <RegistrationStep
          step="3"
          head="Payment Info"
          isCompleted={isStep3Completed}
        >
          <div className="form-element">
            <FormPayment
              nestedName={CREDIT_CARD}
              handlerBlur={handlerBlurStep(2)}
            />
          </div>
        </RegistrationStep>

        <div className="user-profile-form-bottom">
          <Button type="submit" onClick={onSubmit} isLoading={isLoading}>
            Submit Profile
          </Button>
          <span className="skip-link" onClick={handleRedirect}>
            Or you can <span className="bold-text">Skip</span> and complete the
            profile later.
          </span>
        </div>
      </form>
    </FormProvider>
  );
};

export default UserProfileInfoForm;
