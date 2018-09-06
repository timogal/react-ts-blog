import { fromJS } from "immutable";
import { Action } from "redux";

import { CLOSE_MENU, OPEN_MENU } from '../actions/constants';

const globalState = fromJS({
  menu: {
    open: false,
  }
});

export default function globalReducers(state: any = globalState, action: Action) {
  switch (action.type) {
    case CLOSE_MENU:
      return state
        .setIn(['menu', 'open'], false);
    case OPEN_MENU:
      return state
        .setIn(['menu', 'open'], true);
    default:
      return state;
  }
}
