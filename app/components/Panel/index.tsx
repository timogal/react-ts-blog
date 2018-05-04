import * as React from 'react';
import * as cx from 'classnames';

import * as styles from './Panel.scss';

interface Props {
  head?: React.ReactNode,
  className?: string
}

class Panel extends React.Component<Props, any> {
  render(): JSX.Element {
    const { head, className, children, ...restProps } = this.props;
    const cls = cx(styles.root, className);
    return (
      <div {...restProps} className={cls}>
        {
          head &&
          <div className={styles.head}>
            {head}
          </div>
        }
        <div className={styles.body}>
          {children}
        </div>
      </div>
    );
  }
}

export default Panel;
