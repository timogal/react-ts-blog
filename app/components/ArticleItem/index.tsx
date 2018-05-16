import * as React from 'react';
import Icon from '../Icon';

import * as styles from './ArticleItem.scss';

interface Category {
  id: number,
  name: string
}

interface Props {
  title: string,
  content: string,
  views: number
  images?: string[],
  categories?: Category[]
}

class ArticleItem extends React.Component<Props, any> {
  render(): JSX.Element {
    const { title, content, images, categories, views, children, ...restProps } = this.props;
    return (
      <div {...restProps}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.content}>{content}</div>
        <div className={styles.meta}>
          <ul className={styles.tags}>
            {
              categories && categories.map(category => (
                <li key={category.id}>{category.name}</li>
              ))
            }
          </ul>
          <div className={styles.views}>
            <span>
              <Icon type="eye" className={styles.icon} />
              {views}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleItem;
