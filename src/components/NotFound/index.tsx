import { memo } from 'react';
import './index.less';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'node_modules/react-i18next';

const NoFound = () => {
  const nav = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center fullPage">
      <p className="text-xs">{t('common.notFound')}</p>
      <div
        className="back_btn"
        onClick={() => {
          nav('/', { replace: true });
        }}>
        {t('common.backHome')}
      </div>
    </div>
  );
};
export default memo(NoFound);
