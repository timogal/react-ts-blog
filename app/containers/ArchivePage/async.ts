import * as Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackChunkName: "archives" */'.'),
  loading: () => null
});
