import * as React from 'react';
import * as cx from 'classnames';

import * as styles from './Main.scss';

interface Props extends React.HTMLAttributes<any> {
  withTopMargin?: boolean
}

const Main: React.StatelessComponent<any> = (props: Props): JSX.Element => {
  const { className, withTopMargin, ...restProps } = props;
  return (
    <div
      {...restProps}
      className={cx(styles.wrapper, { [styles.topMargin]: withTopMargin }, className)}
    />
  );
};

export default Main;
