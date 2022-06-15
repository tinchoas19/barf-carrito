import {
  DownloadableFilePaginator,
  Order,
  OrderPaginator,
  OrderQueryOptions,
  OrderStatusPaginator,
  QueryOptions,
} from '@/types';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,

} from 'react-query';

import { toast } from 'react-toastify';

import { API_ENDPOINTS } from './client/api-endpoints';
import client from './client';
import { useAtom } from 'jotai';
import { verifiedResponseAtom } from '@/store/checkout';
import { useRouter } from 'next/router';
import { ROUTES } from '@/lib/routes';
import { mapPaginatorData } from '@/framework/utils/data-mappers';
import Cookies from 'js-cookie';
import { AUTH_TOKEN_KEY } from '@/lib/constants';

export function useOrders(options?: Partial<OrderQueryOptions>) {
/*   const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<Order[], Error>(
    [`${API_ENDPOINTS.ORDERS}?id=${Cookies.get(AUTH_TOKEN_KEY)}`, options],
    ({ queryKey, pageParam }) =>
      client.orders.all())
     {
      getNextPageParam: ({ current_page, last_page }) =>
        last_page > current_page && { page: current_page + 1 },
    } 
  );

  function handleLoadMore() {
    fetchNextPage();
  } */


  const { data, isLoading, error } = useQuery(
    [API_ENDPOINTS.ORDERS],
    client.orders.all,
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );
  
  return {
    orders: data,
    isLoading,
    error
  };
}

export function useOrder({ tracking_number }: { tracking_number: string }) {
  const { data, isLoading, error } = useQuery<Order, Error>(
    [`${API_ENDPOINTS.ORDERS}?id=${Cookies.get(AUTH_TOKEN_KEY)}`, tracking_number],
    () => client.orders.get(tracking_number)
  );

  return {
    order: data,
    isLoading,
    error,
  };
}
/* 
export function useOrderStatuses(options: Pick<QueryOptions, 'limit'>) {
  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery<OrderStatusPaginator, Error>(
    [API_ENDPOINTS.ORDERS_STATUS, options],
    ({ queryKey, pageParam }) =>
      client.orders.statuses(Object.assign({}, queryKey[1], pageParam)),
    {
      getNextPageParam: ({ current_page, last_page }) =>
        last_page > current_page && { page: current_page + 1 },
    }
  );

  function handleLoadMore() {
    fetchNextPage();
  }

  return {
    orderStatuses: data?.pages.flatMap((page) => page.data) ?? [],
    paginatorInfo: Array.isArray(data?.pages)
      ? mapPaginatorData(data?.pages[data.pages.length - 1])
      : null,
    isLoading: isFetching,
    isLoadingMore: isFetchingNextPage,
    error,
    loadMore: handleLoadMore,
    hasMore: Boolean(hasNextPage),
  };
} */

/* export const useDownloadableProducts = (
  options: Pick<QueryOptions, 'limit'>
) => {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery<DownloadableFilePaginator, Error>(
    [API_ENDPOINTS.ORDERS_DOWNLOADS, options],
    ({ queryKey, pageParam }) =>
      client.orders.downloadable(Object.assign({}, queryKey[1], pageParam)),
    {
      getNextPageParam: ({ current_page, last_page }) =>
        last_page > current_page && { page: current_page + 1 },
    }
  );

  function handleLoadMore() {
    fetchNextPage();
  }

  return {
    downloads: data?.pages.flatMap((page) => page.data) ?? [],
    paginatorInfo: Array.isArray(data?.pages)
      ? mapPaginatorData(data?.pages[data.pages.length - 1])
      : null,
    isLoading,
    isLoadingMore: isFetchingNextPage,
    error,
    loadMore: handleLoadMore,
    hasMore: Boolean(hasNextPage),
  };
}; */


/* export function useSendOrder() {
  const { data, isLoading, error } = useQuery<Settings, Error>(
    [API_ENDPOINTS.ORDERS],
    client.settings.all
  );
  return {
    settings: data?.options ?? {},
    isLoading,
    error,
  };
} */


export function useCreateOrder() {
  const router = useRouter();

  const { mutate: createOrder, isLoading } = useMutation(client.orders.create, {
    onSuccess: (data) => {
      if (data?.tracking_number) {
        router.push(`${ROUTES.ORDERS}/${data?.tracking_number}`);
      }
      console.log('data:',data)
    },
    onError: (error) => {
      const {
        response: { data },
      }: any = error ?? {};
      toast.error(data?.message);
      console.log('error:',error)
    },
  });

  return {
    createOrder,
    isLoading,
  };
}

/* export function useGenerateDownloadableUrl() {
  const { mutate: getDownloadableUrl } = useMutation(
    client.orders.generateDownloadLink,
    {
      onSuccess: (data) => {
        function download(fileUrl: string, fileName: string) {
          var a = document.createElement('a');
          a.href = fileUrl;
          a.setAttribute('download', fileName);
          a.click();
        }

        download(data, 'record.name');
      },
    }
  );

  function generateDownloadableUrl(digital_file_id: string) {
    getDownloadableUrl({
      digital_file_id,
    });
  }

  return {
    generateDownloadableUrl,
  };
} */

/* export function useVerifyOrder() {
  const [_, setVerifiedResponse] = useAtom(verifiedResponseAtom);

  return useMutation(client.orders.verify, {
    onSuccess: (data) => {
      if (data) {
        //@ts-ignore
        setVerifiedResponse(data);
      }
    },
    onError: (error) => {
      const {
        response: { data },
      }: any = error ?? {};

      toast.error(data?.message);
    },
  });
} */
