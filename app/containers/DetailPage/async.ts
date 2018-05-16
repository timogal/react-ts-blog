import * as Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackChunkName: "detail" */'./index'),
  loading: () => null
});
