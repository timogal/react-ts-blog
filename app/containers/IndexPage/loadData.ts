import { LoadData } from 'types/index';
import saga from './saga';

const loadData: LoadData = async (store) => {
  const page = store.getState().get('indexPage').get('page');
  const task = store.runSaga(saga, page);
  return task.done;
};

export default loadData;
