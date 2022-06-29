import { useCart } from '@/store/quick-cart/cart.context';
import { useTranslation } from 'next-i18next';
import ItemCard from './item-card';
import EmptyCartIcon from '@/components/icons/empty-cart';
import usePrice, { formatPrice } from '@/lib/use-price';
import { ItemInfoRow } from './item-info-row';
import PaymentGrid from '../payment/payment-grid';
import InputGrid from '../contact/input-grid';
import { SendButton } from '../send-button';
import { useSettings } from '@/framework/settings';
import { useEffect, useState } from 'react';
import NoteGrid from '../note-grid/note-grid';
import { paymentMethodAtom, deliveryTypeAtom , shippingAddressAtom} from '@/store/checkout';
import { useAtom } from 'jotai';

const UnverifiedItemList = ({ hideTitle = false }: { hideTitle?: boolean }) => {
  const { t } = useTranslation('common');
  const { items, total, isEmpty } = useCart();
  const { settings: {bankData}}  = useSettings()
  const { price: subtotal, amount } = usePrice(
    items && {
      amount: total,
    }
  );

  const [deliveryType] = useAtom(deliveryTypeAtom)
  const [paymentMethod] = useAtom(paymentMethodAtom)
  const [shippingAddress] = useAtom(shippingAddressAtom)

  const [totalPrice, setTotalPrice] = useState(null)

  const [selectedPayment, setSelectedPayment] = useState('')
  function getPaymentValue(value:any) {
    setSelectedPayment(value)
  }

  function fNum(num:number) {
    return formatPrice({amount : num, currencyCode: 'ARS', locale: 'es'})
  }

  function getTotal() {
    if (deliveryType.id === 0 || !paymentMethod || (deliveryType.id === 2 && !shippingAddress)) {
      return null
    }
    // retiro
    let result = amount
    // es pago en efectivo
    if (paymentMethod.id === 2) {
      result = (result / 10) * 9
    }
    // es envio
    if (deliveryType.id === 2) {
      result = result + parseInt(shippingAddress.delivery_fee)
    }
    return result
  }

  useEffect(() => {
    setTotalPrice(getTotal())
  },[deliveryType, paymentMethod, shippingAddress])



  return (
    <div className="w-full">
       <PaymentGrid getValue={getPaymentValue} />
       {selectedPayment === 'STRIPE' && 
       bankData.map(bData => <InputGrid
       key={bData[0]}
       className="p-5 bg-light shadow-700 md:p-8 mb-5"
       label={bData[0]}
       type='data'
       count={null}
       data={bData.slice(1)}
       />)
        
      }
      {!hideTitle && (
        <div className="flex flex-col items-center mb-4 space-x-4 rtl:space-x-reverse">
          <span className="text-base font-bold text-heading">
            {t('text-your-order')}
          </span>
        </div>
      )}
      <div className="flex flex-col py-3 border-b border-border-200">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full mb-4">
            <EmptyCartIcon width={140} height={176} />
            <h4 className="mt-6 text-base font-semibold">
              {t('text-no-products')}
            </h4>
          </div>
        ) : (
          items?.map((item) => <ItemCard item={item} key={item.id} />)
        )}
      </div>
       
      <div className="mt-4 space-y-2">
        <ItemInfoRow title={t('text-sub-total')} value={subtotal} />
        {/* DESCUENTO */}
        {paymentMethod?.id === 2 && <ItemInfoRow
          title={t('text-discount-cash')}
          value={fNum((amount /10) * 9)}
        />}
        {/* ENVIO */}
        {deliveryType?.id === 2 && <ItemInfoRow
          title={t('text-estimated-shipping')}
          value={shippingAddress ? fNum(shippingAddress.delivery_fee) : t('text-calculated-checkout')}
        />}
        <ItemInfoRow
          title={t('text-total')}
          value={totalPrice ? fNum(totalPrice) : t('text-calculated-checkout')}
          bold={true}
        />
        
      </div>
      
      <NoteGrid className="pt-5" />
      <SendButton label={t('text-send-button')} getTotal={() => getTotal()}/>
    </div>
  );
};
export default UnverifiedItemList;
