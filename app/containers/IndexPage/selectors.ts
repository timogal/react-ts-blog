import { createSelector } from 'reselect';

const selectIndex = (state: any) => state.get('indexPage');

const makeSelectPage = () => createSelector(
  selectIndex,
  (state: any) => {
    return state.get('page');
  }
);

const makeSelectTotalPages = () => createSelector(
  selectIndex,
  (state: any) => {
    return state.get('totalPages');
  }
);

const makeSelectTotal = () => createSelector(
  selectIndex,
  (state: any) => {
    return state.get('total');
  }
);

const makeSelectItems = () => createSelector(
  selectIndex,
  (state: any) => {
    return state.get('items').toJS();
  }
);

const makeSelectLoading = () => createSelector(
  selectIndex,
  (state: any) => {
    return state.get('loading');
  }
);

export {
  makeSelectItems,
  makeSelectLoading,
  makeSelectPage,
  makeSelectTotalPages,
  makeSelectTotal,
  selectIndex
};
