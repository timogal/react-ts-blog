import * as React from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router/immutable';
import { createStructuredSelector } from 'reselect';
import * as qs from 'qs';

import { makeSelectLocation } from 'selectors/routerSelectors';

import * as logo from 'assets/logo.png';

import Main from '../Main';

import * as styles from './Header.scss';

const SearchInput = Input.Search;

interface HeaderProps {
  doSearch: (keyword: string) => void
  location: { [K: string]: any }
}

interface HeaderState {
  keyword: string
}

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    const { pathname, search } = props.location;
    if (pathname === '/search') {
      const params: any = qs.parse(search, { ignoreQueryPrefix: true });
      this.state.keyword = params.keyword || '';
    }
  }

  state: HeaderState = {
    keyword: '',
  };

  render() {
    const { keyword } = this.state;
    return (
      <header className={styles.headerRoot}>
        <div className={styles.header}>
          <div className={styles.inner}>
            <div className={styles.logo}>
              <Link to="/"><img src={logo} /></Link>
            </div>
            <Main className={styles.content}>
              <ul className={styles.menu}>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/archives">归档</Link></li>
                <li><Link to="/categories">分类</Link></li>
                <li><Link to="/tags">标签</Link></li>
              </ul>
            </Main>
            <div className={styles.search}>
              <SearchInput
                value={keyword}
                onChange={(e) => this.setState({ keyword: e.target.value })}
                size="default"
                type="search"
                placeholder="搜索"
                onSearch={this.props.doSearch}
              />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    doSearch(keyword: string) {
      dispatch(push(`/search?keyword=${keyword}`));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
