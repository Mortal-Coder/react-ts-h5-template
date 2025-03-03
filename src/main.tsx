import '../public/locales';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';
import { GlobalProvider } from 'rmox';
import 'lib-flexible';
import vhCheck from 'vh-check';
import VConsole from 'vconsole';
import '@/assets/css/common.less';

// 导入mock数据（仅在开发环境中使用）
if (import.meta.env.DEV) {
  import('./mock');
}

// 解决ios底部地址栏高度问题
vhCheck('browser-address-bar');

// 只在开发环境启用VConsole
if (import.meta.env.DEV) {
  new VConsole();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>,
);
