import { FC, memo } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './index.module.less';

const Index: FC = () => {
  return (
    <div className={styles.tabbar_page}>
      <Outlet />
    </div>
  );
};

export default memo(Index);
