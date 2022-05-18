import NotFound from '@/components/ui/not-found';
import usePrice from '@/lib/use-price';
import { formatAddress } from '@/lib/format-address';
import OrderStatuses from '@/components/orders/statuses';
import { useTranslation } from 'next-i18next';
import Link from '@/components/ui/link';
import { ROUTES } from '@/lib/routes';
import { Eye } from '@/components/icons/eye-icon';
import { OrderItems } from './order-items';
import isEmpty from 'lodash/isEmpty';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { SadFaceIcon } from '@/components/icons/sad-face';
import Badge from '@/components/ui/badge';
import { Order } from '@/framework/types';

interface Props {
  order: Order;
}
const RenderStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const { t } = useTranslation('common');

  switch (status.toLowerCase()) {
    case 'approved':
      return (
        <Badge
          text={`${t('text-approved')}`}
          color="bg-accent"
          className="ltr:mr-4 rtl:ml-4"
        />
      );

    case 'rejected':
      return (
        <Badge
          text={` ${t('text-rejected')}`}
          color="bg-red-500"
          className="ltr:mr-4 rtl:ml-4"
        />
      );
    case 'processing':
      return (
        <Badge
          text={`${t('text-processing')}`}
          color="bg-yellow-500"
          className="ltr:mr-4 rtl:ml-4"
        />
      );
    // case 'pending':
    default:
      return (
        <Badge
          text={`${t('text-pending')}`}
          color="bg-purple-500"
          className="ltr:mr-4 rtl:ml-4"
        />
      );
  }
};


const OrderDetails = ({ order }: Props) => {
  const { t } = useTranslation('common');
  const {
    id,
    products,
    status,
    shipping_address,
    discount,
    cash,
    paid_order,
  } = order ?? {};
  const { price: discount_parcial } = usePrice({
    amount: ((order?.discount * order?.paid_order) / 100),
  });

  const { price: total } = usePrice({
    amount: order?.total,
  });
  const { price: delivery_fee } = usePrice({
    amount: order?.delivery_fee,
  });
  const { price: paid_order_2 } = usePrice({
    amount: order?.paid_order,
  });

  return (
    <div className="flex w-full flex-col border border-border-200 bg-white lg:w-2/3">
      {!isEmpty(order) ? (
        <>


          <div className="flex flex-col border-b border-border-200 sm:flex-row">
            <div className="flex w-full flex-col border-b border-border-200 px-5 py-4 sm:border-b-0 ltr:sm:border-r rtl:sm:border-l md:w-3/5">
              <div className="mb-4">
                <span className="mb-2 block text-sm font-bold text-heading">
                  {t('text-shipping-address')}
                </span>

                <span className="text-sm text-body">
                  {formatAddress(shipping_address)}
                </span>
              </div>


            </div>

            <div className="flex w-full flex-col px-5 py-4 md:w-2/5">
              <div className="mb-3 flex justify-between">
                <span className="text-sm text-body">{t('text-sub-total')}</span>
                <span className="text-sm text-heading">{paid_order_2}</span>
              </div>

              <div className="mb-3 flex justify-between">
                <span className="text-sm text-body">{t('text-discount')}</span>
                <span className="text-sm text-heading">{discount_parcial}</span>
              </div>

              <div className="mb-3 flex justify-between">
                <span className="text-sm text-body">
                  {t('text-delivery-fee')}
                </span>
                <span className="text-sm text-heading">{delivery_fee}</span>
              </div>
              <div className="mb-3 flex justify-between">
                <span className="text-sm text-body">{t('text-private-discount')}</span>
                <span className="text-sm text-heading">{cash}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm font-bold text-heading">
                  {t('text-total')}
                </span>
                <span className="text-sm font-bold text-heading">{total}</span>
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
