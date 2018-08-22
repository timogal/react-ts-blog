import * as React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as qs from 'qs';
import { Pagination } from 'antd';
import { push } from 'connected-react-router/immutable';

import Main from 'components/Main';
import Loading from "components/Loading";
import Nothing from "components/Nothing";
import ArticleItem from "components/ArticleItem";

import Api from 'utils/Api';

import { makeSelectLocation } from 'selectors/routerSelectors';

import * as styles from './search.scss';

interface SearchParams {
  category?: string
  tag?: string
  keyword?: string
  page?: string
}

interface Props {
  location: { [K: string]: any }
  search: (params: any) => void
}

interface SearchState {
  page: number
  items: any[]
  loading: boolean
  totalPages: null | number
  total: number
}

class Search extends React.Component<Props, SearchState> {
  constructor(props: Props) {
    super(props);
    const { location } = props;
    this.params = qs.parse(location.search, { ignoreQueryPrefix: true });
    let { page } = this.params;
    if (!page || !/^[0-9]+$/.test(page)) {
      page = this.params.page = '1';
    }
    this.state.page = parseInt(page, 10);
  }

  componentDidMount() {
    const { category, tag } = this.params;
    if (tag && !/^[0-9]+$/.test(tag)) {
      delete this.params.tag;
    }
    if (category && !/^[0-9]+$/.test(category)) {
      delete this.params.category;
    }
    this.loadPosts(this.state.page);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { location } = nextProps;
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
    if (params.keyword !== this.params.keyword) {
      // 关键词不同则重新进行搜索
      this.params = {
        keyword: params.keyword,
        page: '1'
      };
      this.setState({ page: 1 }, async () => {
        await this.loadPosts(1);
        this.props.search(this.params);
      });
    }
  }

  params: SearchParams;
  state: SearchState = {
    loading: false,
    items: [],
    totalPages: null,
    total: 0,
    page: 1
  };

  loadPosts = async (page: number) => {
    this.setState({ loading: true });
    try {
      const { data } = await Api.get('/articles/s', {
        params: {
          size: 10,
          ...this.params,
          page,
        }
      });
      this.setState({
        loading: false,
        items: data.items,
        totalPages: data.totalPages,
        total: data.total,
        page,
      })
    } catch (e) {
      this.setState({ loading: false });
    }
  };

  onPageChange = async (page: number) => {
    await this.loadPosts(page);
    this.props.search({
      ...this.params,
      page,
    });
  };

  render() {
    const { items, totalPages, page, total, loading } = this.state;
    return (
      <Main className={styles.content}>
        {loading && totalPages === null && <Loading />}
        {loading && totalPages !== null && <div className={styles.fullLoading} />}
        {
          items.length > 0 && items.map(({ id, backgroundImage, remark, lastModified, ...rest }) => (
            <div key={id} className={styles.item}>
              <ArticleItem
                pid={id}
                background={backgroundImage}
                content={remark}
                {...rest}
              />
            </div>
          ))
        }
        {/* 查询完成，无结果显示no data */}
        {
          !loading && (items.length === 0 || total === 0) && <Nothing />
        }
        {/* 查询完成，总记录条数大于0才显示分页 */}
        {totalPages !== null && total > 0 && (
          <Pagination
            className={styles.pagination}
            current={page}
            total={total}
            pageSize={10}
            onChange={this.onPageChange}
          />
        )}
      </Main>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    search(params: any) {
      let searchString = qs.stringify(params);
      if (searchString) {
        searchString = '?' + searchString;
      }
      dispatch(push(`/search${searchString}`));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
