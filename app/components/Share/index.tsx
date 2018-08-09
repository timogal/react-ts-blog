import * as React from 'react';
import { Icon } from 'antd';
import { Helmet } from 'react-helmet';
import * as cx from 'classnames';

import loadScript from 'utils/load-script';
import { SHARE_APP_KEY } from 'utils/env';

import * as styles from './share.scss';

const shareSDKUrl = `//f1.webshare.mob.com/code/mob-share.js?appkey=${SHARE_APP_KEY}`;

const SHARE_CONTAINER_ID = '--mob-share-container';

interface Destination {
  icon: React.ReactNode,
  name?: string,
}

const shareDestinations: { [K: string]: Destination } = {
  weibo: {
    icon: <Icon type="weibo" />,
    name: '微博'
  },
  qq: {
    icon: <Icon type="qq" />,
  },
  weixin: {
    icon: <Icon type="wechat" />,
    name: '微信'
  },
  douban: {
    icon: '豆',
    name: '豆瓣'
  },
  facebook: {
    icon: <Icon type="facebook" />,
  },
  google: {
    icon: <Icon type="google-plus" />,
    name: 'Google+'
  },
  twitter: {
    icon: <Icon type="twitter" />,
  }
};

interface ShareProps extends React.HTMLAttributes<any> {
  url?: string
  title?: string
  description?: string
  pic?: string
}

class Share extends React.Component<ShareProps> {

  async componentDidMount() {
    await loadScript(shareSDKUrl, { id: '-mob-share' });
    this.configShare();
  }

  configShare() {
    this.createShare();
    const sdk = (window as any).mobShare;
    const { url, title, description, pic } = this.props;
    sdk.config({
      debug: process.env.NODE_ENV !== 'production',
      params: {
        url,
        title,
        description,
        pic,
      },
      appkey: SHARE_APP_KEY,
    });
  }

  createShare() {
    let mobWrap = document.getElementById(SHARE_CONTAINER_ID);
    if (!mobWrap) {
      mobWrap = document.createElement('div');
      mobWrap.id = SHARE_CONTAINER_ID;
      mobWrap.className = '-mob-share-ui-bg';
      document.body.appendChild(mobWrap);
    }
  }

  handleShare = (id: string) => {
    const sdk = (window as any).mobShare;
    const instance = sdk(id);
    instance.send();
  };

  render() {
    const { url, pic, description, title, ...restProps } = this.props;
    const meta: { [K: string]: string | undefined } = {
      url,
      image: pic,
      description,
      title,
    };
    return (
      <div {...restProps}>
        <Helmet>
          <meta name="og:type" content="article" />
          {
            Object.keys(meta).map((key) => {
              const value = meta[key];
              if (!value) {
                return null;
              }
              return <meta key={key} name={`og:${key}`} content={value} />
            })
          }
        </Helmet>
        <ul className={styles.shareList}>
          <li key="share-desc">分享到：</li>
          {
            Object.keys(shareDestinations).map((key: string) => {
              const dest = shareDestinations[key];
              return (
                <li key={key}>
                  <a
                    role="button"
                    title={`分享到${dest.name || key}`}
                    onClick={() => this.handleShare(key)}
                    className={cx(styles.icon, styles[key])}
                  >
                    {dest.icon}
                  </a>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default Share;
