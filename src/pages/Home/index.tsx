import { Button } from 'antd-mobile';
import { FC, memo } from 'react';
import { useCountStore } from '@/store';
import { useTranslation } from 'react-i18next';

const Home: FC = () => {
  const { count, increment, decrement, reset } = useCountStore();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <span className="text-2xl">{count}</span>
      <Button onClick={increment} className="w-12">
        {t('common.increment')}
      </Button>
      <Button
        onClick={() => (count > 0 ? decrement() : undefined)}
        className="w-12">
        {t('common.decrement')}
      </Button>
      <Button onClick={reset} className="w-12" color="primary">
        {t('common.reset')}
      </Button>
    </div>
  );
};

export default memo(Home);
