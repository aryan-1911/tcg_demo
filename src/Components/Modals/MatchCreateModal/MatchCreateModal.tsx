import { useTypedController } from '@hookform/strictly-typed';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@material-ui/core';
import { createMatchAction, editMatchAction } from 'actions';
import {
  FormRadioSwitch,
  FormSelect,
  FormTextArea,
  FormTextInput
} from 'Components/common/form';
import { UniversalModal } from 'Components/common/UniversalModal/UniversalModal';
import { UniversalModalFooter } from 'Components/common/UniversalModal/UniversalModalFooter';
import { ShowToastError } from 'Components/Toast';
import {
  gameTypeLables,
  gameTypeOptions,
  gameTypeServerLabels,
  matchEntryOptions,
  matchFormatOptions,
  matchMessages,
  matchTypeOptions, REQUIRED
} from 'const';
import { isObjectEmpty, makeSelector } from 'helpers';
import { usePrevious } from 'hooks';
import {
  GameFormats,
  IMatch,
  IMatchFormValues,
  IUserProfileResp, resetMatchModel
} from 'interfaces';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './match-create-modal.scss';



interface IMatchCreateModalProps {
  initialValues: IMatch;
  isPrompt: boolean;
  promptTitle: string;
  closeEditor(): void;
  isEditModal?: boolean;
}

