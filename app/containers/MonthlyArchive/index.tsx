import * as React from 'react';
import { match } from 'react-router-dom';

import Main from 'components/Main';
import Loading from 'components/Loading';
import ArticleItem from 'components/ArticleItem';

import Api from 'utils/Api';
import Nothing from "components/Nothing";

import * as styles from './ma.scss';

interface MonthlyArchiveParams {
  date: string
}

interface MonthlyArchiveProps {
  match: match<MonthlyArchiveParams>
}

interface MonthlyArchiveState {
  loading: boolean
  items: any[]
}

class MonthlyArchive extends React.Component<MonthlyArchiveProps, MonthlyArchiveState> {
  async componentDidMount() {
    const { match } = this.props;
    const { date } = match.params;
    try {
      const { data } = await Api.get('/articles/monthly', { params: { date } });
      this.setState({ items: data, loading: false });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  state = {
    loading: true,
    items: []
  };

  render() {
    const { match } = this.props;
    const { items, loading } = this.state;
    return (
      <Main className={styles.content}>
        <h2 className={styles.title}>
          归档：{match.params.date}
          <small>(共{items.length}篇)</small>
        </h2>
        {
          loading && <Loading />
        }
        {
          !loading && items.length > 0 && items.map(({ id, backgroundImage, remark, lastModified, ...rest }: any) => (
            <div key={id} className={styles.item}>
              <ArticleItem
                pid={id}
                background={backgroundImage}
                content={remark}
                {...rest}
              />
            </div>
          ))
        }
        {
          !loading && items.length === 0 && <Nothing />
        }
      </Main>
    );
  }
}

export default MonthlyArchive;
