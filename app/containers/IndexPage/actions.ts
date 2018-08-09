import { START_LOADING, LOAD_SUCCESS, LOAD_FAILED } from './contants';

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
