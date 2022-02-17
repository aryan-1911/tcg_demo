import { IDisputeFormValues } from 'interfaces';

export const prepareDisputeRequestData = (data: IDisputeFormValues) => {
  const {
    attachments = [],
    competition,
    game_partner_name,
    game_user_name,
    text,
  } = data;
  const attach = attachments.reduce((acc, cur, i) => {
    const key = `attachment[${i}]`;
    return {
      ...acc,
      [key]: cur,
    };
  }, {});

  return {
    competition,
    game_partner_name,
    game_user_name,
    text,
    ...attach,
  };
};
