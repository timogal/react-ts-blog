import * as React from 'react';

import Main from 'components/Main';
import Loading from 'components/Loading';

import 'assets/favicon.ico';

class IndexPage extends React.Component<any, any> {
  render(): JSX.Element {
    return (
      <Main>
        <h2>Website in building</h2>
        <Loading />
      </Main>
    );
  }
}

export default IndexPage;
