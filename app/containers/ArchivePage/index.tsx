import * as React from 'react';
import { Timeline, Pagination } from 'antd';
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose, Dispatch } from "redux";
import { Link } from 'react-router-dom';

import injectSaga from "utils/injectSaga";
import { format } from 'utils/DateUtils';
import Main from 'components/Main';
import Loading from 'components/Loading';

import * as styles from './archive.scss';

import {
  makeSelectItems,
  makeSelectLoading,
  makeSelectPage,
  makeSelectTotal,
  makeSelectTotalPages
} from "./selectors";
import { bootstrap } from "./actions";

import saga from "./sagas";

const Item = Timeline.Item;
const Fragment = React.Fragment;

type TimeLineGroup = { [K: string]: any[] };

interface Props {
  page: number,
  loading: boolean,
  totalPages: number | null,
  items: any[],
  total: number,
  startLoading: (page: number) => any
}

class ArchivePage extends React.Component<Props> {
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

  getGroup(): TimeLineGroup {
    const { items } = this.props;
    if (!items || items.length === 0) {
      return {};
    }
    const group: TimeLineGroup = {};
    let date: string;
    items.forEach((item: any) => {
      date = format(item.gmtCreated, 'yyyy-mm');
      let arr: any[] = group[date];
      if (!arr) {
        arr = [];
      }
      arr.push(item);
      group[date] = arr;
    });
    return group;
  }

  renderTimeline() {
    const group = this.getGroup();
    return (
      <Timeline className={styles.timeline}>
        {
          Object.keys(group).map(date => {
            const items = group[date];
            return (
              <Fragment key={date}>
                <Item key={`date-${date}`} className={styles.timeTag} color="#666">
                  <h1 className={styles.time}>
                    <Link to={`/archives/${date}`}>{date}</Link>
                  </h1>
                </Item>
                {
                  items.map(item => (
                    <Item color="#999" key={`post-${item.id}`}>
                      <a href={`/p/${item.id}`}>{item.title}</a>
                    </Item>
                  ))
                }
              </Fragment>
            );
          })
        }
      </Timeline>
    );
  }

  render() {
    const { totalPages, page, total } = this.props;
    return (
      <Main className={styles.root}>
        {this.renderTimeline()}
        {
          totalPages !== null && totalPages > 0 && (
            <Pagination
              current={page}
              total={total}
              pageSize={10}
              onChange={this.onPageChange}
            />
          )
        }
        {this.renderLoading()}
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
    dispatch(bootstrap(page));
  }
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'archivePage', saga });

export default compose(
  withSaga,
  withConnect,
)(ArchivePage);

