import { createSelector } from 'reselect';

const selectRouter = (state: any) => state.get('router');

const makeSelectLocation = () => createSelector(
  selectRouter,
  (state: any) => {
    return state.get('location').toJS();
  }
);

export {
  selectRouter,
  makeSelectLocation,
};
