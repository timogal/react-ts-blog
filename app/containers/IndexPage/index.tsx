import * as React from 'react';

import { Row, Col } from 'components/Grid';
import Main from 'components/Main';
import Panel from 'components/Panel';
import Loading from 'components/Loading';

import 'assets/favicon.ico';

import styles from './Index.scss';

class IndexPage extends React.Component<any, any> {
  render(): JSX.Element {
    return (
      <Main>
        <Row gutter={24}>
          <Col span={8}>
            <Panel>
              <h2>Website in building...</h2>
              <Loading />
            </Panel>
          </Col>
          <Col span={4}>
            <Panel head="友情链接">
              <ul className={styles.friendLinks}>
                <li>
                  <a href="http://blog.iyu.pub">听风吟且行</a>
                </li>
                <li>
                  <a href="http://blog.iyu.pub">听风吟且行</a>
                </li>
              </ul>
            </Panel>
            <Panel head="最新文章">
              <ul className={styles.friendLinks}>
                <li>
                  <a href="http://blog.iyu.pub">听风吟且行</a>
                </li>
                <li>
                  <a href="http://blog.iyu.pub">听风吟且行</a>
                </li>
              </ul>
            </Panel>
          </Col>
        </Row>
      </Main>
    );
  }
}

export default IndexPage;
