import * as React from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'antd';

import * as logo from 'assets/logo.png';

import Main from '../Main';

import * as styles from './Header.scss';

const SearchInput = Input.Search;

class Header extends React.Component<any, any> {
  render() {
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
        </div>
      </header>
    );
  }
}

export default Header;
