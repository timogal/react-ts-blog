import * as React from 'react';
import { Card } from "antd";

import Loading from 'components/Loading';

import Api from 'utils/Api';

import * as styles from '../IndexPage/Index.scss';

interface FriendLinksState {
  loading: boolean,
  links: any[],
}

class FriendLinks extends React.Component<any, FriendLinksState> {
  state = {
    loading: true,
    links: []
  };

  async componentDidMount() {
    try {
      const { data } = await Api.get('/friend-links');
      this.setState({
        loading: false,
        links: data
      })
    } catch (e) {
      this.setState({
        loading: false,
      })
    }
  }

  render() {
    const { loading, links } = this.state;
    return (
      <Card title="友情链接" className={styles.panel}>
        {
          loading
            ? (<Loading />)
            : (
              <ul className={styles.friendLinks}>
                {
                  links.map((item: any) => (
                    <li key={item.id}>
                      <a href={item.link} target="_blank">{item.text}</a>
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

export default FriendLinks;
