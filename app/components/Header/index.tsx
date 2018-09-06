import * as React from 'react';
import { Link } from 'react-router-dom';
import { Input, Icon } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router/immutable';
import { createStructuredSelector } from 'reselect';
import * as qs from 'qs';
import * as cx from 'classnames';

import { makeSelectLocation } from 'selectors/routerSelectors';
import { makeSelectMenuOpen } from 'selectors/globalSelectors';
import { openMenu } from '../../actions';

import * as logo from 'assets/logo.png';

import Main from '../Main';
import ResponsiveMenuWrapper from './ResponsiveMenuWrapper';

import * as styles from './Header.scss';

const SearchInput = Input.Search;

interface HeaderProps {
  doSearch: (keyword: string) => void
  openMenu: () => void
  location: { [K: string]: any }
  menuOpen: boolean
}

interface HeaderState {
  keyword: string
}

interface MenuItem {
  path: string
  text: string
}

const menus: MenuItem[] = [
  {
    path: '/',
    text: '首页',
  },
  {
    path: '/archives',
    text: '归档',
  },
  {
    path: '/categories',
    text: '分类',
  },
  {
    path: '/tags',
    text: '标签',
  },
];

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
    const { menuOpen, openMenu, location } = this.props;
    const menu = (
      <ul className={styles.menu}>
        {
          menus.map(({ path, text }) => (
            <li key={path} className={path === location.pathname ? styles.active : undefined}>
              <Link to={path}>{text}</Link>
            </li>
          ))
        }
      </ul>
    );
    return (
      <header className={styles.headerRoot}>
        <div className={styles.header}>
          <div className={styles.inner}>
            <div className={styles.logo}>
              <Link to="/"><img src={logo} /></Link>
            </div>
            <Main className={styles.content}>
              {menu}
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
            <Icon
              type={'menu-unfold'}
              className={cx(styles.menuBtn, { [styles.open]: menuOpen })}
              onClick={openMenu}
            />
          </div>
        </div>
        <ResponsiveMenuWrapper>
          <div className={styles.menuWrap}>
            {menu}
          </div>
        </ResponsiveMenuWrapper>
      </header>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  menuOpen: makeSelectMenuOpen(),
});

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    doSearch(keyword: string) {
      dispatch(push(`/search?keyword=${keyword}`));
    },
    openMenu() {
      dispatch(openMenu());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
