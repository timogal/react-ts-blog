import * as React from 'react';
import { Link } from 'react-router-dom';

import Api from 'utils/Api';
import Loading from "components/Loading";
import Main from "components/Main";
import Nothing from 'components/Nothing';

import * as styles from './tag-cloud.scss';

interface Props {
}

interface TagCloudState {
  loading: boolean
  tags: any[]
}

const fontSizeBase = 40;

function toHexColor(rate: number): string {
  let num = Math.floor(51 / rate);
  if (num > 0xEE) {
    num = 0xEE;
  }
  const hex = num.toString(16);
  return `#${hex}${hex}${hex}`;
}

class TagCloud extends React.Component<Props, TagCloudState> {
  async componentDidMount() {
    try {
      const { data } = await Api.get('/statistics/tags');
      this.calculateBase(data);
      this.setState({ loading: false, tags: data });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  state: TagCloudState = {
    loading: true,
    tags: []
  };

  calculateBase(tags: any[]) {
    let max: number | null = null;
    tags.forEach(item => {
      if (max === null) {
        max = item.total;
      } else if (item.total > max) {
        max = item.total;
      }
    });
    if (!max) {
      return;
    }
    tags.forEach(item => {
      item.rate = item.total / max!;
    });
  }

  render() {
    const { loading, tags } = this.state;
    return (
      <Main withTopMargin>
        <h1 className={styles.title}>标签</h1>
        <div className={styles.total}>目前共{tags.length}个标签</div>
        {loading && <Loading />}
        {
          !loading && tags.length === 0 && <Nothing />
        }
        {
          tags.length > 0 && (
            <ul className={styles.list}>
              {
                tags.map(({ id, name, rate }) => (
                  <li
                    className={styles.tag} key={id}
                    style={{ fontSize: `${fontSizeBase * rate}px`, color: toHexColor(rate) }}
                  >
                    <Link to={`/search?tag=${id}`}>{name}</Link>
                  </li>
                ))
              }
            </ul>
          )
        }
      </Main>
    );
  }
}

export default TagCloud;
