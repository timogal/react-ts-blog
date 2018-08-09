import { fromJS, List } from 'immutable';
import { AnyAction } from 'redux';

import { START_LOADING, LOAD_FAILED, LOAD_SUCCESS } from './contants';

const initialState = fromJS({
  loading: false,
  items: [],
  page: 1,
  totalPages: null,
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
      const { totalPages, page, items } = action.data;
      return state
        .set('loading', false)
        .set('totalPages', totalPages)
        .set('page', page)
        .update('items', (values: List<any>) => {
          items.forEach((item: any) => {
            values = values.push(fromJS(item));
          });
          return values;
        });
    default:
      return state;
  }
}
