import { formatOrderedProduct } from '@/lib/format-ordered-product';
import { useAtom } from 'jotai';
import { billingAddressAtom, shippingAddressAtom } from '@/store/checkout';
import Button from '@/components/ui/button';
import { useCart } from '@/store/quick-cart/cart.context';
import classNames from 'classnames';
import { useVerifyOrder } from '@/framework/order';
import omit from 'lodash/omit';



export const SendButton: React.FC<{callback:Function, disabled?:boolean, label:string}> = (
  {callback, disabled, label}) => {
  return (
    <>
      <Button
        className={classNames('mt-5 w-full')}
        onClick={() => callback()}
        disabled={disabled}
      >{label}</Button>
    </>
  );
};