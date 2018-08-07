import { SsrRoute } from "types/index";

import DetailPage from 'containers/DetailPage/async';
import detailLoadData from 'containers/DetailPage/loadData';

const ssrRoutes: SsrRoute[] = [
  {
    path: '/p/:id',
    component: DetailPage,
    loadData: detailLoadData
  }
];

export default ssrRoutes;
