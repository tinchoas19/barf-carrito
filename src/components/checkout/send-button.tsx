import Button from '@/components/ui/button';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import { checkoutAtom, checkoutNoteAtom } from '@/store/checkout';
import { formatOrderedProduct } from '@/lib/format-ordered-product';
import { useVerifyOrder } from '@/framework/order';
import omit from 'lodash/omit';
import { useCart } from '@/store/quick-cart/cart.context';
import {CreateOrderInput} from './../../types/index'

export const SendButton: React.FC<{disabled?:boolean, label:string, className?: string}> = (
  {disabled, label}, rest) => {

    const [checkout] = useAtom(checkoutAtom);
    const [checkoutNote] = useAtom(checkoutNoteAtom);
    const { items, total, isEmpty } = useCart();


    const { mutate: verifyCheckout, isLoading: loading } = useVerifyOrder();

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
        customer_id : customer.id,
        delivery_type_id: delivery_type.id,
        shipping_address_id: shipping_address.id,
        delivery_day: {delivery_time: delivery_time, pickup_time: pickup_time},
        payment_id: payment_method.id,
        note: note,
        products : items?.map((item:any) => formatOrderedProduct(item))
      } 
      return order
    }

    function handleVerifyCheckout() {
      console.log(formatOrder(checkout))
/*       verifyCheckout({
        amount: total,
        products: items?.map((item:any) => formatOrderedProduct(item)),
        billing_address: {
          ...(billing_address?.address &&
            omit(billing_address.address, ['__typename'])),
        },
        shipping_address: {
          ...(shipping_address?.address &&
            omit(shipping_address.address, ['__typename'])),
        },
      }); */
    }

  return (
    <>
      <Button
        className={classNames('mt-5 w-full')}
        disabled={disabled}
        onClick={handleVerifyCheckout}
        {...rest}
      >
        {label}
      </Button>
    </>
  );
};