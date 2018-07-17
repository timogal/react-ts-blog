import * as React from 'react';
import * as cx from 'classnames';

import * as styles from './Main.scss';

interface Props extends React.HTMLAttributes<any> {
}

const Main: React.StatelessComponent<any> = (props: Props): JSX.Element => {
  const { className } = props;
  return (
    <div {...props} className={cx(styles.wrapper, className)} />
  );
};

export default Main;
