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
import { useTranslation } from 'next-i18next';
import { drawerAtom } from '@/store/drawer-atom';
import { useAtom } from 'jotai';
import { stockAuthBooleanAtom } from '@/store/authorization-atom';

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


export function useValidateStock() {
  const [_, closeSidebar] = useAtom(drawerAtom);
  const router = useRouter();
  const { t } = useTranslation();
  const [stockAuth, setStockAuth] = useAtom(stockAuthBooleanAtom)
  const { mutate: validateStock, isLoading } = useMutation(client.orders.validateStock, {
    onSuccess: (data) => {
      const products = data.data.products
      if (products.length !== 0) {
        let errors : string[] = []
        const noStockErrors : string[] = []
        products.forEach((prod:any) => {
          if (prod.nohabrastock) {
            noStockErrors.push(`${prod.name}: No hay stock esta semana.`)
          } else {
          }
          errors = [...errors, ...prod.errors]
        })
        if (errors.length === 0 && noStockErrors.length === 0) {
          setStockAuth(true)
          router.push(ROUTES.CHECKOUT)
          closeSidebar({ display: false, view: '' });
        } else {
          if (errors.length > 0) {
            errors.forEach(err => {
              toast.error(err,{
                "closeButton": true,
                progress: 1
            });
            })
          }
          if (noStockErrors.length > 0) {
            noStockErrors.forEach(err => {
              toast.warning(err,{
                "closeButton": true,
                progress:1
            });
            })
          }
        
        }
      }
    },
    onError: (error) => {
      toast.error(t('error-something-wrong'))
    },
  });

  return {
    validateStock,
    isLoading
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

