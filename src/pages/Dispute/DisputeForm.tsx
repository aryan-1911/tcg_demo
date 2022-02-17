import { useTypedController } from '@hookform/strictly-typed';
import { saveDisputeDataAction } from 'actions';
import {
  Button,
  FormInputFile,
  FormTextArea,
  FormTextInput
} from 'Components/common/form';
import { REQUIRED } from 'const';
import { makeSelector } from 'helpers';
import { IDisputeFormValues } from 'interfaces';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';


interface IDisputeFormProps {
  onSubmit: (data: IDisputeFormValues, reset: () => void) => void;
}

function DisputeForm(props: IDisputeFormProps) {
  const disputeData = useSelector<any, IDisputeFormValues>(
    makeSelector(['disputeReducer', 'disputeData']),
  );

  const [state, setState] = useState(disputeData);

  const location = useLocation();
  
  //@ts-ignore
  let competitionDetails = location?.state;    
  //@ts-ignore
  const { onSubmit } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveDisputeDataAction(state));
  }, [dispatch, state]);


  useEffect(() => {
    if(competitionDetails){
      // @ts-ignore
      setState(competitionDetails);
    }
  }, [dispatch, competitionDetails]);

  const { control, handleSubmit, errors, reset } = useForm<
    IDisputeFormValues
  >();

  const TypedController: any = useTypedController<IDisputeFormValues>({ control });

  const isLoading = useSelector<any, boolean>(
    makeSelector(['profileReducer', 'isLoading']),
  );

  const defaultValues = {
    attachments: [],
    competition: '',
    game_partner_name: '',
    game_user_name: '',
    text: '',
  };

  const wrappedOnSubmit = (data: IDisputeFormValues) => {
    onSubmit(data, reset);
    setState(defaultValues);
    reset(defaultValues);
  };

  const submit = handleSubmit(wrappedOnSubmit);

  const handleChangeField = (value, field) => {
    setState((state) => {
      return {
        ...state,
        [field]: value,
      };
    });
  };

  return (
    <form className="dispute-form card-form columns" onSubmit={submit}>
      <div className="dispute-form__col card-form__col">
        <div className="form-element">
          <TypedController
            name="competition"
            rules={REQUIRED}
            //@ts-ignore
            defaultValue={state.competition || competitionDetails?.competition}
            render={(props) => (
              <FormTextInput
                type="text"
                label="Match ID"
                name="competition"
                error={errors.competition}
                placeholder="Enter match ID"
                handleChangeField={handleChangeField}
                {...props}
                //@ts-ignore
                value={state.competition || competitionDetails?.competition}
              />
            )}
          />
        </div>
        <div className="form-element">
          <TypedController
            name="game_user_name"
            rules={REQUIRED}
            //@ts-ignore
            defaultValue={state.game_user_name || competitionDetails?.game_user_name}
            render={(props) => (
              <FormTextInput
                label="IN-GAME name"
                name="game_user_name"
                error={errors.game_user_name}
                placeholder="Enter your in-game name"
                handleChangeField={handleChangeField}
                {...props}
                //@ts-ignore                
                value={state.game_user_name || competitionDetails?.game_user_name}
              />
            )}
          />
        </div>
        <div className="form-element">
          <TypedController
            name="game_partner_name"
            rules={REQUIRED}
            //@ts-ignore
            defaultValue={state.game_partner_name || competitionDetails?.game_partner_name}
            render={(props) => (
              <FormTextInput
                label="opponent’s IN-GAME name"
                name="game_partner_name"
                error={errors.game_partner_name}
                placeholder="Enter opponent’s in-game name"
                handleChangeField={handleChangeField}
                {...props}
                //@ts-ignore
                value={state.game_partner_name || competitionDetails?.game_partner_name}
              />
            )}
          />
        </div>
      </div>
      <div className="dispute-form__col card-form__col">
        <div className="form-element">
          <TypedController
            name="text"
            rules={REQUIRED}
            defaultValue={state.text}
            render={(props) => (
              <FormTextArea
                label="Complaint"
                name="text"
                error={errors.text}
                placeholder="Tell us about your problem…"
                handleChangeField={handleChangeField}
                {...props}
                value={state.text}
              />
            )}
          />
        </div>
        <div className="dispute-form__line--submit">
          <div className="dispute-form__files">
            <TypedController
              name="attachments"
              render={(props) => (
                <FormInputFile
                  multiple={true}
                  btnName="Attach evidence"
                  handleChangeField={handleChangeField}
                  {...props}
                  name="attach"
                  fieldName="attachments"
                  value={state.attachments}
                />
              )}
            />
          </div>
          <div className="dispute-form__btn">
            <Button
              btnStyle="red"
              onClick={submit}
              type="submit"
              isLoading={isLoading}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default DisputeForm;
