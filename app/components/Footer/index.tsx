import * as React from 'react';

import Main from '../Main';

import * as styles from './footer.scss';

class Footer extends React.Component<any, any> {
  render() {
    return (
      <footer className={styles.footer}>
        <Main>
          <ul>
            <li>粤ICP备18043338号-1</li>
            <li>Copyright &copy; Timogal</li>
            <li><a target="_blank" href="https://github.com/timogal/react-ts-blog">网站源码</a></li>
          </ul>
        </Main>
      </footer>
    );
  }
}

export default Footer;
