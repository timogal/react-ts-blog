import * as React from 'react';

import * as cx from 'classnames';

import './grid.scss';

interface Props {
  gutter?: number,
  className?: string
}

class Row extends React.Component<Props, any> {
  render() {
    const { gutter, children, className, ...restProps } = this.props;
    let rowStyle = {};
    let colStyle = {};
    if (gutter) {
      let half = gutter / 2;
      rowStyle = {
        marginLeft: `-${half}px`,
        marginRight: `-${half}px`,
      };
      colStyle = {
        paddingLeft: `${half}px`,
        paddingRight: `${half}px`,
      };
    }
    const cls = cx('row', className);
    return (
      <div {...restProps} style={rowStyle} className={cls}>
        {
          React.Children.map(children, (child) =>
            React.cloneElement(child as React.ReactElement<any>, { style: colStyle }))
        }
      </div>
    );
  }
}

export default Row;
