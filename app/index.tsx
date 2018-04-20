import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Hello from './containers/Hello';

ReactDOM.render(
  <Hello name="timogal"/>,
  document.getElementById('root') as HTMLElement
);
