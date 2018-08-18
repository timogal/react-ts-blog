import { Action } from 'redux';
import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';

import detailReducer from 'containers/DetailPage/reducer';
import indexReducer from 'containers/IndexPage/reducer';
import archiveReducer from 'containers/ArchivePage/reducer';

const globalState = fromJS({});

function globalReducer(state: any = globalState, action: Action) {
  /*switch (action.type) {

  }*/
  return state;
}

export default combineReducers({
  global: globalReducer,
  detailPage: detailReducer,
  indexPage: indexReducer,
  archivePage: archiveReducer,
});
