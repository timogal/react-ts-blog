import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Helmet } from 'react-helmet';

import 'normalize.css/normalize.css';

import Header from 'components/Header';
import Footer from 'components/Footer';
import IndexPage from 'containers/IndexPage/async';
import AboutPage from 'containers/About/async';
import DetailPage from 'containers/DetailPage/async';

import * as styles from './app.scss';

export default function App() {
  return (
    <div className={styles.container}>
      <Helmet>
        <title>心有猛虎,细嗅蔷薇</title>
      </Helmet>
      <Header />
      <main className={styles.main}>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/p/:id" component={DetailPage} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}
