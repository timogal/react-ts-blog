import * as React from 'react';
import * as cx from 'classnames';

import * as styles from './Icon.scss';

interface Props {
  type: string,
  className?: string
}

const Icon: React.StatelessComponent<any> = (props: Props) => {
  const { type, className, ...restProps } = props;

  return (
    <i {...restProps}
       className={cx(styles.icon, styles[`icon-${type}`], className)} />
  );
};

export default Icon;
