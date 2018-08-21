import * as React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Card } from "antd";

import { makeSelectSentence } from '../IndexPage/selectors';

import * as styles from '../IndexPage/Index.scss';

interface Props {
  sentence: any
}

class DailySentence extends React.Component<Props> {
  render() {
    const { sentence } = this.props;
    if (!sentence) {
      return null;
    }
    return (
      <Card
        title="每日一句"
        className={styles.panel}
        extra={
          <div className={styles.source}>
            来源：
            <a target="_blank" href="http://open.iciba.com">金山词霸</a>
          </div>
        }
      >
        <p>{sentence.content}</p>
        <p>{sentence.note}</p>
      </Card>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  sentence: makeSelectSentence()
});

export default connect(mapStateToProps)(DailySentence);
