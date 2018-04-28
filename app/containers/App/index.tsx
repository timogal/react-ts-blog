import * as React from 'react';
import { Route, Switch } from 'react-router';
import { ThemeProvider } from 'components/styled';

import 'normalize.css/normalize.css';

import Header from 'components/Header';
import Footer from 'components/Footer';
import IndexPage from 'containers/IndexPage/async';
import AboutPage from 'containers/About/async';

import '../../global-styles';

import theme from '../../theme';

import * as styles from './app.scss';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route path="/about" component={AboutPage} />
          </Switch>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
