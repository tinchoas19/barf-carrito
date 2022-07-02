import NotFound from '@/components/ui/not-found';
import { formatPrice } from '@/lib/use-price';
import { formatAddress } from '@/lib/format-address';
import { useTranslation } from 'next-i18next';
import { OrderItems } from './order-items';
import isEmpty from 'lodash/isEmpty';
//import { useModalAction } from '@/components/ui/modal/modal.context';
//import { SadFaceIcon } from '@/components/icons/sad-face';
//import Badge from '@/components/ui/badge';
import { Order } from '@/framework/types';
//import usePrice from '@/lib/use-price';

interface Props {
  order: Order;
}
/* const RenderStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const { t } = useTranslation('common');

  switch (status.toLowerCase()) {
    case 'approved':
      return (
        <Badge
          text={`${t('text-refund')} ${t('text-approved')}`}
          color="bg-accent"
          className="ltr:mr-4 rtl:ml-4"
        />
      );

    case 'rejected':
      return (
        <Badge
          text={`${t('text-refund')} ${t('text-rejected')}`}
          color="bg-red-500"
          className="ltr:mr-4 rtl:ml-4"
        />
      );
    case 'processing':
      return (
        <Badge
          text={`${t('text-refund')} ${t('text-processing')}`}
          color="bg-yellow-500"
          className="ltr:mr-4 rtl:ml-4"
        />
      );
    // case 'pending':
    default:
      return (
        <Badge
          text={`${t('text-refund')} ${t('text-pending')}`}
          color="bg-purple-500"
          className="ltr:mr-4 rtl:ml-4"
        />
      );
  }
}; */
/* function RefundView({ status, orderId }: { status: string; orderId: string }) {
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();

  return (
    <>
      {status ? (
        <RenderStatusBadge status={status} />
      ) : (
        <button
          className="flex items-center text-sm font-semibold text-body transition-colors hover:text-accent disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:text-gray-400 ltr:mr-4 rtl:ml-4"
          onClick={() => openModal('REFUND_REQUEST', orderId)}
          disabled={Boolean(status)}
        >
          <SadFaceIcon width={18} className="ltr:mr-2 rtl:ml-2" />
          {t('text-ask-refund')}
        </button>
      )}
    </>
  );
} */

const OrderDetails = ({ order }: Props) => {
  const { t } = useTranslation('common');
  const {
    products,
    shipping_address,
    delivery_type,
    payment_method,
    total
  } = order ?? {};

  function f(amount:number) {
    return formatPrice({amount, currencyCode : 'ARS', locale: 'ES'})
  }


  return (
    <div className="flex w-full flex-col border border-border-200 bg-white lg:w-2/3">
      {!isEmpty(order) ? (
        <>


          <div className="flex flex-col border-b border-border-200 sm:flex-row">
            <div className="flex w-full flex-col border-b border-border-200 px-5 py-4 sm:border-b-0 ltr:sm:border-r rtl:sm:border-l md:w-3/5">
            <div className="mb-4">
              <span className="mb-2 block text-sm font-bold text-heading">
                {t('text-delivery-type')}
              </span>
              <span className="text-sm text-body">
                {delivery_type.name}
              </span>
            </div>
              
              {delivery_type.id === '2' && <div className="mb-4">
                <span className="mb-2 block text-sm font-bold text-heading">
                  {t('text-shipping-address')}
                </span>
                <span className="text-sm text-body">
                  {formatAddress(shipping_address)}
                </span>
              </div>}

            <div className="mb-4">
              <span className="mb-2 block text-sm font-bold text-heading">
                {t('text-payment-method')}
              </span>
              <span className="text-sm text-body">
                {payment_method.name}
              </span>
            </div>


            </div>

            <div className="flex w-full flex-col px-5 py-4 md:w-2/5">
              <div className="mb-3 flex justify-between">
                <span className="text-sm text-body">{t('text-sub-total')}</span>
                <span className="text-sm text-heading">{f(total)}</span>
              </div>

              {delivery_type.id === '2' && <div className="mb-3 flex justify-between">
                <span className="text-sm text-body">
                  {t('text-delivery-fee')}
                </span>
                <span className="text-sm text-heading">{parseInt(shipping_address.delivery_fee) > 0 ? f(parseInt(shipping_address.delivery_fee)) : '???'}</span>
              </div>}
              {payment_method.id === '2' &&  <div className="mb-3 flex justify-between">
                <span className="text-sm text-body">{t('text-private-discount')}</span>
                <span className="text-sm text-heading">{f(total / 10)}</span>
              </div>}

              <div className="flex justify-between">
                <span className="text-sm font-bold text-heading">
                  {t('text-total')}
                </span>
                <span className="text-sm font-bold text-heading">{f(
                  total
                  - (payment_method.id === '2' ?( total / 10) : 0)
                  + (delivery_type.id === '2' ? parseInt((shipping_address.delivery_fee ? shipping_address.delivery_fee : 0)) : 0)
                )}</span>
              </div>
            </div>
          </div>

          {/* Order Table */}
          <div>
            <OrderItems products={products} />
          </div>
        </>
      ) : (
        <div className="mx-auto max-w-lg">
          <NotFound text="text-no-order-found" />
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
