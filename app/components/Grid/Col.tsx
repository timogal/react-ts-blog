import * as React from 'react';
import * as cx from 'classnames';

import './grid.scss';

interface Props {
  xs?: number,
  sm?: number,
  md?: number,
  lg?: number,
  span?: number,
  className?: string
}

interface DefaultProps {
  span: number
}

type PropsWithDefaults = Props & DefaultProps;

class Col extends React.Component<Props, any> {
  static defaultProps: DefaultProps = {
    span: 12
  };

  hasSpan(span: number | undefined): boolean {
    return !!span && span > 0 && span <= 12;
  }

  render() {
    const { xs, sm, md, lg, span, className, ...restProps } = this.props as PropsWithDefaults;
    let classObj;
    if (!this.hasSpan(xs) && !this.hasSpan(sm) && !this.hasSpan(md) && !this.hasSpan(lg)) {
      let col = span < 0 ? 12 : span;
      classObj = {
        [`col-${col}`]: true
      };
    } else {
      classObj = {
        [`col-xs-${xs}`]: this.hasSpan(xs),
        [`col-xs-${sm}`]: this.hasSpan(sm),
        [`col-xs-${md}`]: this.hasSpan(md),
        [`col-xs-${lg}`]: this.hasSpan(lg),
      };
    }
    const classNames = cx(classObj, className);
    return (
      <div
        {...restProps}
        className={classNames}
      />
    );
  }
}

export default Col;
