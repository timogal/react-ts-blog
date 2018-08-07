import * as React from 'react';
import { Icon, Breadcrumb } from 'antd';
import * as cx from 'classnames';
import { Link } from 'react-router-dom';

import * as styles from './ArticleItem.scss';

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
}

const BreadItem = Breadcrumb.Item;

class ArticleItem extends React.Component<Props, any> {
  render(): JSX.Element {
    const { pid, title, content, background, categories, views, tags, className, ...restProps } = this.props;
    const tagText = tags ? tags.map(item => item.name).join('/') : null;
    const wrapClass = cx({ [styles.withImage]: !!background }, className);
    return (
      <div {...restProps} className={wrapClass}>
        {
          background &&
          <a href={`/p/${pid}`}>
            <div className={styles.background}>
              <img src={background} />
            </div>
          </a>
        }
        <div className={styles.wrap}>
          <h2 className={styles.title}>
            <a href={`/p/${pid}`}>{title}</a>
          </h2>
          <Breadcrumb separator="|" className={styles.categories}>
            {
              categories && categories.map(item => (
                <BreadItem key={item.id}>
                  <Link to={`/category/${item.id}`}>{item.name}</Link>
                </BreadItem>
              ))
            }
          </Breadcrumb>
          <div className={styles.content}>{content}</div>
          <div className={styles.meta}>
            {
              tagText &&
              <span className={styles.tags}>
                <Icon className={styles.icon} type="tag-o" /> {tagText}
              </span>
            }
            <span>
              <Icon type="eye" className={styles.icon} />
              {views}
            </span>
            <span>
              <Icon className={styles.icon} type="calendar" /> 2018-05-06
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleItem;
