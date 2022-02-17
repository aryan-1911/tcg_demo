import { combineReducers } from 'redux-immutable';
import appReducer, { AppReducerState } from './appReducer';
import authReducer from './authReducer';
import matchesReducer from './matchesReducer';
import profileReducer from './profileReducer';
import depositReducer from './depositReducer';
import userReducer from './userReducer';
import messagesReducer, { MessagesReducerState } from './messagesReducer';
import staticPagesReducer, {
  StaticPagesReducerState,
} from './staticPagesReducer';
import disputeReducer, { DisputeReducerState } from './disputeReducer';
import filtersReducer, { FiltersReducerState } from './filtersReducer';

export interface IAppReducer {
  appReducer: AppReducerState;
  authReducer: any;
  matchesReducer: any;
  profileReducer: any;
  depositReducer: any;
  userReducer: any;
  messagesReducer: MessagesReducerState;
  staticPagesReducer: StaticPagesReducerState;
  disputeReducer: DisputeReducerState;
  filtersReducer: FiltersReducerState;
}

const mainAppReducer = combineReducers<IAppReducer>({
  appReducer,
  authReducer,
  matchesReducer,
  profileReducer,
  depositReducer,
  userReducer,
  messagesReducer,
  staticPagesReducer,
  disputeReducer,
  filtersReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'SIGN_OUT_SUCCESS') {
		state = undefined;
	}
  return mainAppReducer(state, action);
};

export default rootReducer;

export * from './appReducer';
export * from './matchesReducer';
export * from './profileReducer';
export * from './depositReducer';
export * from './userReducer';
export * from './messagesReducer';
export * from './staticPagesReducer';
export * from './disputeReducer';
export * from './filtersReducer';
