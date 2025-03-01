import { FC } from 'react';
import {
  List,
  Avatar,
  Badge,
  ErrorBlock,
  DotLoading,
  PullToRefresh,
  InfiniteScroll,
  Space,
} from 'antd-mobile';
import { IMessage } from '@/api/modules/message/type';
import './index.less';
interface MessageListProps {
  type: string;
  messages: IMessage[];
  loading: boolean;
  hasError: boolean;
  hasMore: boolean;
  onRefresh: () => Promise<void>;
  onLoadMore: () => Promise<void>;
}

const MessageList: FC<MessageListProps> = ({
  type,
  messages,
  loading,
  hasError,
  hasMore,
  onRefresh,
  onLoadMore,
}) => {
  const getMessageTypeStyle = (type: string) => {
    switch (type) {
      case 'system':
        return { color: '#1677ff', background: '#e6f4ff' };
      case 'notification':
        return { color: '#52c41a', background: '#f6ffed' };
      case 'user':
        return { color: '#fa8c16', background: '#fff7e6' };
      default:
        return { color: '#1677ff', background: '#e6f4ff' };
    }
  };

  const renderContent = () => {
    if (hasError) {
      return (
        <ErrorBlock
          status="disconnected"
          title="加载失败"
          description="请检查网络连接后重试"
        />
      );
    }

    if ((!messages || messages.length === 0) && !loading) {
      return (
        <Space
          block
          direction="vertical"
          className="flex justify-center items-center"
          style={{ '--gap': '16px' }}>
          <ErrorBlock status="empty" />
        </Space>
      );
    }

    return (
      <List className="w-full admList">
        {messages.map((message, index) => (
          <List.Item
            key={`${type}-${message.id}-${index}`}
            prefix={
              <Badge
                color="red"
                content={message.isRead ? null : ''}
                style={{ '--right': '5px', '--top': '5px' }}>
                <Avatar
                  src={message.avatar}
                  style={{ '--border-radius': '8px' }}
                />
              </Badge>
            }
            title={
              <div className="flex items-center">
                <span className="font-medium text-[#666]">{message.title}</span>
                <span
                  className="ml-2 text-xs px-2 py-[2px] rounded-xs"
                  style={getMessageTypeStyle(message.type)}>
                  {message.type === 'system'
                    ? '系统'
                    : message.type === 'notification'
                      ? '通知'
                      : '用户'}
                </span>
              </div>
            }
            description={
              <div className="text-gray-500 text-xs mt-1">
                <div className="line-clamp-2">{message.content}</div>
                <div className="mt-1 text-xs text-gray-400">
                  {message.sender} · {message.createTime}
                </div>
              </div>
            }
          />
        ))}
      </List>
    );
  };

  const renderLoadMore = () => {
    if (loading && hasMore) {
      return (
        <div className="flex justify-center items-center py-4">
          <DotLoading color="primary" />
          <span className="ml-2">加载更多...</span>
        </div>
      );
    }

    if (!hasMore && messages.length > 0) {
      return (
        <div className="text-center text-gray-400 text-sm">没有更多消息了</div>
      );
    }

    return null;
  };

  return (
    <PullToRefresh onRefresh={onRefresh}>
      {renderContent()}
      <InfiniteScroll loadMore={onLoadMore} hasMore={hasMore}>
        {renderLoadMore()}
      </InfiniteScroll>
    </PullToRefresh>
  );
};

export default MessageList;
