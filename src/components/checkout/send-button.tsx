/* eslint-disable react-hooks/rules-of-hooks */
import Button from '@/components/ui/button';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import { checkoutAtom } from '@/store/checkout';
import { formatOrderedProduct } from '@/lib/format-ordered-product';
import { useCart } from '@/store/quick-cart/cart.context';
import {CreateOrderInput} from './../../types/index'
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { useCreateOrder } from '@/framework/order';
import { useState } from 'react';

export const SendButton: React.FC<{disabled?:boolean, label:string, className?: string, getTotal:Function}> = (
  {disabled, label, getTotal}, rest) => {
    const { t } = useTranslation('common');
    const [checkout] = useAtom(checkoutAtom);
    const { items,  isEmpty } = useCart();
    const {createOrder, isLoading} = useCreateOrder()
    const [endTransaction, setEndTransaction] = useState(false)

    function formatOrder(checkout:any) {
      const {
        customer, 
        delivery_type, 
        delivery_time,
        pickup_time,
        payment_method,
        shipping_address,
        note
       } = checkout
      const order : CreateOrderInput = {
        customer_id : customer?.id || null,
        delivery_type_id: delivery_type.id || null,
        shipping_address_id: shipping_address?.id || null,
        delivery_day: {delivery_time: delivery_time || null, pickup_time: pickup_time || null}  || null,
        payment_id: payment_method?.id  || null,
        note: note || null,
        delivery_fee: shipping_address ? parseInt(shipping_address.delivery_fee) : 0,
        products : items?.map((item:any) => formatOrderedProduct(item))  || null,
        total_price : getTotal()
      } 
      return order
    }

    function validateOrder(order:CreateOrderInput) {
      const {
        customer_id, 
        delivery_type_id, 
        shipping_address_id,
        delivery_day,
        payment_id,
        delivery_fee,
        note,
        products,
        total_price
       } = order
       // campos obligatorios
      if (
        !customer_id || 
        !delivery_type_id ||
        !payment_id ||
        products.length === 0 ||
        !total_price ||
        isEmpty
        ) return false
        // retiro
      if (delivery_type_id === 1) {
        if (!delivery_day.pickup_time) return false
      } 
      // envio
      else if (delivery_type_id === 2) {
        if (!shipping_address_id) return false
        if (!delivery_day.delivery_time) return false
      }
      return true
    }

    function handleVerifyCheckout() {
      const order:CreateOrderInput = formatOrder(checkout)
      const result:boolean = validateOrder(order)
      if (result) {
       setEndTransaction(true)
       createOrder(order)
     } else {
       toast.error(t('send-order-error-uncomplete'));
     }
    }

  return (
    <>
      <Button
        className={classNames('mt-5 w-full')}
        disabled={disabled || endTransaction}
        onClick={handleVerifyCheckout}
        isLoading={isLoading || endTransaction}
        {...rest}
      >
        {label}
      </Button>
    </>
  );
};