import PageHeader from 'Components/PageHeader';
import { makeSelector } from 'helpers';
import React from 'react';
import { useSelector } from 'react-redux';
import { ContactUsStatuses } from '../../const/contactUsStatuses';
import './contacts-styles.scss';
import { ContactsPageForm } from './ContactsPageForm';
import ContactsSuccessForm from './ContactsSuccessForm';

export const ContactsPage = () => {
  const isMessageSent = useSelector(
    makeSelector(['authReducer', 'isMessageSent']),
  );
  return (
    <div className="contacts-page-wrapper">
      <PageHeader title="Contact Us" />
      {isMessageSent === ContactUsStatuses.ok ? (
        <ContactsSuccessForm />
      ) : (
        <ContactsPageForm />
      )}
    </div>
  );
};
