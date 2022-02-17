import { makeActionType } from 'helpers';

// USER
export const GET_USER = makeActionType('GET_USER');
export const GET_USER_MATCHES = makeActionType('GET_USER_MATCHES');
export const BLOCK_USER = makeActionType('BLOCK_USER');
export const UNBLOCK_USER = makeActionType('UNBLOCK_USER');
export const DIRECT_CHALLENGE = makeActionType('DIRECT_CHALLENGE');
export const ALLOW_CHALLENGE = makeActionType('ALLOW_CHALLENGE');
export const USER_ONLINE_OFFLINE_DATA = 'USER_ONLINE_OFFLINE_DATA';
export const ANY_USER_ONLINE_OFFLINE_DATA = 'ANY_USER_ONLINE_OFFLINE_DATA';


