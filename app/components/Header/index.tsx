import * as React from 'react';
import { Link } from 'react-router-dom';

import Main from '../Main';

import * as styles from './Header.scss';

class Header extends React.Component<any, any> {
  render() {
    return (
      <header className={styles.header}>
        <Main className={styles.content}>
          <ul className={styles.menu}>
            <li><Link to="/">首页</Link></li>
            <li><Link to="/about">关于</Link></li>
          </ul>
        </Main>
      </header>
    );
  }
}

export default Header;
