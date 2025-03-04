import { LangEnum } from '@/constant/langEnum';
import { useLanguageStore } from '@/store';
import { Button, Modal } from 'antd-mobile';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
const About: FC = () => {
  const { setLanguage } = useLanguageStore();
  const { t } = useTranslation();

  const handleChangeLanguage = () => {
    Modal.show({
      title: t('common.changeLanguage'),
      closeOnAction: true,
      closeOnMaskClick: true,
      onAction: (action) => {
        setLanguage(action.key as string);
      },
      actions: [
        {
          key: LangEnum.ZH,
          text: '中文',
          style: {
            color: 'var(--color-primary)',
            fontSize: 16,
          },
        },
        {
          key: LangEnum.EN,
          text: 'English',
          style: {
            color: 'var(--color-primary)',
            fontSize: 16,
          },
        },
      ],
    });
  };
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Button onClick={handleChangeLanguage}>
        {t('common.changeLanguage')}
      </Button>
    </div>
  );
};

export default About;
