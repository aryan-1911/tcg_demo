import { Icon } from '@material-ui/core';
import { resetContactForm } from 'actions';
import { Button } from 'Components/common/form';
import { ContactUsStatuses } from 'const/contactUsStatuses';
import React from 'react';
import { useDispatch } from 'react-redux';
import './contacts-styles.scss';

const ContactsSuccessForm = () => {
  const dispatch = useDispatch();
  const onClick = () => dispatch(resetContactForm(ContactUsStatuses.reset));

  return (
    <div className="contacts-page contact-message-sent-success card-form">
      <Icon className="icon-success_modal" />
      <span className="contact-message-sent-success__title">
        Thanks for contacting us.
      </span>
      <span className="contact-message-sent-success__sub-title">
        We will contact you as soon as possible
      </span>
      <Button onClick={onClick}>Send New Message</Button>
    </div>
  );
};

export default ContactsSuccessForm;
