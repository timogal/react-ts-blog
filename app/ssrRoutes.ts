import { SsrRoute } from "types/index";

import DetailPage from 'containers/DetailPage/async';
import detailLoadData from 'containers/DetailPage/loadData';

import IndexPage from 'containers/IndexPage/async';
import indexLoadData from 'containers/IndexPage/loadData';

const ssrRoutes: SsrRoute[] = [
  {
    path: '/',
    component: IndexPage,
    loadData: indexLoadData,
    exact: true,
  },
  {
    path: '/p/:id',
    component: DetailPage,
    loadData: detailLoadData
  }
];

export default ssrRoutes;
