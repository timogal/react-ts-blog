import { BOOTSTRAP, START_LOAD, LOAD_FAILED, LOAD_SUCCESS } from './constants';

export function bootstrap(page: number) {
  return {
    type: BOOTSTRAP,
    page: page,
  };
}

export function startLoad() {
  return {
    type: START_LOAD,
  };
}

export function loadFailed() {
  return {
    type: LOAD_FAILED,
  };
}

export function loadSuccess(data: any) {
  return {
    type: LOAD_SUCCESS,
    data,
  };
}
