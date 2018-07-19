import * as React from 'react';

import { Row, Col, Card } from 'antd';
import Main from 'components/Main';
import ArticleItem from 'components/ArticleItem';

import 'assets/favicon.ico';

import { posts, newestPosts } from './mock';

import styles from './Index.scss';

class IndexPage extends React.Component<any, any> {
  render(): JSX.Element {
    return (
      <Main className={styles.root}>
        <Row gutter={24}>
          <Col span={16}>
            {
              posts.map(item => (
                <div className={styles.postItem} key={item.pid}>
                  <ArticleItem{...item} />
                </div>
              ))
            }
          </Col>
          <Col span={8}>
            <Card title="友情链接" className={styles.panel}>
              <ul className={styles.friendLinks}>
                <li>
                  <a href="http://blog.iyu.pub">听风吟且行</a>
                </li>
                <li>
                  <a href="http://blog.iyu.pub">听风吟且行</a>
                </li>
              </ul>
            </Card>
            <Card title="最新文章" className={styles.panel}>
              <ul className={styles.friendLinks}>
                {
                  newestPosts.map(item => (
                    <li key={item.pid}>
                      <a href={`/p/${item.pid}`}>{item.title}</a>
                    </li>
                  ))
                }
              </ul>
            </Card>
          </Col>
        </Row>
      </Main>
    );
  }
}

export default IndexPage;
