import * as React from 'react';
import { Card } from "antd";
import { Link } from 'react-router-dom';

import Loading from 'components/Loading';

import Api from 'utils/Api';

import * as styles from '../IndexPage/Index.scss';

interface Props {
}

interface TimelineCardState {
  loading: boolean,
  timelineList: any[],
}

class TimelineCard extends React.Component<Props, TimelineCardState> {
  state = {
    loading: true,
    timelineList: []
  };

  async componentDidMount() {
    try {
      const { data } = await Api.get('/articles/timeline');
      this.setState({
        loading: false,
        timelineList: data.items
      })
    } catch (e) {
      this.setState({
        loading: false,
      })
    }
  }

  render() {
    const { loading, timelineList } = this.state;
    return (
      <Card title="时间线" className={styles.panel}>
        {
          loading
            ? (<Loading />)
            : (
              <ul className={styles.friendLinks}>
                {
                  timelineList.map((item: any) => (
                    <li key={item.month}>
                      <Link to={`/archives/${item.month}`}>
                        {`${item.month}(${item.total}篇)`}
                      </Link>
                    </li>
                  ))
                }
              </ul>
            )
        }
      </Card>
    );
  }
}

export default TimelineCard;
