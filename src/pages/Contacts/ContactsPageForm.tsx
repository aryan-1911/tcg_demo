import { useTypedController } from '@hookform/strictly-typed';
import { contactQueryAction } from 'actions';
import {
  Button,
  FormInputFile,
  FormTextArea,
  FormTextInput
} from 'Components/common/form';
import { REQUIRED } from 'const';
import { makeSelector } from 'helpers';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import './contacts-styles.scss';

interface FormValues {
  subject: string;
  message: string;
  attachments: File[];
}

export const ContactsPageForm = () => {
  const { control, handleSubmit, reset, errors } = useForm<FormValues>();
  const TypedController: any = useTypedController<FormValues>({ control });
  const dispatch = useDispatch();

  const onSubmit = handleSubmit((data) => {
    dispatch(contactQueryAction(data));

    // console.log(dispatch(contactQueryAction(data)));
    
    // reset({
    //   message:'',
    //   subject:'',
    //   attachments:[],
    // });
      
  });

  const isLoading = useSelector<any, boolean>(
    makeSelector(['authReducer', 'isLoading']),
  );

  return (
    <form onSubmit={onSubmit} className="contacts-page card-form columns">
      <div className="card-form__col">
        <div className="form-element">
          <TypedController
            name="subject"
            rules={REQUIRED}
            render={(props) => (
              <FormTextInput
                name="subject"
                placeholder="Please enter the subject"
                label="Subject"
                {...props}
                error={errors.subject}
              />
            )}
          />
        </div>
        <div className="dispute-form__files">
          <TypedController
            name="attachments"
            render={(props) => (
              <FormInputFile
                name="attach"
                multiple={true}
                btnName="Upload file"
                {...props}
              />
            )}
          />
        </div>
      </div>
      <div className="card-form__col">
        <div className="form-element">
          <TypedController
            name="message"
            rules={REQUIRED}
            render={(props) => (
              <FormTextArea
                name="message"
                placeholder="Enter your message"
                label="Message"
                {...props}
                error={errors.message}
              />
            )}
          />
        </div>
        <Button onClick={onSubmit} type="submit" isLoading={isLoading}>
          Submit
        </Button>
      </div>
    </form>
  );
};
