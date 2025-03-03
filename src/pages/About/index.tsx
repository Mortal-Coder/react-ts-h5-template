import { useLanguageStore } from '@/store';
import { Button } from 'antd-mobile';
import { FC } from 'react';

const About: FC = () => {
  const { setLanguage } = useLanguageStore();
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Button onClick={() => setLanguage('zh')} className="w-12">
        中文
      </Button>
      <Button onClick={() => setLanguage('en')} className="w-12">
        English
      </Button>
    </div>
  );
};

export default About;
