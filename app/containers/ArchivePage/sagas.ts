import { Action } from 'redux';
import { takeLatest, put, call } from 'redux-saga/effects';
import { BOOTSTRAP } from './constants';
import { startLoad, loadFailed, loadSuccess } from './actions';

import Api from 'utils/Api';

interface PageAction extends Action {
  page: number
}

export function* loadPosts({ page }: PageAction) {
  yield put(startLoad());
  try {
    const { data } = yield call(Api.get, '/articles/s', { params: { size: 16, page } });
    yield put(loadSuccess(data));
  } catch (e) {
    yield put(loadFailed());
  }
}

export default function* rootSaga() {
  yield takeLatest(BOOTSTRAP, loadPosts);
}
