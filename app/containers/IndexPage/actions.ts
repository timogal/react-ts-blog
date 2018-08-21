import {
  TO_START_LOADING,
  START_LOADING,
  LOAD_SUCCESS,
  LOAD_FAILED,
  LOAD_SENTENCE_SUCCESS, START_LOAD_SENTENCE
} from './constants';

export function toStartLoad(page: number) {
  return {
    type: TO_START_LOADING,
    page,
  };
}

export function startLoad() {
  return {
    type: START_LOADING,
  };
}

export function loadFailed() {
  return {
    type: {
      type: LOAD_FAILED,
    }
  };
}

export function loadSuccess(data: any) {
  return {
    type: LOAD_SUCCESS,
    data,
  };
}

export function startLoadSentence() {
  return {
    type: START_LOAD_SENTENCE,
  };
}

export function loadSentenceSuccess(data: any) {
  return {
    type: LOAD_SENTENCE_SUCCESS,
    data,
  };
}
