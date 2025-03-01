import AnimatedSwitch from '@/components/AnimatedSwitch';
import LoadingView from '@/components/LoadingView';
import useTitle from '@/hooks/useTitle';
import { White } from '@/typings';
import { treeToList } from '@/utils';
import NProgress from '@/utils/progress';
import { Suspense, useLayoutEffect, useEffect, useMemo } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import routes from './index';
import useSwitch from './useSwitch';

interface RouteConfigWithIndex extends White.RouteConfig {
  [key: string]: unknown;
}

const generateRoute = ({
  routes,
  path,
  component: Component,
  tabBars,
  ...other
}: RouteConfigWithIndex) => (
  <Route path={path} key={path} element={<Component />} {...other}>
    {(routes || tabBars)?.map((v) => generateRoute(v as RouteConfigWithIndex))}
  </Route>
);

let isStart = false;
const routeList = treeToList(routes as RouteConfigWithIndex[], [
  'routes',
  'tabBars',
]);

const handler = (e: React.MouseEvent | MouseEvent) => {
  e.stopPropagation();
  e.preventDefault();
};

const RouteRender = () => {
  const { classNames, primaryKey, location } = useSwitch();
  const currentLocation = useLocation();

  const routesView = useMemo(() => {
    return routes.map((v) => generateRoute(v as RouteConfigWithIndex));
  }, []);

  useLayoutEffect(() => {
    document.removeEventListener('click', handler, true);
  }, []);

  // 监听路由变化，启动和结束进度条
  useEffect(() => {
    NProgress.start();

    const timer = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [currentLocation]);

  // 设置页面标题
  useTitle(
    routeList.find((v) => v.path === location.pathname)?.title as string,
  );

  return (
    <AnimatedSwitch
      classNames={classNames}
      primaryKey={primaryKey}
      onEnter={() => {
        if (!isStart) {
          document.addEventListener('click', handler, true);
          isStart = !isStart;
        }
      }}
      onExited={() => {
        if (isStart) {
          document.removeEventListener('click', handler, true);
          isStart = !isStart;
        }
      }}>
      <div className="fullPage">
        <Suspense fallback={<LoadingView />}>
          <Routes location={location}>{routesView}</Routes>
        </Suspense>
      </div>
    </AnimatedSwitch>
  );
};

export default RouteRender;
