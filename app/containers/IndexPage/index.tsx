import * as React from 'react';
import { Row, Col, Pagination } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Main from 'components/Main';
import ArticleItem from 'components/ArticleItem';
import Loading from 'components/Loading';

import injectSaga from 'utils/injectSaga';

import FriendLinks from '../FriendLinks';
import TimelineCard from '../TimelineCard';

import { toStartLoad } from './actions';
import {
  makeSelectTotalPages,
  makeSelectPage,
  makeSelectLoading,
  makeSelectItems,
  makeSelectTotal
} from './selectors';
import saga from './saga';

import * as styles from './Index.scss';

interface IndexPageProps {
  page: number,
  loading: boolean,
  totalPages: number | null,
  items: any[],
  total: number,
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

  onPageChange = (page: number) => {
    const { startLoading, loading } = this.props;
    if (loading) {
      return;
    }
    startLoading(page);
  };

  renderLoading() {
    const { loading, items, totalPages, page, total } = this.props;
    if (!loading) {
      return null;
    }
    if (totalPages !== null) {
      return <div className={styles.loadingWrap} />;
    }
    return <Loading />;
  }

  render() {
    const { items, totalPages, page, total } = this.props;
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
            {this.renderLoading()}
            {
              totalPages !== null && totalPages > 0 && (
                <Pagination
                  className={styles.pagination}
                  current={page}
                  total={total}
                  pageSize={10}
                  onChange={this.onPageChange}
                />
              )
            }
          </Col>
          <Col span={8}>
            <TimelineCard />
            <FriendLinks />
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
  total: makeSelectTotal(),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  startLoading(page: number) {
    dispatch(toStartLoad(page));
  }
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'indexPage', saga });

export default compose(
  withSaga,
  withConnect,
)(IndexPage);
