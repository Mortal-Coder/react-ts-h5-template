import { memo } from 'react';
import './index.less';
import { useNavigate } from 'react-router-dom';

const NoFound = () => {
  const nav = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center fullPage">
      <p className="text-xs">Sorry,您访问的页面丢了~</p>
      <div
        className="back_btn"
        onClick={() => {
          nav('/', { replace: true });
        }}>
        返回首页
      </div>
    </div>
  );
};
export default memo(NoFound);
