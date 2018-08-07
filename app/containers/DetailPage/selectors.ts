import { createSelector } from 'reselect';

const selectDetail = (state: any) => state.get('detailPage');

const makeSelectDetail = () => createSelector(
  selectDetail,
  (detailState: any): any => {
    const detail = detailState.get('detail');
    return detail ? detail.toJS() : null;
  }
);

export {
  selectDetail,
  makeSelectDetail
};
