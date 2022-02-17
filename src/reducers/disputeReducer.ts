import Immutable from 'immutable';
import { handleActions } from 'redux-actions';
import { SAVE_DISPUTE_DATA } from 'const';
import { IDisputeFormValues } from 'interfaces';

export interface DisputeReducerState {
  disputeData: IDisputeFormValues;
}

const initialState = Immutable.fromJS({
  disputeData: {
    competition: '',
    game_user_name: '',
    game_partner_name: '',
    text: '',
    attachments: [],
  },
});

const disputeReducer = handleActions(
  {
    [SAVE_DISPUTE_DATA]: (state: any, { payload }) => {
      return state.set('disputeData', payload);
    },
  },
  initialState,
);

export default disputeReducer;
