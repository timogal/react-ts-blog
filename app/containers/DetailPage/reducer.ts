import { fromJS } from 'immutable';
import { AnyAction } from 'redux';

import { DETAIL_LOAD_SUCCESS } from './constants';

const initialState = fromJS({
  detail: null
});

export default function detailReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case DETAIL_LOAD_SUCCESS:
      return state
        .set('detail', fromJS(action.detail));
    default:
      return state;
  }
}
