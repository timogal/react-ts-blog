import * as React from 'react';
import { Row, Col, Card } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Main from 'components/Main';
import ArticleItem from 'components/ArticleItem';
import Loading from 'components/Loading';

import FriendLinks from '../FriendLinks';

import { makeSelectTotalPages, makeSelectPage, makeSelectLoading, makeSelectItems } from './selectors';

import * as styles from './Index.scss';

interface IndexPageProps {
  page: number,
  loading: boolean,
  totalPages: number | null,
  items: any[],
  dispatch: Dispatch
}

class IndexPage extends React.Component<IndexPageProps, any> {
  render() {
    const { loading, items } = this.props;
    return (
      <Main className={styles.root}>
        <Row gutter={24}>
          <Col span={16}>
            {
              items.map(({ id, backgroundImage, remark, lastModified, ...rest }) => (
                <div className={styles.postItem} key={id}>
                  <ArticleItem
                    pid={id}
                    background={backgroundImage}
                    content={remark}
                    {...rest}
                  />
                </div>
              ))
            }
            {
              loading && <Loading />
            }
          </Col>
          <Col span={8}>
            <FriendLinks />
            {/*<Card title="最新文章" className={styles.panel}>
              <ul className={styles.friendLinks}>
                {
                  newestPosts.map(item => (
                    <li key={item.pid}>
                      <a href={`/p/${item.pid}`}>{item.title}</a>
                    </li>
                  ))
                }
              </ul>
            </Card>*/}
          </Col>
        </Row>
      </Main>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  page: makeSelectPage(),
  loading: makeSelectLoading(),
  totalPages: makeSelectTotalPages(),
  items: makeSelectItems(),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
