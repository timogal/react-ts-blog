import { fromJS, List } from 'immutable';
import { AnyAction } from 'redux';

import { START_LOADING, LOAD_FAILED, LOAD_SUCCESS, LOAD_SENTENCE_SUCCESS } from './constants';

const initialState = fromJS({
  loading: false,
  items: [],
  page: 1,
  totalPages: null,
  total: 0,
  sentence: null,
});

export default function (state = initialState, action: AnyAction) {
  switch (action.type) {
    case START_LOADING:
      return state
        .set('loading', true);
    case LOAD_FAILED:
      return state
        .set('loading', false);
    case LOAD_SUCCESS:
      const { totalPages, page, items, total } = action.data;
      return state
        .set('loading', false)
        .set('totalPages', totalPages)
        .set('total', total)
        .set('page', page)
        .set('items', fromJS(items));
    case LOAD_SENTENCE_SUCCESS:
      return state
        .set('sentence', fromJS(action.data));
    default:
      return state;
  }
}
