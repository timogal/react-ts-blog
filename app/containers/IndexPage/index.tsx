import * as React from 'react';

import { Row, Col } from 'components/Grid';
import Main from 'components/Main';
import Panel from 'components/Panel';
import ArticleItem from 'components/ArticleItem';

import 'assets/favicon.ico';

import styles from './Index.scss';

class IndexPage extends React.Component<any, any> {
  render(): JSX.Element {
    return (
      <Main>
        <Row gutter={24}>
          <Col span={8}>
            <Panel>
              <a href="/p/abe12saa">
                <ArticleItem
                  title="测试标题"
                  content="测试内容"
                  views={8}
                  categories={[{ id: 1, name: 'test' }, { id: 2, name: 'Java' }]}
                />
              </a>
            </Panel>
            <Panel>
              <a href="#">
                <ArticleItem
                  title="测试标题"
                  content="测试内容"
                  views={8}
                />
              </a>
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
