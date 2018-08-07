import { DETAIL_LOAD_SUCCESS } from './constants';

export function detailLoaded(data: any) {
  return {
    type: DETAIL_LOAD_SUCCESS,
    detail: data
  };
}
