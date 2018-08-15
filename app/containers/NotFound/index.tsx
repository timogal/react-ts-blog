import * as React from 'react';
import Main from 'components/Main';

import * as notFoundImg from 'assets/404-s.png';

import * as styles from './404.scss';

const NotFound: React.StatelessComponent = () => {
  return (
    <Main className={styles.notFound}>
      <h1 className={styles.title}>抱歉，你访问的页面不存在!</h1>
      <img src={notFoundImg} alt="Page Not Found" />
      <div className={styles.tips}>
        <a
          target="_blank"
          href="https://pixabay.com/zh/%E9%94%99%E8%AF%AF-404-404-%E9%94%99%E8%AF%AF-%E9%94%99%E8%AF%AF-1252056/"
        >
          图片素材来源于pixabay
        </a>
      </div>
    </Main>
  );
};

export default NotFound;
