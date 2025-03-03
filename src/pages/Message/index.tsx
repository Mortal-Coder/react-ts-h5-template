import { FC, useState, useEffect } from 'react';
import { Tabs } from 'antd-mobile';
import MessageList from './components/MessageList';
import './index.less';
import api from '@/api';
import { useLoadList } from '@/utils/loadListData';
import { useTranslation } from 'react-i18next';

const Message: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { state, loadData, hasError } = useLoadList(
    api.messageApi.getMessageListPaginated,
  );

  const { t } = useTranslation();

  const tabItems = [
    { key: 'message', title: t('message.message') },
    { key: 'system', title: t('message.system') },
    { key: 'notification', title: t('message.notification') },
  ];
  // 刷新
  const handleRefresh = async (type: string) => {
    await loadData(true, {
      type,
    });
  };

  // 加载更多
  const handleLoadMore = async (type: string) => {
    await loadData(false, {
      type,
    });
  };

  useEffect(() => {
    handleRefresh(tabItems[activeIndex].key);
  }, [activeIndex]);

  return (
    <Tabs
      style={{
        '--title-font-size': '14px',
      }}
      activeKey={tabItems[activeIndex].key}
      onChange={(key) => {
        const index = tabItems.findIndex((item) => item.key === key);
        setActiveIndex(index);
      }}>
      {tabItems.map((item) => (
        <Tabs.Tab title={item.title} key={item.key}>
          <MessageList
            type={item.key}
            messages={state.list}
            loading={state.loading}
            hasError={hasError}
            hasMore={!state.finished}
            onRefresh={() => handleRefresh(item.key)}
            onLoadMore={() => handleLoadMore(item.key)}
          />
        </Tabs.Tab>
      ))}
    </Tabs>
  );
};

export default Message;
