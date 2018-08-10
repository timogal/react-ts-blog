import { LoadData } from 'types/index';
import { loadArticles } from './saga';

const loadData: LoadData = async (store) => {
  const page = store.getState().get('indexPage').get('page');
  const task = store.runSaga(loadArticles, { page });
  return task.done;
};

export default loadData;
