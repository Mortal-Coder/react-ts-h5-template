import { BrowserRouter as Router } from 'react-router-dom';
import TabBarView from '@/layout/tabbarView';
import RouteRender from '@/router/RouteRender';
import { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import { loadLocale } from '@/utils/admConfig';
import { useLanguageStore } from '@/store';

const App = () => {
  const [locale, setLocale] = useState(zhCN);
  const { language } = useLanguageStore();

  useEffect(() => {
    loadLocale(language).then((localeData) => {
      setLocale(localeData);
    });
  }, [language]);

  return (
    <ConfigProvider locale={locale}>
      <Router>
        <RouteRender />
        <TabBarView />
      </Router>
    </ConfigProvider>
  );
};

export default App;
