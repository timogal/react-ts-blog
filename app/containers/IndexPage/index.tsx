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
import DailySentence from '../DailySentence';

import { toStartLoad, startLoadSentence } from './actions';
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
    const { loading, totalPages } = this.props;
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
    const contentCol = { xs: 24, sm: 24, md: 16, lg: 16 };
    const toolCol = { xs: 0, sm: 0, md: 8, lg: 8 };
    return (
      <Main className={styles.root}>
        <Row gutter={{ xs: 0, sm: 0, md: 24, lg: 24 }}>
          <Col {...contentCol}>
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
          <Col {...toolCol}>
            <DailySentence />
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
    dispatch(startLoadSentence());
  }
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'indexPage', saga });

export default compose(
  withSaga,
  withConnect,
)(IndexPage);
