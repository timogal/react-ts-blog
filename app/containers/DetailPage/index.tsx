import * as React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as cx from 'classnames';

import Share from 'components/Share';
import NotFound from '../NotFound';
import { BASE_URL } from 'utils/env';
import resolveImage from 'utils/resolveImage';
import { toDateString } from 'utils/DateUtils';

import { makeSelectDetail } from './selectors';

import 'github-markdown-css/github-markdown.css';
import 'viewerjs/dist/viewer.css';
import 'highlight.js/styles/github.css';
import * as styles from './detail.scss';

import RichTextContainer from "./RichTextContainer";

const BreadItem = Breadcrumb.Item;

interface DetailProps {
  detail: any
}

class DetailPage extends React.Component<DetailProps, any> {
  htmlContainer: HTMLElement | null;

  componentDidMount() {
    Promise.all([
      import(/* webpackChunkName: "hljs" */'highlight.js'),
      import(/* webpackChunkName: "viewerjs" */'viewerjs'),
    ]).then(([hljsMod, viewerMod]) => {
      const hljs = hljsMod.default || hljsMod;
      const Viewer = viewerMod.default || viewerMod;
      if (this.htmlContainer) {
        const preCode = this.htmlContainer.querySelectorAll('pre code');
        for (let index = 0, len = preCode.length; index < len; index++) {
          hljs.highlightBlock(preCode[index]);
        }
      }
      new Viewer(this.htmlContainer!, {
        toolbar: false,
        title: false,
      });
    })
  }

  renderHead() {
    const { detail } = this.props;
    if (!detail) {
      return null;
    }
    const { tags } = detail;
    let keywords: string | null = null;
    if (tags && tags.length > 0) {
      keywords = tags.map((item: any) => item.name).join(',');
    }
    return (
      <Helmet
        bodyAttributes={{
          itemscope: "",
          itemtype: "http://schema.org/WebPage",
          lang: "zh-Hans"
        }}
      >
        <title>{detail.title}</title>
        <meta name="description" content={detail.remark} />
        {keywords && <meta itemProp="keywords" name="keywords" content={keywords} />}
      </Helmet>
    );
  }

  render() {
    const { detail } = this.props;
    if (!detail) {
      return <NotFound />;
    }
    const date = toDateString(detail.gmtCreated);
    return (
      <article className={styles.wrapper} itemScope itemType="http://schema.org/Article">
        {this.renderHead()}
        <span aria-hidden itemProp="author" itemScope itemType="http://schema.org/Person">
          <meta itemProp="name" content="timogal" />
          <meta itemProp="image" content="https://avatars0.githubusercontent.com/u/17402530?s=460&v=4" />
        </span>
        <h1 className={styles.title} itemProp="name headline">{detail.title}</h1>
        <ul className={styles.meta}>
          <li>
            <Icon type="calendar" className={styles.icon} />
            发布于：
            <time itemProp="dateCreated" dateTime={date}>{date}</time>
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
                    <Link itemProp="url" rel="index" to={`/search?category=${item.id}`}>
                      <span itemProp="name">{item.name}</span>
                    </Link>
                  </BreadItem>
                ))
              }
            </Breadcrumb>
          </li>
        </ul>
        <RichTextContainer
          ref={(instance: any) => this.htmlContainer = instance}
          itemType="articleBody"
          className={cx('markdown-body', styles.article)}
          html={detail.content}
        />
        <div className={styles.license} itemProp="license">
          <a itemProp="license" rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">
            <img alt="知识共享许可协议" src="https://licensebuttons.net/l/by-nc/4.0/88x31.png" />
          </a>
          <br />
          本作品采用
          <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">
            知识共享署名-非商业性使用 4.0 国际许可协议
          </a>
          进行许可。
        </div>
        <Share
          className={styles.share}
          title={detail.title}
          description={detail.remark}
          pic={detail.backgroundImage ? resolveImage(detail.backgroundImage) : undefined}
          url={`${BASE_URL}/p/${detail.id}`}
        />
      </article>
    );
  }
}

const mapStateToProps = createStructuredSelector({
    detail: makeSelectDetail()
  }
);

export default connect(mapStateToProps)(DetailPage);
