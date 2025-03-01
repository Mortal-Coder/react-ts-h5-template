import { White } from '@/typings';
import { lazy } from 'react';
const Message = lazy(
  () => import(/* chunkName: "Message" */ '@/pages/Message'),
);
const About = lazy(() => import(/* chunkName: About */ '@/pages/About'));
const Home = lazy(() => import(/* chunkName: Home */ '@/pages/Home'));
const Detail = lazy(() => import(/* chunkName: Detail */ '@/pages/Detail'));
const Index = lazy(() => import(/* chunkName: Index */ '@/pages/Index/index'));
const NoFound = lazy(
  () => import(/* chunkName: NoFound */ '@/components/NotFound'),
);
export const TabBarList: White.RouteTabBar[] = [
  {
    path: '/',
    component: Home,
    icon: 'icon-app-home-fill',
    sceneMode: 'scroll',
    title: '首页',
  },
  {
    path: '/detail',
    component: Detail,
    icon: 'icon-app-layers-fill',
    sceneMode: 'scroll',
    title: '详情',
  },
  {
    path: '/message',
    component: Message,
    icon: 'icon-app-message-comments-fill',
    sceneMode: 'scroll',
    title: '消息',
  },
  {
    path: '/about',
    component: About,
    icon: 'icon-app-atm-fill',
    sceneMode: 'scroll',
    title: '我的',
  },
];

const routes: White.RouteConfig[] = [
  {
    path: '/',
    component: Index,
    tabBars: TabBarList,
  },
  {
    path: '*',
    component: NoFound,
  },
];

export default [...routes];
