import { useEffect, useState } from 'react';
import Collapse from 'rc-collapse';
import ErrorMessage from '@/components/ui/error-message';
import OrdersWithLoader from '@/components/orders/orders-with-loader';
import OrderCard from '@/components/orders/order-card';
import OrderDetails from '@/components/orders/order-details';
import OrderListMobile from '@/components/orders/order-list-mobile';
import { useOrders } from '@/framework/order';

export default function Orders() {
  const { orders, isLoading, error} = useOrders();

  const [order, setOrder] = useState<any>({});
    useEffect(() => {
    if (orders) {
      setOrder(orders[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);
  if (error) return <ErrorMessage message={error.message} />;  
 

  return (
    <>
    {orders && <>
       <OrdersWithLoader
        notFound={!isLoading && !orders?.length}
        showLoaders={isLoading && !orders?.length}
        order={order}
      >
        {orders && orders.map((_order: any, index: number) => (
          <OrderCard
            key={index}
            order={_order}
            onClick={() => setOrder(_order)}
            isActive={order?.id === _order?.id}
          />
        ))}
      </OrdersWithLoader>

      <OrderListMobile
        notFound={!isLoading && !orders?.length}
        showLoaders={isLoading && !orders.length}
        order={order}
      >
        {orders.map((_order: any, index: number) => (
          <Collapse.Panel
            header={
              <OrderCard
                key={`mobile_${index}`}
                order={_order}
                onClick={() => setOrder(_order)}
                isActive={order?.id === _order?.id}
              />
            }
            headerClass="accordion-title"
            key={index}
            className="mb-4"
          >
            <OrderDetails order={order} />
          </Collapse.Panel>
        ))}
      </OrderListMobile> 
    </>}
    </>
  );
}
