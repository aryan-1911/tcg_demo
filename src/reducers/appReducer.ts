import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

import { makeCombinedAction } from 'helpers';
import { RESET_UPLOAD_FILE_STATE, UPLOAD_FILE } from 'const';

export interface SentMedia {
  file: Blob | File | null;
  status: number; // StatusCode
  url: string; // to server
  id: string | number;
}

export const resetSentMediaModel = (
  mediaId: string | number = 0,
): SentMedia => ({
  file: null,
  status: 0,
  url: '',
  id: mediaId,
});

export interface AppReducerState {
  isLoading: boolean;
  sentMediaMap: { [key: string]: SentMedia };
}

// tslint:disable-next-line: no-object-literal-type-assertion
const initialState = Immutable.fromJS({
  isLoading: false,
  sentMediaMap: {},
} as AppReducerState);

const { PENDING, DONE } = makeCombinedAction(
  UPLOAD_FILE,
  RESET_UPLOAD_FILE_STATE,
);

const appReducer = handleActions(
  {
    [PENDING]: (state: any) => {
      return state.set('isLoading', true);
    },
    [DONE]: (state: any) => {
      return state.set('isLoading', false);
    },
    [`${UPLOAD_FILE.PENDING}||${RESET_UPLOAD_FILE_STATE.SUCCESS}`]: (
      state: any,
      { payload: mapKey },
    ) => {
      return state.setIn(
        ['sentMediaMap', mapKey],
        Immutable.fromJS(resetSentMediaModel()),
      );
    },
    [UPLOAD_FILE.DONE]: (state, { payload }) => {
      return state.setIn(
        ['sentMediaMap', payload.id],
        Immutable.fromJS(payload),
      );
    },
  },
  initialState,
);

export default appReducer;
