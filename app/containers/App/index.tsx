import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Helmet } from 'react-helmet';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Sidebar from 'components/Sidebar';
import IndexPage from 'containers/IndexPage/async';
import AboutPage from 'containers/About/async';

import ssrRoutes from '../../ssrRoutes';

import * as styles from './app.scss';

export default function App() {
  return (
    <div className={styles.container}>
      <Helmet titleTemplate="%s - 心有猛虎,细嗅蔷薇" defaultTitle="心有猛虎,细嗅蔷薇" />
      <Header />
      <main className={styles.main}>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route path="/about" component={AboutPage} />
          {
            ssrRoutes.map(({ path, component }) => (
              <Route key={path} path={path} component={component} />
            ))
          }
        </Switch>
      </main>
      <Footer />
      <Sidebar />
    </div>
  );
}