export const MatchCreateModal = (props: IMatchCreateModalProps) => {
  const dispatch = useDispatch();
  const { closeEditor, isPrompt, promptTitle, initialValues } = props;
  const isEdit = Boolean(initialValues) && !isObjectEmpty(initialValues);
  const btnName = isEdit ? 'Edit' : 'Create';
  let { pathname } = useLocation();

  const  {anyUserId}  = useSelector<any, any>(
    makeSelector(['userReducer', 'anyUserOnlineOfflineInfo']),
  );
  
  let isProfilePage = pathname.includes('profile');
  let opponentId = pathname.slice(pathname.lastIndexOf('/') + 1);



  // let opponentIdLength = opponentId .length > 20; 

  // let canDirectChallange = isProfilePage && opponentIdLength;

  // let isDirectChallange = (/direct/gi).test(promptTitle);


  const methods = useForm<IMatchFormValues>({
    defaultValues: {
      ...resetMatchModel(),
      terms_and_conditions: false,
    },
  });

  const {
    control,
    handleSubmit,
    errors,
    reset,
    watch,
    clearErrors,
    getValues,
  } = methods;

  const TypedController: any = useTypedController<IMatchFormValues>({ control });


  const userData = useSelector<any, IUserProfileResp>(
    makeSelector(['profileReducer', 'userData']),
  );

  const isLoading = useSelector<any, boolean>(
    makeSelector(['matchesReducer', 'isLoading']),
  );

  const prevUserData = usePrevious(userData);

  const [selectedValue, setSelectedValue]:any = useState(initialValues.format);
  const [selectedType, setSelectedType] = useState(initialValues.type);
  const [selectedGame, setSelectedGame] = useState(initialValues.game || 1);

  const handleDispatch = (data: IMatchFormValues) => {
    const { balance, nicknames } = userData;
    const { entry, game, nickname } = data;

    const name = nicknames[gameTypeLables[game].toUpperCase()];

    // Validation by balance
    if (balance < entry) {
      ShowToastError({
        title: matchMessages.BALANCE_ERROR,
      });
      return;
    }
    if (name === nickname) {
      delete data.nickname;
    }

    if (isEdit) {
      const updatedData = {
        ...data,
        id: initialValues.id,
        format: !!selectedValue?selectedValue:((selectedGame === 3)?12:1),
        type: !!selectedType ? selectedType : 1,
        game:selectedGame
      };
      dispatch(
        editMatchAction(updatedData, {
          redirect: () => {
            closeEditor();
            reset();
          },
        }),
      );
    } else {
      /*
      
      TODO : Here we need to add other && for online offine 

      Use firebase for this:

      */

      // if(isDirectChallange && canDirectChallange ){
      //   let directChallengeData = {
      //     ...data,
      //     opponentId,
      //   }
      //   dispatch(
      //     directChallengeAction(directChallengeData, {
      //       redirect: () => {
      //         closeEditor();
      //         reset();
      //       },
      //     }),
      //   );
      //   return;
      // }
      let directChallengeData = {
        ...data,
        opponent: opponentId,
        format: !!selectedValue?selectedValue:((selectedGame === 3)?12:1),
        type: !!selectedType ? selectedType : 1,
        game:selectedGame
      }
      dispatch(
        createMatchAction(directChallengeData, {
          redirect: () => {
            closeEditor();
            reset();
          },
        }),
      );
    }
  };

  const wrappedOnSubmit = (data: IMatchFormValues) => {
    delete data.terms_and_conditions;
    handleDispatch(data);
  };

  const submit = handleSubmit(wrappedOnSubmit);

  const watchFormat = watch('format');
  let watchGame = watch('game');
  
  const updateFormAfterGameChange = () => {
    const nickname = userData?.nicknames[gameTypeServerLabels[selectedGame]] || '';    
    const updateValues = Object.keys(getValues()).length
      ? getValues()
      : resetMatchModel();
    reset({
      ...updateValues,
      nickname,
      format: GameFormats.FORMAT_STANDART,
      terms_and_conditions: false,
    });

    clearErrors();
  };


  useEffect(() => {
    updateFormAfterGameChange();
  }, [watchGame, isPrompt,selectedGame]);

  useEffect(() => {
    if (prevUserData && !prevUserData.id && userData.id) {
      const nickname =
        userData?.nicknames[gameTypeServerLabels[watchGame]] || '';
      reset({
        ...resetMatchModel(),
        nickname,
        terms_and_conditions: false,
      });
    }
  }, [userData]);

  useEffect(() => {
    setSelectedType(initialValues.type);
    setSelectedValue(initialValues.format);
    setSelectedGame(!!initialValues.game ? initialValues.game : 1);
    if (isEdit) {
      const nickname =
        userData?.nicknames[gameTypeServerLabels[watchGame]] || '';
      reset({
        ...initialValues,
        nickname,
        entry: Number(initialValues.entry),
        terms_and_conditions: true,
      });
    }
  }, [initialValues]);


  const hasNikname = Boolean(
    userData?.nicknames[gameTypeServerLabels[selectedGame]],
  );

  const handleChange = (event) => {
    setSelectedValue(event.target.value || selectedValue);
  }

  const handleGameChange = (event) => {
    setSelectedGame(event);
   setSelectedValue(undefined);
   watchGame =  event;
   
  }

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  }

  if (!userData.id) return null;

  return (
    <UniversalModal
      visible={isPrompt}
      title={promptTitle}
      onCancel={closeEditor}
      className="category-editor-modal"
    >
      <FormProvider {...methods}>
        <form className="match-edit-form" onSubmit={submit}>
          <div className="match-edit-form__row">
            <div className="match-edit-form__col w100">
              <TypedController
                name="game"
                render={(props) => (
                  <FormRadioSwitch
                  {...props}
                  name="game"
                  options={gameTypeOptions}
                  label="CHOOSE GAME"  
                  value={selectedGame}
                  onChange={handleGameChange}
                  />
                )}
              />
            </div>
          </div>
          <div className="match-edit-form__row">
            <div className="match-edit-form__col w50">
              <TypedController
                name="format"
                render={(props) =>
                  <FormSelect
                    {...props}
                    name="format"
                    options={matchFormatOptions[selectedGame]}
                    value={!!selectedValue?selectedValue:((selectedGame === 3)?12:1)}
                    label="GAME FORMAT"
                    onChange={(event) => {
                      handleChange(event);
                    }}
                  />
                }
              />
            </div>
            <div className="match-edit-form__col w50">
              <TypedController
                name="type"
                render={(props) => (
                  <FormSelect
                    {...props}
                    name="type"
                    options={matchTypeOptions}
                    value={!!selectedType ? selectedType : 1}
                    label="Match type"
                    onChange={(event) => { handleTypeChange(event) }}
                  />
                )}
              />
            </div>
          </div>
          <div className="match-edit-form__row">
            <div className="match-edit-form__col w100">
              <TypedController
                name="entry"
                render={(props) => {
                  return (
                    <div className="input-box match-edit-form-entry">
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Entry</FormLabel>
                        <RadioGroup
                          aria-label="gender"
                          name="entry"
                          onChange={(e, value) => {
                            props.onChange(Number(value));
                          }}
                          value={props.value}
                        >
                          {matchEntryOptions.map((o, i) => {
                            return (
                              <FormControlLabel
                                key={i}
                                value={o.price}
                                control={<Radio />}
                                label={
                                  <span className="match-edit-form-entry__text">
                                    <span className="match-edit-form-entry__price">
                                      <span>$</span>{o.price}
                                    </span>
                                    <span className="match-edit-form-entry__price-total">
                                      (${o.totalPrice} total prize)
                                    </span>
                                  </span>
                                }
                              />
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                    </div>
                  );
                }}
              />
            </div>
          </div>
          <div className="match-edit-form__row">
            <div className="match-edit-form__col w100">
              <TypedController
                name="nickname"
                disabled={hasNikname}
                // @ts-ignore
                // rules={NO_WHITESPACE_ALLOWED}
                render={(props) => (
                  <FormTextInput
                    placeholder="Enter In-GAME name"
                    name="nickname"
                    label="In-GAME name"
                    error={errors.nickname}
                    isChecked
                    disabled={hasNikname}
                    {...props}
                  />
                )}
              />
            </div>
          </div>

          {Number(selectedValue) === GameFormats.FORMAT_CUSTOM && (
            <div className="match-edit-form__row">
              <div className="match-edit-form__col w100">
                <TypedController
                  name="rule"
                  rules={REQUIRED}
                  render={(props) => (
                    <FormTextArea
                      placeholder="You can type any extra rules or notes here…"
                      name="rule"
                      label="extra rules / notes"
                      error={errors.rule}
                      {...props}
                    />
                  )}
                />
              </div>
            </div>
          )}

          <UniversalModalFooter
            onSubmit={submit}
            title={`${btnName} Match`}
            btnType="create"
            isLoading={isLoading}
          />
        </form>
      </FormProvider>
    </UniversalModal>
  );
};
