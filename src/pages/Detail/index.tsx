import { FC } from 'react';

const Detail: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-[24px] text-center w-full bg-green-200">
        Hello World
      </h1>
      <div className="h-[400px] w-full bg-red-200"></div>
      <div className="h-[600px] w-full bg-blue-200"></div>
      <div className="h-[400px] w-full bg-orange-200"></div>
    </div>
  );
};

export default Detail;
