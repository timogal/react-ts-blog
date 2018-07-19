import * as React from 'react';
import cx from 'classnames';

import styles from './Loading.scss';

interface Props {
  className?: string
}

export const Loading: React.StatelessComponent<any> = (props: Props) => {
  const { className } = props;
  return (
    <div className={cx(styles.loading, className)}>
      <span />
      <span />
      <span />
    </div>
  );
};

export default Loading;
