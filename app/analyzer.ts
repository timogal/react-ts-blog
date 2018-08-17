import { isProd } from 'utils/env';
import loadScript from 'utils/loadScript';

const protocol = isProd ? 'https' : 'http';

export default function loadAnalyzer() {
  if (isProd) {
    loadScript(`${protocol}://s13.cnzz.com/z_stat.php?id=1274226487`, { id: 'cnzz-analyzer' });
  }
}
