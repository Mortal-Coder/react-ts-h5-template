import { useState, useCallback, useRef, useEffect } from 'react';

// 请求参数
interface FetchParams {
  page?: number;
  limit?: number;
  [key: string]: unknown;
}

// 响应类型
interface ApiResponse<T> {
  list: T[];
  total: number;
  extend?: Record<string, unknown>;
}

export function useLoadList<T>(
  fetchFn: (params: FetchParams) => Promise<ApiResponse<T>>,
  limit = 10,
) {
  const [list, setList] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [extend, setExtend] = useState<Record<string, unknown> | undefined>(
    undefined,
  );
  const [refreshing, setRefreshing] = useState(false);
  const [hasError, setHasError] = useState(false);

  const stateRef = useRef({
    list,
    limit,
    page,
    finished,
    hasError,
  });

  // 更新ref中的状态
  useEffect(() => {
    stateRef.current = {
      list,
      limit,
      page,
      finished,
      hasError,
    };
  }, [list, limit, page, finished, hasError]);

  // 加载数据
  const loadData = useCallback(
    async (refresh = false, extraParams: Partial<FetchParams> = {}) => {
      const { hasError, finished, list, page, limit } = stateRef.current;
      if (hasError && !refresh) {
        setLoading(false);
        return;
      }

      try {
        let preList = list;

        if (refresh) {
          setRefreshing(true);
          setPage(1);
          preList = [];
          setFinished(false);
          setHasError(false);
        }

        if (finished && !refresh) {
          return;
        }

        setLoading(true);
        setError(null);
        const currentPage = refresh ? 1 : page;

        const params = {
          page: currentPage,
          limit,
          ...extraParams,
        };

        const res = await fetchFn(params);

        if (!res) {
          throw new Error('获取数据失败');
        }

        if (res.extend) {
          setExtend(res.extend);
        }

        const updatedList = refresh ? res.list : [...preList, ...res.list];

        setList(updatedList);
        setFinished(updatedList.length >= res.total);
        setPage(currentPage + 1);
        setHasError(false);
      } catch (err) {
        setError(err as Error);
        setHasError(true);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [fetchFn],
  );

  // 重试
  const retry = useCallback(() => {
    setHasError(false);
    setFinished(false);
    return loadData(false);
  }, [loadData]);

  return {
    state: {
      list,
      page,
      limit,
      loading,
      finished,
      error,
      extend,
    },
    refreshing,
    hasError,
    loadData,
    retry,
  };
}
