import { Order, OrderQueryOptions } from '@/types';
import { useMutation, useQuery } from 'react-query';

import { toast} from 'react-toastify';

import { API_ENDPOINTS } from './client/api-endpoints';
import client from './client';
import { useRouter } from 'next/router';
import { ROUTES } from '@/lib/routes';
import Cookies from 'js-cookie';
import { AUTH_TOKEN_KEY } from '@/lib/constants';
import { useTranslation } from 'next-i18next';
import { drawerAtom } from '@/store/drawer-atom';
import { useAtom } from 'jotai';
import {
  stockAuthBooleanAtom,
  stockDeliveryDaysAtom,
  stockPickUpDaysAtom,
} from '@/store/authorization-atom';
import { useCart } from '@/store/quick-cart/cart.context';

export function useOrders(options?: Partial<OrderQueryOptions>) {
  const { data, isLoading, error } = useQuery(
    [API_ENDPOINTS.ORDERS],
    client.orders.all,
    {
      onError: (err) => {},
    }
  );

  return {
    orders: data,
    isLoading,
    error,
  };
}

export function useOrder({ tracking_number }: { tracking_number: string }) {
  const { data, isLoading, error } = useQuery<Order, Error>(
    [
      `${API_ENDPOINTS.ORDERS}?id=${Cookies.get(AUTH_TOKEN_KEY)}`,
      tracking_number,
    ],
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
  const [_1, setStockAuth] = useAtom(stockAuthBooleanAtom);
  const [_2, setPickUpDays] = useAtom(stockPickUpDaysAtom);
  const [_3, setDeliveryDays] = useAtom(stockDeliveryDaysAtom);
  return useMutation(client.orders.validateStock, {
    onSettled: async (data) => {
      try {
        console.log(data)
      if (data.status === 200) {
        
        // checkea que sea sabado
        const argTime = new Date().toLocaleString('en-US', {
          timeZone: 'America/Argentina/Buenos_Aires',
        });

        const today = new Date(argTime);

       /*  if (today.getDay() === 6) {
          toast.warning(t('text-no-order-today'), {
            closeButton: true,
            progress: 1,
          });
          return;
        } */
        // checkea que este iniciado el stock de la semana
        if (data.data.noInit) {
          
          toast.error(t('error-something-wrong'));
          return;
        }

        const products = data.data.products;
        const pickupDays = data.data.pickupDays;
        const deliveryDays = data.data.deliveryDays;
        // checkea stock y errores en products
        if (products.length !== 0) {
          let moreThanStockLimit = false
          let errors: string[] = [];
          const noStockErrors: string[] = [];
          products.forEach((prod: any) => {
            if (prod.nohabrastock) {
              // si no tiene errores es que no hay nada de stock en toda la semana
              if (prod.errors.length === 0) {
                console.log(prod)
                noStockErrors.push(`${prod.name}: No hay stock esta semana.`);
              // sino significa que tiene stcok pero no el suficiente para la cantidad seleccionada
              } else {
                moreThanStockLimit = true
              } 
            } 
            errors = [...errors, ...prod.errors];
          });

          // checkea que no haya errores
          if (
            //errors.length === 0 &&
            !moreThanStockLimit &&
            noStockErrors.length === 0
          ) {
            // checkea que haya minimo 1 dia de pickup
            if (pickupDays.length > 0) {
              setStockAuth(true);
              setPickUpDays(pickupDays);
              setDeliveryDays(deliveryDays);
              await router.push(ROUTES.CHECKOUT).then(() => {
                closeSidebar({ display: false, view: '' });
              });
            } else {
              toast.error(t('error-no-days'), {
                closeButton: true,
                progress: 1,
              });
            }
          } else {
            if (noStockErrors.length > 0) {
              noStockErrors.forEach((err) => {
                toast.warning(err, {
                  closeButton: true,
                  progress: 1,
                });
              });
            }
            else if (errors.length > 0) {
              errors.forEach((err) => {
                toast.error(err, {
                  closeButton: true,
                  progress: 1,
                });
              });
            }
            
          }
        }
      } else toast.error(t('error-something-wrong'));
    } catch {
      toast.error(t('error-something-wrong'));
    }
    },
    onError: (error) => {
      console.log(error)
      toast.error(t('error-something-wrong'));
    }
  });
}

export function useCreateOrder() {
  const { t } = useTranslation();
  const router = useRouter();
  const [_, setDrawerView] = useAtom(drawerAtom);
  const { resetCart } = useCart();

  const { mutate: createOrder, isLoading } = useMutation(client.orders.create, {
    onSettled: async (data) => {
      try {
      if (data && data.status === 200) {
        if (data.data.success) {
          toast.success(t('send-order-successful'));
          await router.push(`${ROUTES.ORDERS}`).then(() => {
            resetCart();
          });
        } else {
          await router.push('/').then(() => {
            toast.warning(t('text-checkout-validation-fail'), {
              closeButton: true,
              progress: 1,
            });
            setDrawerView({ display: true, view: 'cart' });
          });
        }
      } else toast.error(t('error-something-wrong'));
    } catch {
      toast.error(t('error-something-wrong'));
    }
    },
    onError: (error) => {
      toast.error(t('error-something-wrong'));
    },
  });

  return {
    createOrder,
    isLoading,
  };
}
