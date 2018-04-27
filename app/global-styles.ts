import { injectGlobal } from 'components/styled';

import theme from './theme';

injectGlobal`
   body {
      font-size: ${theme.fontSize};
      font-family: ${theme.fontFamily};
      line-height: 1.5;
      padding: 0;
      margin: 0;
   }
`;

