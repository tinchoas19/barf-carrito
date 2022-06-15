import Button from '@/components/ui/button';
import Input from '@/components/ui/forms/input';
import Label from '@/components/ui/forms/label';
import Radio from '@/components/ui/forms/radio/radio';
import TextArea from '@/components/ui/forms/text-area';
import { useTranslation } from 'next-i18next';
import * as yup from 'yup';
import { useModalState } from '@/components/ui/modal/modal.context';
import { Form } from '@/components/ui/forms/form';
import { AddressType } from '@/framework/utils/constants';
import { useUpdateUser, useUser } from '@/framework/user';
import DropDownInput from '../ui/forms/dropdown/dropdown-input';
import { useEffect, useState } from 'react';
import { string } from 'yup/lib/locale';
import { useSettings } from '@/framework/settings';


type FormValues = {
  //title: string;
  //type: AddressType;
  address: {
    // country: string;
    cityid: string;
    //state: string;
    // zip: string;
    zone: string;
    street_address: string;
    street_number: number;
    bell?: string;
    note: string;
    wtd: string;
    wtd_note: string;
  };
};

const addressSchema = yup.object().shape({
  //type: yup
  //  .string()
  //  .oneOf([AddressType.Billing, AddressType.Shipping])
 //  .required('error-type-required'),
  //title: yup.string().required('error-title-required'),
  address: yup.object().shape({
    //country: yup.string().required('error-country-required'),
    cityid: yup.string().required('error-city-required'),
    //state: yup.string().required('error-state-required'),
    //zip: yup.string().required('error-zip-required'),
    zone: yup.string().required('error-zone-required'),
    street_address: yup.string().required('error-street-required'),
    street_number: yup.string().required('error-number-required'),
    wtd: yup.string().required('error-wtd-required'),
    wtd_note: yup.string().required('error-wtd-extra-required'),
  }), 
});

export const AddressForm: React.FC<any> = ({
  onSubmit,
  defaultValues,
  isLoading,
}) => {
  const { t } = useTranslation('common');

  const {settings: { zones, cities, wtd }} = useSettings()

  const [selectedZone, setSelectedZone] = useState('')
  const [citiesToShow, setCitiesToShow] = useState([])

  function getZoneId(name:string) {
    const finalZone = zones.find(zone => zone.name === name)
    return finalZone?.id
  }
  
  useEffect(() => {
    const listOfCities = cities.filter(city => { return city.zoneid === getZoneId(selectedZone)})
    setCitiesToShow(listOfCities)
  },[selectedZone])


  return (
    <Form<FormValues>
      onSubmit={onSubmit}
      className="grid h-full grid-cols-2 gap-5"
      //@ts-ignore
      validationSchema={addressSchema}
      useFormProps={{
        shouldUnregister: true,
        defaultValues,
      }}
      resetValues={defaultValues}
    >
      {({ register, formState: { errors } }) => (
        <>
          {/* <div>
            <Label>{t('text-type')}</Label>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Radio
                id="billing"
                {...register('type')}
                type="radio"
                value={AddressType.Billing}
                label={t('text-billing')}
              />
              <Radio
                id="shipping"
                {...register('type')}
                type="radio"
                value={AddressType.Shipping}
                label={t('text-shipping')}
              />
            </div>
          </div> */}
          <Input
            label={t('text-address')}
            {...register('address.street_address')}
            error={t(errors.address?.street_address?.message!)}
            variant="outline"
          />
          <Input
            label={t('text-address-number')}
            {...register('address.street_number')}
            error={t(errors.address?.street_number?.message!)}
            variant="outline"
            type='number'
          />

          {/* <Input
            label={t('text-address-zone')}
            {...register('title')}
            error={t(errors.title?.message!)}
            variant="outline"
            className="col-span-2"
          /> 

          <Input
            label={t('text-address-location')}
            {...register('address.state')}
            error={t(errors.address?.state?.message!)}
            variant="outline"
          /> */}

          <DropDownInput
            label={t('text-address-zone')}
            {...register('address.zone')}
            error={t(errors.address?.zone?.message!)}
            variant="outline"
            className="col-span-2"
            options={(zones.map((zone) => {return zone.name}))}
            isParent={true}
            onChange={setSelectedZone}
          />

          <DropDownInput
            label={t('text-address-location')}
            {...register('address.cityid')}
            error={t(errors.address?.cityid?.message!)}
            variant="outline"
            options={citiesToShow}
            disabled={!citiesToShow.length || selectedZone === ''}
          /> 

          <Input
            label={t('text-address-bell')}
            {...register('address.bell')}
            error={t(errors.address?.bell?.message!)}
            variant="outline"
          />


          <TextArea
            label={t('text-address-note')}
            {...register('address.note')}
            error={t(errors.address?.note?.message!)}
            variant="outline"
            className="col-span-2"
          />

          <DropDownInput
            label={t('text-address-wtd')}
            {...register('address.wtd')}
            error={t(errors.address?.wtd?.message!)}
            variant="outline"
            className="col-span-2"
            options={wtd}
          /> 

          <TextArea
            label={t('text-address-wtd-extra')}
            {...register('address.wtd_note')}
            error={t(errors.address?.wtd_note?.message!)}
            variant="outline"
            className="col-span-2"
          />

          <Button
            className="col-span-2 w-full"
            loading={isLoading}
            disabled={isLoading}
          >
            {Boolean(defaultValues) ? t('text-update') : t('text-save')}{' '}
            {t('text-address')}
          </Button>
        </>
      )}
    </Form>
  );
};

export default function CreateOrUpdateAddressForm() {
  const { t } = useTranslation('common');
  const {
    data: { customerId, address, type },
  } = useModalState();
  const { mutate: updateProfile } = useUpdateUser();
  const { me } = useUser();

  function onSubmit(values: FormValues) {
    const payload = {...me}
    values.address && payload.address.push(values.address)
    console.log(payload)
/*     const formattedInput = {
      //id: address?.id,
      // customer_id: customerId,
      //title: values.title,
      //type: values.type,
      address: {
        ...values.address
      },
    };*/
    updateProfile(payload); 
  }
  return (
    <div className="min-h-screen bg-light p-5 sm:p-8 md:min-h-0 md:rounded-xl">
      <h1 className="mb-4 text-center text-lg font-semibold text-heading sm:mb-6">
        {address ? t('text-update') : t('text-add-new-a')} {t('text-address')}
      </h1>
      <AddressForm
        onSubmit={onSubmit}
        defaultValues={{
          address: {
            ...address?.address,
          },
        }}
      />
    </div>
  );
}
