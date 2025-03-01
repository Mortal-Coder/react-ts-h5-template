import Mock from 'mockjs';
import messageApi from './message';

Mock.setup({
  timeout: '200-600',
});

interface MockOptions {
  url: string;
  type: string;
  body?: string;
}

interface MockResponse<T> {
  code: number;
  data: T;
  message: string;
}

type MockApi = Record<string, (options: MockOptions) => MockResponse<unknown>>;

Object.keys(messageApi).forEach((key) => {
  const [method, url] = key.split(' ');
  Mock.mock(new RegExp(url), method.toLowerCase(), (options) => {
    const response = (messageApi as MockApi)[key](options);
    return response;
  });
});

export default Mock;
