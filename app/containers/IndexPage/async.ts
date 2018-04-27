import * as React from 'react';

import * as Loadable from 'react-loadable';

const AsyncAbout: React.ComponentType = Loadable({
  loader: () => import(/* webpackChunkName: "index"*/ './index'),
  loading: () => null
});

export default AsyncAbout;
