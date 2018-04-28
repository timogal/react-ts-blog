import * as Loadable from 'react-loadable';

const AsyncAbout = Loadable({
  loader: () => import(/* webpackChunkName: "about" */ './index'),
  loading: () => null
});

export default AsyncAbout;
