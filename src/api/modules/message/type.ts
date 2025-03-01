export interface IMessage {
  id: number;
  title: string;
  content: string;
  sender: string;
  avatar: string;
  isRead: boolean;
  type: 'system' | 'user' | 'notification';
  createTime: string;
}

export interface IRequest {
  params: Record<string, string>;
  query: Record<string, string>;
  body: Record<string, unknown>;
}

export interface IMessageListResponse {
  list: IMessage[];
  total: number;
}
