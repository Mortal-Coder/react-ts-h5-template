import { FC, useState, useEffect } from 'react';
import { Tabs } from 'antd-mobile';
import MessageList from './components/MessageList';
import './index.less';
import api from '@/api';
import { useLoadList } from '@/utils/loadListData';

const tabItems = [
  { key: 'message', title: '消息' },
  { key: 'system', title: '系统' },
  { key: 'notification', title: '通知' },
];

const Message: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { state, loadData, hasError } = useLoadList(
    api.messageApi.getMessageListPaginated,
  );

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
