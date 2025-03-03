import { http } from '@/utils/axios';
import { IMessage, IMessageListResponse } from './type';

// 获取消息列表
export const getMessageList = async (): Promise<IMessage[]> => {
  return await http.get<IMessage[]>('/api/messages');
};

// 获取消息详情
export const getMessageDetail = async (id: number): Promise<IMessage> => {
  return await http.get<IMessage>(`/api/message/${id}`);
};

// 分页获取消息列表
export const getMessageListPaginated = async (params: {
  page?: number;
  limit?: number;
  type?: string;
}) => {
  const result = await http.get<IMessageListResponse>(
    '/api/messages/paginated',
    params,
  );
  return result;
};
