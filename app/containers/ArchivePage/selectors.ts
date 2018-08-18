import { createSelector } from 'reselect';

const selectArchive = (state: any) => state.get('archivePage');

const makeSelectPage = () => createSelector(
  selectArchive,
  (state: any) => {
    return state.get('page');
  }
);

const makeSelectTotalPages = () => createSelector(
  selectArchive,
  (state: any) => {
    return state.get('totalPages');
  }
);

const makeSelectTotal = () => createSelector(
  selectArchive,
  (state: any) => {
    return state.get('total');
  }
);

const makeSelectItems = () => createSelector(
  selectArchive,
  (state: any) => {
    return state.get('items').toJS();
  }
);

const makeSelectLoading = () => createSelector(
  selectArchive,
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
  selectArchive
};
