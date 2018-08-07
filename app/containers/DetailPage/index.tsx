import * as React from 'react';
import Main from 'components/Main';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { makeSelectDetail } from './selectors';
import { Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router-dom';

import detail from './mock';

import styles from './detail.scss';

const BreadItem = Breadcrumb.Item;

interface DetailProps {
  detail: any
}

class DetailPage extends React.Component<DetailProps, any> {
  render(): JSX.Element {
    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{detail.title}</h1>
        <ul className={styles.meta}>
          <li>
            <Icon type="calendar" className={styles.icon} /> {detail.time}
          </li>
          <li>
            <Icon type="eye" className={styles.icon} /> 1200
          </li>
          <li>
            <Icon type="folder" className={styles.icon} />
            分类于：
            <Breadcrumb className={styles.category} separator="|">
              {
                detail.categories.map(item => (
                  <BreadItem key={item.id}>
                    <Link to={`/category/${item.id}`}>{item.name}</Link>
                  </BreadItem>
                ))
              }
            </Breadcrumb>
          </li>
        </ul>
        <article className={styles.article} dangerouslySetInnerHTML={{ __html: detail.content }} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
    detail: makeSelectDetail()
  }
);

export default connect(mapStateToProps)(DetailPage);
