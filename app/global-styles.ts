import { injectGlobal } from 'components/styled';

import theme from './theme';

injectGlobal`
   * {
      box-sizing: border-box;
   }
   
   body {
      font-size: ${theme.fontSize};
      font-family: ${theme.fontFamily};
      line-height: 1.5;
      padding: 0;
      margin: 0;
   }
   
   ul,
   ol {
      list-style: none;
      margin: 0;
      padding: 0;
   }
   
   #root {
      height: 100%;
   }
`;

