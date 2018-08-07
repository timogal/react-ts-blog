import * as React from 'react';
import Main from 'components/Main';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { makeSelectDetail } from './selectors';

interface DetailProps {
  detail: any
}

class DetailPage extends React.Component<DetailProps, any> {
  render(): JSX.Element {
    return (
      <Main>
        Detail Page!
      </Main>
    );
  }
}

const mapStateToProps = createStructuredSelector({
    detail: makeSelectDetail()
  }
);

export default connect(mapStateToProps)(DetailPage);
