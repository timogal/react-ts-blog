import * as Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackChunkName:"search" */'./index'),
  loading: () => null
});
