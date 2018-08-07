import { LoadData } from 'types/index';
import saga from './sagas';

const loadData: LoadData = async function (store, match) {
  const { id } = match.params;
  const task = store.runSaga(saga, id);
  await task.done;
};

export default loadData;
