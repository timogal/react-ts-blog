import { LoadData } from 'types/index';
import { loadArticles, getDailySentence } from './saga';

const loadData: LoadData = async (store) => {
  const page = store.getState().get('indexPage').get('page');
  const articleTask = store.runSaga(loadArticles, { page });
  const sentenceTask = store.runSaga(getDailySentence);
  return Promise.all([articleTask.done, sentenceTask.done]);
};

export default loadData;
