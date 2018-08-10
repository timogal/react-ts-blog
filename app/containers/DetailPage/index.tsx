import * as React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import { Helmet } from 'react-helmet';

import Share from 'components/Share';
import { BASE_URL } from 'utils/env';
import resolveImage from 'utils/resolveImage';

import { makeSelectDetail } from './selectors';

import 'highlight.js/styles/github.css';
import * as styles from './detail.scss';

const BreadItem = Breadcrumb.Item;

interface DetailProps {
  detail: any
}

class DetailPage extends React.Component<DetailProps, any> {
  htmlContainer: HTMLElement | null;

  componentDidMount() {
    import(/* webpackChunkName: "hljs" */'highlight.js').then(mod => {
      const hljs = mod.default || mod;
      if (this.htmlContainer) {
        const preCode = this.htmlContainer.querySelectorAll('pre code');
        for (let index = 0, len = preCode.length; index < len; index++) {
          hljs.highlightBlock(preCode[index]);
        }
      }
    })
  }

  renderHead() {
    const { detail } = this.props;
    if (!detail) {
      return null;
    }
    return (
      <Helmet>
        <title>{detail.title}</title>
        <meta name="description" content={detail.remark} />
      </Helmet>
    );
  }

  render() {
    const { detail } = this.props;
    if (!detail) {
      return null;
    }
    return (
      <div className={styles.wrapper}>
        {this.renderHead()}
        <h1 className={styles.title}>{detail.title}</h1>
        <ul className={styles.meta}>
          <li>
            <Icon type="calendar" className={styles.icon} />
            发布于：{moment(detail.gmtCreated).format('YYYY-MM-DD')}
          </li>
          <li>
            <Icon type="eye" className={styles.icon} /> {detail.views}次查看
          </li>
          <li>
            <Icon type="folder" className={styles.icon} />
            分类于：
            <Breadcrumb className={styles.category} separator="|">
              {
                detail.categories.map((item: any) => (
                  <BreadItem key={item.id}>
                    <Link to={`/category/${item.id}`}>{item.name}</Link>
                  </BreadItem>
                ))
              }
            </Breadcrumb>
          </li>
        </ul>
        <article
          ref={(instance) => this.htmlContainer = instance}
          className={styles.article}
          dangerouslySetInnerHTML={{ __html: detail.content }}
        />
        <div className={styles.license}>
          <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">
            <img alt="知识共享许可协议" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" />
          </a>
          <br />
          本作品采用<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">知识共享署名-非商业性使用 4.0 国际许可协议</a>进行许可。
        </div>
        <Share
          className={styles.share}
          title={detail.title}
          description={detail.remark}
          pic={detail.backgroundImage ? resolveImage(detail.backgroundImage) : undefined}
          url={`${BASE_URL}/p/${detail.id}`}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
    detail: makeSelectDetail()
  }
);

export default connect(mapStateToProps)(DetailPage);
