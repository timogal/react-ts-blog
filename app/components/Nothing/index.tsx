import * as React from 'react';
import * as cx from 'classnames';

import * as styles from './nothing.scss';

interface NothingProps extends React.HTMLAttributes<any> {
  text?: string
}

interface NothingDefaultProps {
  text: string
}

const Nothing: React.StatelessComponent<NothingProps> = (props: NothingProps) => {
  const { text, className, ...restProps } = props as NothingProps & NothingDefaultProps;

  return (
    <div {...restProps} className={cx(styles.bg, className)}>
      <h2 className={styles.text}>{text}</h2>
    </div>
  );
};

Nothing.defaultProps = { text: '此处空空如也' };

export default Nothing;
