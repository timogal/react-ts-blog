import * as Loadable from 'react-loadable';

const AsyncIndex = Loadable({
  loader: () => import(/* webpackChunkName: "index" */ './index'),
  loading: () => null
});

export default AsyncIndex;
