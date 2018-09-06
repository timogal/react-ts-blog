import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Helmet } from 'react-helmet';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Sidebar from 'components/Sidebar';
import MonthlyArchive from 'containers/MonthlyArchive/async';
import Search from 'containers/Search/async';
import TagCloud from 'containers/TagCloud';
import CategoryPage from 'containers/CategoryPage';
import NotFound from 'containers/NotFound';

import ScrollTop from './ScrollTop';
import ssrRoutes from '../../ssrRoutes';

import * as styles from './app.scss';

export default function App() {
  return (
    <div className={styles.container}>
      <Helmet titleTemplate="%s - 心有猛虎,细嗅蔷薇" defaultTitle="心有猛虎,细嗅蔷薇" />
      <Header />
      <ScrollTop />
      <main className={styles.main}>
        <Switch>
          {
            ssrRoutes.map(({ path, component, exact }) => (
              <Route key={path} path={path} component={component} exact={exact} />
            ))
          }
          <Route path="/archives/:date(\d{4}-\d{2})" component={MonthlyArchive} />
          <Route path="/tags" component={TagCloud} />
          <Route path="/categories" component={CategoryPage} />
          <Route path="/search" component={Search} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <Sidebar />
    </div>
  );
}
