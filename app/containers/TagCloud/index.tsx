import * as React from 'react';

import Api from 'utils/Api';
import Loading from "components/Loading";
import Main from "components/Main";

import * as styles from './tag-cloud.scss';

interface Props {
}

interface TagCloudState {
  loading: boolean
}

class TagCloud extends React.Component<Props, TagCloudState> {
  async componentDidMount() {
    let tags: any[];
    try {
      const { data } = await Api.get('/statistics/tags');
      this.setState({ loading: false });
      tags = data;
    } catch (e) {
      this.setState({ loading: false });
      return;
    }
    let d3Cloud = await import(/* webpackChunkName: "d3-cloud" */'d3-cloud');
    const cloud = d3Cloud.default;
    const layout = cloud();
    const formattedTags = tags.map(({ id, name, total }) => ({
      text: name,
      size: total,
    }));
    layout
      .words(formattedTags)
      .canvas(() => this.cloudRoot!)
      .size([1000, 1000])
      .fontSize(14)
      .rotate(0)
      .spiral('archimedean')
      .start();
  }

  cloudRoot: HTMLElement | null;

  state = {
    loading: true
  };

  render() {
    const { loading } = this.state;
    return (
      <Main>
        {loading && <Loading />}
        <canvas height={500} width={500} ref={(ref) => this.cloudRoot = ref} />
      </Main>
    );
  }
}

export default TagCloud;
