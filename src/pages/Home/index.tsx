import { Button } from 'antd-mobile';
import { FC, memo } from 'react';
import { useCountStore } from '@/store';

const Home: FC = () => {
  const { count, increment, decrement, reset } = useCountStore();

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <span className="text-2xl">{count}</span>
      <Button onClick={increment}>Increment</Button>
      <Button onClick={() => (count > 0 ? decrement() : undefined)}>
        Decrement
      </Button>
      <Button onClick={reset} className="!px-4" color="primary">
        Reset
      </Button>
    </div>
  );
};

export default memo(Home);
