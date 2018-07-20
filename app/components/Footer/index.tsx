import * as React from 'react';

import Main from '../Main';

import styles from './footer.scss';

class Footer extends React.Component<any, any> {
  render() {
    return (
      <footer className={styles.footer}>
        <Main className={styles.content}>
          <ul className={styles.info}>
            <li>粤ICP备18043338号-1</li>
            <li>Copyright &copy; Timogal 2016-2018</li>
            <li><a target="_blank" href="https://github.com/timogal/react-ts-blog">网站源码</a></li>
            <li><a href="http://www.cnzz.com/stat/website.php?web_id=1274226487" target="_blank" title="站长统计">站长统计</a>
            </li>
          </ul>
        </Main>
      </footer>
    );
  }
}

export default Footer;
