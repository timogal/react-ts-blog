import { Action } from 'redux';
import { combineReducers } from 'redux-immutable';

function rootReducer(state: any = {}, action: Action) {
  /*switch (action.type) {

  }*/
  return state;
}

export default combineReducers({
  root: rootReducer,
});
