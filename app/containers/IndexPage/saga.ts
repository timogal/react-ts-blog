import { call, put } from 'redux-saga/effects';

import Api from 'utils/Api';

import { startLoad, loadSuccess, loadFailed } from './actions';

export default function* rootSaga(page: number) {
  yield put(startLoad());
  try {
    const { data } = yield call(Api.get, '/articles/s', { params: { page } });
    yield put(loadSuccess(data));
  } catch (e) {
    yield put(loadFailed());
  }
}
