import { Action } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects';

import Api, { loadDailySentence } from 'utils/Api';

import { startLoad, loadSuccess, loadFailed, loadSentenceSuccess } from './actions';
import { TO_START_LOADING, START_LOAD_SENTENCE } from './constants';

interface PageAction extends Action<string> {
  page: number
}

export function* getDailySentence() {
  const data = yield call(loadDailySentence);
  yield put(loadSentenceSuccess(data));
}

export function* loadArticles(action: PageAction) {
  yield put(startLoad());
  try {
    const { data } = yield call(Api.get, '/articles/s', { params: { page: action.page } });
    yield put(loadSuccess(data));
  } catch (e) {
    yield put(loadFailed());
  }
}

export default function* rootSaga() {
  yield takeLatest(START_LOAD_SENTENCE, getDailySentence);
  yield takeLatest(TO_START_LOADING, loadArticles);
}
