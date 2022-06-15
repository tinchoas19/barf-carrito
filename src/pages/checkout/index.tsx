import { useTranslation } from 'next-i18next';
import { shippingAddressAtom, deliveryTypeAtom, customerAtom } from '@/store/checkout';
import dynamic from 'next/dynamic';
import { getLayout } from '@/components/layouts/layout';
import { AddressType } from '@/framework/utils/constants';
import Seo from '@/components/seo/seo';
import { useUser } from '@/framework/user';
import { useEffect } from 'react';
import { useSettings } from '@/framework/settings';
import { useAtom } from 'jotai';
export { getStaticProps } from '@/framework/general.ssr';

const ScheduleGrid = dynamic(
  () => import('@/components/checkout/schedule/schedule-grid')
);
const AddressGrid = dynamic(
  () => import('@/components/checkout/address-grid'),
  { ssr: false }
);
/*  const ContactGrid = dynamic(
  () => import('@/components/checkout/contact/contact-grid')
);  */
const InputGrid = dynamic(
  () => import('@/components/checkout/contact/input-grid')
);
const RightSideView = dynamic(
  () => import('@/components/checkout/right-side-view'),
  { ssr: false }
);
const CheckboxGrid = dynamic(
  () => import('@/components/checkout/checkbox/checkbox-grid')
)

export default function CheckoutPage() {
  const { t } = useTranslation();
  const { me } = useUser();
  const { id, address, contact} = me ?? {};
  const {settings: { pickupAddress}} = useSettings()
  const [delivery_type, set_delivery_type] = useAtom(deliveryTypeAtom)
  const [customer, setCustomer] = useAtom(customerAtom)
  
  useEffect(() => {
    setCustomer(me)
  },[])

  function handleDeliveryType(data:any) {
    set_delivery_type(data)
  } 
  return (
    <>
      <Seo noindex={true} nofollow={true} />
      <div className="px-4 py-8 bg-gray-100 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
        <div className="flex flex-col items-center w-full max-w-5xl m-auto rtl:space-x-reverse lg:flex-row lg:items-start lg:space-x-8">
          <div className="w-full space-y-6 lg:max-w-2xl">
            <InputGrid
              className="p-5 bg-light shadow-700 md:p-8"
              contact={contact}
              label={t('text-contact-number')}
              count={1}
              type='contact'
            />
            <CheckboxGrid
            className="p-5 bg-light shadow-700 md:p-8"
            label={t('text-delivery-method')}
            isWithdrawal={true}
            data={[]}
            count={2}
            callback={handleDeliveryType}
            type='withdral'
            />
            {delivery_type?.title === '' &&
            <>
            <InputGrid
            className="p-5 bg-light shadow-700 md:p-8"
            data={[t('text-select-withdrawal-option')]}
            label={t('text-address')}
            count={3}
            type='data'
            isDisabled={true}
          />
          <InputGrid
            className="p-5 bg-light shadow-700 md:p-8"
            data={[t('text-select-withdrawal-option')]}
            label={t('text-schedule')}
            count={4}
            type='data'
            isDisabled={true}
          />
            </>
            }
            {delivery_type?.title === 'Envio' && 
            <>
              <AddressGrid
              userId={id!}
              className="p-5 bg-light shadow-700 md:p-8"
              label={t('text-shipping-address')}
              count={3}
              //@ts-ignore
              addresses={address}
              atom={shippingAddressAtom}
              type={AddressType.Billing}
                />
                <ScheduleGrid
              className="p-5 bg-light shadow-700 md:p-8"
              label={t('text-delivery-schedule')}
              count={4}
              />
            </>
            }
            {delivery_type?.title === 'Retiro' &&
            <>
            <InputGrid
            className="p-5 bg-light shadow-700 md:p-8"
            data={pickupAddress}
            label={t('text-retirement-address')}
            count={3}
            type='data'
          />
          <ScheduleGrid
              className="p-5 bg-light shadow-700 md:p-8"
              label={t('text-pickup-schedule')}
              count={4}
              isPickup={true}
              />
            </>
            }

          </div>
          <div className="w-full mt-10 mb-10 sm:mb-12 lg:mb-0 lg:w-96">
            <RightSideView />
          </div>
        </div>
      </div>
    </>
  );
}
CheckoutPage.authenticationRequired = true;
CheckoutPage.getLayout = getLayout;
