import {
  ALLOW_CHALLENGE, ANY_USER_ONLINE_OFFLINE_DATA, BLOCK_USER, DIRECT_CHALLENGE, GET_USER,
  GET_USER_MATCHES,
  UNBLOCK_USER,
  USER_ONLINE_OFFLINE_DATA
} from 'const/actionTypes';
import { IActionFn, IMatch, QueryParams } from 'interfaces';

export const getUserAction: IActionFn<string> = (payload) => ({
  payload,
  type: GET_USER.PENDING,
});

export const getUserMatchesAction: IActionFn<QueryParams> = (payload) => ({
  payload,
  type: GET_USER_MATCHES.PENDING,
});

export const blockUserAction: IActionFn<string> = (payload, params) => ({
  payload,
  params,
  type: BLOCK_USER.PENDING,
});

export const directChallengeAction: IActionFn<IMatch> = (payload, params) => ({
  payload,
  params,
  type: DIRECT_CHALLENGE.PENDING,
});


export const allowChallengeAction: any = (payload, params) => ({
  payload,
  params,
  type: ALLOW_CHALLENGE.PENDING,
});


export const unblockUserAction: IActionFn<string> = (payload, params) => ({
  payload,
  params,
  type: UNBLOCK_USER.PENDING,
});


export const userOnlieOfflineDataAction: IActionFn<any> = (
  payload,
) => ({
  payload,
  type: USER_ONLINE_OFFLINE_DATA,
});


export const anyUserOnlieOfflineDataAction: IActionFn<any> = (
  payload,
) => ({
  payload,
  type: ANY_USER_ONLINE_OFFLINE_DATA,
});
