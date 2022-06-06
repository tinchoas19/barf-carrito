import Button from '@/components/ui/button';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import { checkoutAtom, checkoutNoteAtom } from '@/store/checkout';
import { formatOrderedProduct } from '@/lib/format-ordered-product';
import { useVerifyOrder } from '@/framework/order';
import omit from 'lodash/omit';
import { useCart } from '@/store/quick-cart/cart.context';

export const SendButton: React.FC<{callback:Function, disabled?:boolean, label:string, className?: string}> = (
  {callback, disabled, label}, rest) => {

    const [checkout] = useAtom(checkoutAtom);
    const [checkoutNote] = useAtom(checkoutNoteAtom);
    const { items, total, isEmpty } = useCart();


    const { mutate: verifyCheckout, isLoading: loading } = useVerifyOrder();

    function handleVerifyCheckout() {
      console.log(checkout)
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