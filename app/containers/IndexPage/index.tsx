import * as React from 'react';
import { Row, Col } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Main from 'components/Main';
import ArticleItem from 'components/ArticleItem';
import Loading from 'components/Loading';

import injectSaga from 'utils/injectSaga';

import FriendLinks from '../FriendLinks';

import { toStartLoad } from './actions';
import { makeSelectTotalPages, makeSelectPage, makeSelectLoading, makeSelectItems } from './selectors';
import saga from './saga';

import * as styles from './Index.scss';

interface IndexPageProps {
  page: number,
  loading: boolean,
  totalPages: number | null,
  items: any[],
  startLoading: (page: number) => any
}

class IndexPage extends React.Component<IndexPageProps, any> {
  async componentDidMount() {
    const { totalPages, page, startLoading } = this.props;
    if (totalPages === null) {
      // spa路由
      startLoading(page);
    }
  }

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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  startLoading(page: number) {
    dispatch(toStartLoad(page));
  }
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'indexPage', saga });

export default compose(
  withConnect,
)(IndexPage);
