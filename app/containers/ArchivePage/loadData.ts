import { LoadData } from 'types/index';
import { loadPosts } from './sagas';

const loadData: LoadData = async (store) => {
  const page = store.getState().get('archivePage').get('page');
  const task = store.runSaga(loadPosts, { page });
  return task.done;
};

export default loadData;
