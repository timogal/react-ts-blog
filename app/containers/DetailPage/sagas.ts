import { call, put } from 'redux-saga/effects';
import Api from "utils/Api";

import { detailLoaded } from './actions';

export default function* rootSaga(id: string) {
  const { data } = yield call(Api.get, `/articles/${id}`);
  yield put(detailLoaded(data))
}
