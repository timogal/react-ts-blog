import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectLocation } from 'selectors/routerSelectors';
import { closeMenu } from '../../actions';

interface Props {
  location: any
  closeMenu: () => void
}

interface ScrollTopState {
}

class ScrollTop extends React.Component<Props, ScrollTopState> {
  componentWillReceiveProps({ location: nextLocation }: Props) {
    const { location } = this.props;
    if (nextLocation.pathname !== location.pathname) {
      this.props.closeMenu();
      window.scrollTo({ top: 0 });
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    closeMenu() {
      dispatch(closeMenu());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScrollTop);
