import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';

import ThemeVariables from 'types/theme';

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<ThemeVariables>;


export { css, injectGlobal, keyframes, ThemeProvider };

export default styled;
