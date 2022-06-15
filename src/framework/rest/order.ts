import {
  Order,
  OrderQueryOptions,
} from '@/types';
import {
  useMutation,
  useQuery,

} from 'react-query';

import { toast } from 'react-toastify';

import { API_ENDPOINTS } from './client/api-endpoints';
import client from './client';
import { useRouter } from 'next/router';
import { ROUTES } from '@/lib/routes';
import Cookies from 'js-cookie';
import { AUTH_TOKEN_KEY } from '@/lib/constants';

export function useOrders(options?: Partial<OrderQueryOptions>) {


  const { data, isLoading, error } = useQuery(
    [API_ENDPOINTS.ORDERS],
    client.orders.all,
    {
      onError: (err) => {
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


export function useCreateOrder() {
  const router = useRouter();

  const { mutate: createOrder, isLoading } = useMutation(client.orders.create, {
    onSuccess: (data) => {
      if (data?.tracking_number) {
        router.push(`${ROUTES.ORDERS}/${data?.tracking_number}`);
      }
    },
    onError: (error) => {
      const {
        response: { data },
      }: any = error ?? {};
      toast.error(data?.message);
    },
  });

  return {
    createOrder,
    isLoading,
  };
}

