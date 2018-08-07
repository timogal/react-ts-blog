import { Action } from 'redux';
import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';

import detailReducer from 'containers/DetailPage/reducer';

const globalState = fromJS({});

function globalReducer(state: any = globalState, action: Action) {
  /*switch (action.type) {

  }*/
  return state;
}

export default combineReducers({
  global: globalReducer,
  detailPage: detailReducer
});
