import * as React from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'antd';

import logo from 'assets/logo.png';

import Main from '../Main';

import styles from './Header.scss';

const SearchInput = Input.Search;

class Header extends React.Component<any, any> {
  render() {
    return (
      <header className={styles.header}>
        <div className={styles.inner}>
          <div className={styles.logo}>
            <Link to="/"><img src={logo} /></Link>
          </div>
          <Main className={styles.content}>
            <ul className={styles.menu}>
              <li><Link to="/">首页</Link></li>
              <li><Link to="/about">关于</Link></li>
            </ul>
          </Main>
          <div className={styles.search}>
            <SearchInput
              size="default"
              type="search"
              placeholder="搜索"
            />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
