import { Button } from 'antd-mobile';
import { FC } from 'react';
import { useDarkModeStore } from '@/store/index';
import { useTranslation } from 'react-i18next';
const Detail: FC = () => {
  const { toggleTheme } = useDarkModeStore();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Button onClick={toggleTheme}>{t('common.switchDarkMode')}</Button>
    </div>
  );
};

export default Detail;
