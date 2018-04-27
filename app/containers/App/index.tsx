import * as React from 'react';
import { Route, Switch } from 'react-router';
import { ThemeProvider } from 'components/styled';

import 'normalize.css/normalize.css';

import Header from 'components/Header';
import IndexPage from 'containers/IndexPage/async';
import AboutPage from 'containers/About/async';

import '../../global-styles';

import theme from '../../theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={IndexPage}/>
          <Route path="/about" component={AboutPage}/>
        </Switch>
      </div>
    </ThemeProvider>
  );
}
