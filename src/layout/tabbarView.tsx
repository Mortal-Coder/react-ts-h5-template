import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, matchPath, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routers from '@/router/index';
import styles from './index.module.less';
import { TabBarItem, RouterItem } from '@/typings/routerTypings';

const TabBarView: FC = () => {
  const { ready } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const tabBars = useRef<TabBarItem[] | undefined>(
    routers.find((v: RouterItem) => v.tabBars)?.tabBars,
  );

  const [state, setstate] = useState<number | undefined>(
    tabBars.current?.findIndex(
      (v: TabBarItem) => v.path === window.location.pathname,
    ),
  );

  const OnTabClick = useCallback(
    (index: number, path: string) => {
      if (state === index) return;
      setstate(index);
      navigate(path);
    },
    [state, navigate],
  );

  useEffect(() => {
    setstate(
      tabBars.current?.findIndex((v: TabBarItem) =>
        matchPath(v.path, location.pathname),
      ),
    );
  }, [location]);

  const isTabBar =
    tabBars.current?.findIndex((v: TabBarItem) =>
      matchPath(v.path, location.pathname),
    ) !== -1;

  if (!ready) {
    return null;
  }

  return (
    <div
      className={`${styles.tabBar} flex justify-center items-center ${
        isTabBar ? styles.in_page : styles.out_page
      }`}>
      {tabBars.current?.map(
        ({ title, path, icon }: TabBarItem, index: number) => (
          <div
            className={`flex flex-col justify-center items-center ${
              styles.tabBarItem
            } ${state === index ? styles.selected : ''}`}
            key={path}
            onClick={() => {
              OnTabClick(index, path);
            }}>
            <i className={`iconfont ${icon}`} />
            <span>{typeof title === 'function' ? title() : title}</span>
          </div>
        ),
      )}
    </div>
  );
};

export default memo(TabBarView);
