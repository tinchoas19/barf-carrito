import Button from '@/components/ui/button';
import Card from '@/components/ui/cards/card';
import Input from '@/components/ui/forms/input';
import { useTranslation } from 'next-i18next';
import pick from 'lodash/pick';
import { Form } from '@/components/ui/forms/form';
import { useUpdateUser } from '@/framework/user';
import type { UpdateUserInput, User } from '@/types';
import * as yup from 'yup';
import Checkbox from '../ui/forms/checkbox/checkbox';
import { useState } from 'react';

const profileFormSchema = yup.object().shape({
  name: yup.string().required('error-name-required'),
  surname: yup.string().required('error-surname-required'),
  email: yup
    .string()
    .email('error-email-format')
    .required('error-email-required'),
  contact: yup.string().test('len','error-contact-required', val => val?.length === 10) ,
});

const ProfileForm = ({ user }: { user: User }) => {
  const { t } = useTranslation('common');
  const { mutate: updateProfile, isLoading } = useUpdateUser();

  function onSubmit(values: UpdateUserInput) {
    
    if (!user) {
      return false;
    }
    updateProfile({
      id: user.id,
      name: values.name,
      surname: values.surname,
      contact: values.contact,
      email: values.email,
      address: user.address
    });
  }
  
  const [canEditEmail, setCanEditEmail] = useState(false)
  function handleEmailCheckbox(value:boolean) {
    setCanEditEmail(value)
  }

  return (
    <Form<UpdateUserInput>
      onSubmit={onSubmit}
      validationSchema={profileFormSchema}
      useFormProps={{
        ...(user && {
          defaultValues: pick(user, ['name', 'surname', 'contact', 'email']),
        }),
      }}
    >
      {({ register, formState: { errors }}) => (
        <>
          <div className="mb-8 flex">
            <Card className="w-full">

              <div className="mb-6 flex flex-row">
                <Input
                  className="flex-1"
                  label={t('text-name')}
                  {...register('name')}
                  variant="outline"
                  error={t(errors.name?.message!)}
                />
              </div>
              <div className="mb-6 flex flex-row">
                <Input
                  className="flex-1"
                  label={t('text-surname')}
                  {...register('surname')}
                  variant="outline"
                  error={t(errors.surname?.message!)}
                />
              </div>
              <div className="mb-6 flex flex-row">
                <Input
                  type='number'
                  min='0'
                  className="flex-1"
                  label={t('text-contact-number')}
                  {...register('contact')}
                  variant="outline"
                  example='1122223333'
                  error={t(errors.contact?.message!)}
                />
              </div>
              <div className="mb-6 flex flex-row">
              <Checkbox 
              name={'profile-email'}
              label={t('text-email-checkbox')}
              callback={handleEmailCheckbox}
              ></Checkbox>
              </div>
              <div className="mb-6 flex flex-row">
              <Input
                  disabled={!canEditEmail}
                  className="flex-1"
                  label={t('text-email')}
                  {...register('email')}
                  variant="outline"
                  error={t(errors.email?.message!)}
                />
              </div>



              <div className="flex">
                <Button
                  className="ltr:ml-auto rtl:mr-auto"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {t('text-save')}
                </Button>
              </div>
            </Card>
          </div>
        </>
      )}
    </Form>
  );
};

export default ProfileForm;
