import { SsrRoute } from "types/index";

import DetailPage from 'containers/DetailPage/async';
import detailLoadData from 'containers/DetailPage/loadData';

import IndexPage from 'containers/IndexPage/async';
import indexLoadData from 'containers/IndexPage/loadData';
import ArchivePage from 'containers/ArchivePage/async';
import archiveLoadData from 'containers/ArchivePage/loadData';

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
  },
  {
    path: '/archives',
    component: ArchivePage,
    loadData: archiveLoadData,
    exact: true,
  }
];

export default ssrRoutes;
