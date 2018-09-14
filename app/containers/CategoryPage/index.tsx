import * as React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import { Helmet } from 'react-helmet';

import Main from 'components/Main';

import Api from 'utils/Api';
import Loading from "components/Loading";

import * as styles from './category.scss';

interface Props {
}

interface CategoryState {
  loading: boolean
  items: any[]
}

class Category extends React.Component<Props, CategoryState> {
  state: CategoryState = {
    loading: true,
    items: []
  };

  async componentDidMount() {
    try {
      const { data } = await Api.get('/statistics/categories');
      this.setState({ loading: false, items: data });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, items } = this.state;
    return (
      <Main className={styles.content}>
        <Helmet>
          <title>文章分类</title>
        </Helmet>
        <h1 className={styles.head}>文章分类</h1>
        <div className={styles.total}>共{items.length}个分类</div>
        {loading && <Loading />}
        <ul>
          {
            items.map(({ id, name, total }) => (
              <li key={id} className={styles.category}>
                <Link to={`/search?category=${id}`}>
                  <Icon className={styles.icon} type="folder" />
                  <span className={styles.text}>{name}(共{total}篇)</span>
                </Link>
              </li>
            ))
          }
        </ul>
      </Main>
    );
  }
}

export default Category;
