import * as React from 'react';
import { Icon, Breadcrumb } from 'antd';
import * as cx from 'classnames';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

import resolveImage from 'utils/resolveImage';
import { toDateString } from 'utils/DateUtils';

import * as styles from './ArticleItem.scss';

import * as defaultImage from 'assets/default.png';

interface Meta {
  id: number,
  name: string
}

interface Props extends React.HTMLAttributes<any> {
  pid: string,
  title: string,
  content: string,
  views: number
  background?: string,
  categories?: Meta[],
  tags?: Meta[],
  gmtCreated: number
}

const BreadItem = Breadcrumb.Item;

class ArticleItem extends React.Component<Props, any> {
  state = {
    imageError: false,
  };

  onImageError = () => {
    this.setState({ imageError: true });
  };

  render(): JSX.Element {
    const { pid, title, content, background, categories, views, tags, className, gmtCreated, ...restProps } = this.props;
    const { imageError } = this.state;
    const tagText = tags ? tags.map(item => item.name).join('/') : null;
    const wrapClass = cx({ [styles.withImage]: !!background }, className);
    return (
      <div {...restProps} className={wrapClass}>
        {
          background && (
            <a href={`/p/${pid}`}>
              <div className={styles.background}>
                <LazyLoad height={160}>
                  <img
                    src={imageError ? defaultImage : resolveImage(background)}
                    alt=""
                    onError={this.onImageError}
                  />
                </LazyLoad>
              </div>
            </a>
          )
        }
        <div className={styles.wrap}>
          <h2 className={styles.title}>
            <a href={`/p/${pid}`}>{title}</a>
          </h2>
          <div className={styles.categories}>
            <Icon type="folder" className={styles.icon} />
            <Breadcrumb separator="|" className={styles.breadcrumb}>
              {
                categories && categories.map(item => (
                  <BreadItem key={item.id}>
                    <Link to={`/category/${item.id}`}>{item.name}</Link>
                  </BreadItem>
                ))
              }
            </Breadcrumb>
          </div>
          <div className={styles.content}>{content}</div>
          <div className={styles.meta}>
            {
              tagText && (
                <span className={styles.tags}>
                  <Icon className={styles.icon} type="tag-o" /> {tagText}
                </span>
              )
            }
            <span>
              <Icon type="eye" className={styles.icon} />
              {views}
            </span>
            <span>
              <Icon className={styles.icon} type="calendar" /> {toDateString(gmtCreated)}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleItem;
