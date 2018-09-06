import { createSelector } from 'reselect';

const makeSelectGlobal = (state: any) => state.get('global');

const makeSelectMenuOpen = () => createSelector(
  makeSelectGlobal,
  (state: any) => {
    return state.getIn(['menu', 'open'], false);
  }
);

export {
  makeSelectGlobal,
  makeSelectMenuOpen
};
