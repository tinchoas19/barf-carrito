import Button from '@/components/ui/button';
import Card from '@/components/ui/cards/card';
import Input from '@/components/ui/forms/input';
import { useTranslation } from 'next-i18next';
import pick from 'lodash/pick';
import { Form } from '@/components/ui/forms/form';
import { useUpdateUser } from '@/framework/user';
import type { UpdateUserInput, User } from '@/types';

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
    });
  }

  return (
    <Form<UpdateUserInput>
      onSubmit={onSubmit}
      useFormProps={{
        ...(user && {
          defaultValues: pick(user, ['name', 'surname', 'contact', 'email']),
        }),
      }}
    >
      {({ register, control }) => (
        <>
          <div className="mb-8 flex">
            <Card className="w-full">

              <div className="mb-6 flex flex-row">
                <Input
                  className="flex-1"
                  label={t('text-name')}
                  {...register('name')}
                  variant="outline"
                />
              </div>
              <div className="mb-6 flex flex-row">
                <Input
                  className="flex-1"
                  label={t('text-surname')}
                  {...register('surname')}
                  variant="outline"
                />
              </div>
              <div className="mb-6 flex flex-row">
                <Input
                  className="flex-1"
                  label={t('text-contact-number')}
                  {...register('contact')}
                  variant="outline"
                />
              </div>
              <div className="mb-6 flex flex-row">
              <Input
                  className="flex-1"
                  label={t('text-email')}
                  {...register('email')}
                  variant="outline"
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
