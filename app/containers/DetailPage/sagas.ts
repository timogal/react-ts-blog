import { call, put } from 'redux-saga/effects';
import Api from "utils/Api";
import { isProd } from "utils/env";

import { detailLoaded } from './actions';

export default function* rootSaga(id: string) {
  try {
    const { data } = yield call(
      Api.get,
      `/articles/${id}`,
      { params: { updateViews: isProd } }
    );
    yield put(detailLoaded(data));
  } catch (e) {
  }
}
