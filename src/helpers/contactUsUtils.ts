import { IContactUsFormValues } from 'interfaces';

export const prepareContactUsRequestData = (data: IContactUsFormValues) => {
  const {
    attachments = [],
    subject,
    message,
  } = data;
  const attach = attachments.reduce((acc, cur, i) => {
    const key = `attachment[${i}]`;
    return {
      ...acc,
      [key]: cur,
    };
  }, {});

  return {
    subject,
    message,
    ...attach,
  };
};
