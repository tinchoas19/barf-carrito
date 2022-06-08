import { useCart } from '@/store/quick-cart/cart.context';
import { useTranslation } from 'next-i18next';
import ItemCard from './item-card';
import EmptyCartIcon from '@/components/icons/empty-cart';
import usePrice from '@/lib/use-price';
import { ItemInfoRow } from './item-info-row';
import { CheckAvailabilityAction } from '@/components/checkout/check-availability-action';
import PaymentGrid from '../payment/payment-grid';
import InputGrid from '../contact/input-grid';
import { SendButton } from '../send-button';
import { useSettings } from '@/framework/settings';
import { useState } from 'react';
import NoteGrid from '../note-grid/note-grid';

const UnverifiedItemList = ({ hideTitle = false }: { hideTitle?: boolean }) => {
  const { t } = useTranslation('common');
  const { items, total, isEmpty } = useCart();
  const { settings: {bankData}}  = useSettings()
  const { price: subtotal } = usePrice(
    items && {
      amount: total,
    }
  );

  const [selectedPayment, setSelectedPayment] = useState('')
  function getPaymentValue(value:any) {
    setSelectedPayment(value)
  }

  return (
    <div className="w-full">
       <PaymentGrid getValue={getPaymentValue} />
       {selectedPayment === 'STRIPE' && 
        <InputGrid
        className="p-5 bg-light shadow-700 md:p-8 mb-5"
        label={'Datos Bancarios'}
        type='data'
        count={null}
        data={bankData}
        />
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
        <ItemInfoRow
          title={t('text-tax')}
          value={t('text-calculated-checkout')}
        />
        <ItemInfoRow
          title={t('text-estimated-shipping')}
          value={t('text-calculated-checkout')}
        />
      </div>
      
      <NoteGrid className="pt-5" />
      <SendButton label={t('text-send-button')}/>
    </div>
  );
};
export default UnverifiedItemList;
