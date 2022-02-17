import {
  APPLY_FOR_AFFILIATION,
  CONTACT_QUERY,
  EDIT_USER_INFO,
  FETCH_USER_INFO,
  GET_CENTRIFUGE_TOKEN,
  GET_PROFILE_MATCHES,
  ONLINE_OFFLINE_DATA,
  PARTIAL_USER_INFO_EDITING, RESET_CONTACT_FORM,
  UPDATE_ACTIVE_COMPETITION_ID, UPDATE_PROFILE_BALANCE
} from 'const';
import { ContactUsType } from 'const/contactUsStatuses';
import {
  IActionFn,
  IPartialUserInfoEditing, IUserProfile,
  QueryParams
} from 'interfaces';

export const editUserInfoAction: IActionFn<IUserProfile> = (payload) => {
  return {
    payload,
    type: EDIT_USER_INFO.PENDING,
  }
};

export const fetchUserInfoAction: IActionFn = (payload) => ({
  payload,
  type: FETCH_USER_INFO.PENDING,
});

export const partialUserInfoEditingAction: IActionFn<IPartialUserInfoEditing> = (
  payload,
  params,
) => ({
  payload,
  params,
  type: PARTIAL_USER_INFO_EDITING.PENDING,
});

export const contactQueryAction: IActionFn<{
  subject: string;
  attachments: File[];
  message: string;
}> = (payload) => ({
  payload,
  type: CONTACT_QUERY.PENDING,
});

export const resetContactForm: IActionFn<ContactUsType> = (payload) => ({
  payload,
  type: RESET_CONTACT_FORM.PENDING,
});

export const getCentrifugeTokenAction: IActionFn = (payload) => ({
  payload,
  type: GET_CENTRIFUGE_TOKEN.PENDING,
});

export const updateProfileBalance: IActionFn<number> = (payload) => ({
  payload,
  type: UPDATE_PROFILE_BALANCE,
});

export const updateActiveCompetitionId: IActionFn<string | null | undefined> = (payload) => ({
  payload,
  type: UPDATE_ACTIVE_COMPETITION_ID,
});

export const getProfileMatchesAction: IActionFn<QueryParams> = (payload) => ({
  payload,
  type: GET_PROFILE_MATCHES.PENDING,
});

export const applyForAffiliationAction: IActionFn = (payload, params) => ({
  payload,
  params,
  type: APPLY_FOR_AFFILIATION.PENDING,
});

export const onlieOfflineDataAction: IActionFn<any> = (
  payload,
) => ({
  payload,
  type: ONLINE_OFFLINE_DATA,
});
