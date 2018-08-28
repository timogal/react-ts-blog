import { combineReducers } from 'redux-immutable';

import globalReducer from './global';
import detailReducer from 'containers/DetailPage/reducer';
import indexReducer from 'containers/IndexPage/reducer';
import archiveReducer from 'containers/ArchivePage/reducer';

export default combineReducers({
  global: globalReducer,
  detailPage: detailReducer,
  indexPage: indexReducer,
  archivePage: archiveReducer,
});
