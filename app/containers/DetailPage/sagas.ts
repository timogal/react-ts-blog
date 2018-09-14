import { call, put } from 'redux-saga/effects';
import Api from "utils/Api";

import { detailLoaded } from './actions';

export default function* rootSaga(id: string) {
  try {
    const { data } = yield call(
      Api.get,
      `/articles/${id}`,
      { params: { updateViews: true } }
      );
    yield put(detailLoaded(data));
  } catch (e) {
  }
}
