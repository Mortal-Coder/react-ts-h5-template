import Mock from 'mockjs';
import { IMessage } from '@/api/modules/message/type';

const Random = Mock.Random;

const messageList = Mock.mock({
  'list|50': [
    {
      'id|+1': 1,
      title: () => Random.ctitle(5, 10),
      content: () => Random.cparagraph(2, 5),
      sender: () => Random.cname(),
      avatar: () =>
        Random.image(
          '50x50',
          Random.color(),
          '#fff',
          'png',
          Random.character('upper'),
        ),
      'isRead|1': [true, false],
      'type|1': ['system', 'user', 'notification'],
      createTime: () => Random.datetime('yyyy-MM-dd HH:mm:ss'),
    },
  ],
});

interface MockOptions {
  url: string;
  type?: string;
  body?: string;
}

const parseQuery = (url: string): Record<string, string> => {
  const queryString = url.split('?')[1] || '';
  const params: Record<string, string> = {};

  if (!queryString) return params;

  const pairs = queryString.split('&');
  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    params[key] = decodeURIComponent(value || '');
  }

  return params;
};

const exactPathMatch = (pattern: string, url: string): boolean => {
  const path = url.split('?')[0];

  const patternRegex = pattern
    .replace(/\/:[^/]+/g, '/[^/]+')
    .replace(/\//g, '\\/');

  const regex = new RegExp(`^${patternRegex}$`);

  return regex.test(path);
};

export default {
  // 使用函数来处理所有请求，根据URL精确匹配返回对应的mock数据
  'GET /api/(.*)': (options: MockOptions) => {
    const { url } = options;

    if (exactPathMatch('/api/messages', url)) {
      return {
        code: 200,
        data: messageList.list,
        message: '获取消息列表成功',
      };
    }

    const idMatch = url.match(/^\/api\/message\/(\d+)$/);
    if (idMatch) {
      const id = idMatch[1];

      if (!id) {
        return {
          code: 400,
          data: null,
          message: '无效的ID参数',
        };
      }

      const message = (messageList.list as IMessage[]).find(
        (item: IMessage) => item.id === parseInt(id),
      );

      if (message) {
        return {
          code: 200,
          data: message,
          message: '获取消息详情成功',
        };
      } else {
        return {
          code: 404,
          data: null,
          message: '消息不存在',
        };
      }
    }

    if (exactPathMatch('/api/messages/paginated', url)) {
      // 解析查询参数
      const params = parseQuery(url);
      const page = parseInt(params.page || '1');
      const limit = parseInt(params.limit || '10');
      const type = params.type;

      // 根据类型过滤消息
      let filteredList = [...messageList.list] as IMessage[];
      if (type !== 'message') {
        filteredList = filteredList.filter((msg) => msg.type === type);
      }

      // 计算分页
      const total = filteredList.length;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedList = filteredList.slice(startIndex, endIndex);

      const responseData = {
        list: paginatedList as IMessage[],
        total: total,
      };

      return {
        code: 200,
        data: responseData,
        message: '获取分页消息列表成功',
      };
    }

    return {
      code: 404,
      data: null,
      message: '接口不存在',
    };
  },
};
