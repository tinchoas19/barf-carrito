import { useTranslation } from 'next-i18next';
import { useModalState } from '@/components/ui/modal/modal.context';

import { useUpdateUser } from '@/framework/user';

const ProfileAddOrUpdateContact = () => {
  const { t } = useTranslation('common');
  const {
    data: { customerId, contact, profileId },
  } = useModalState();
  const { mutate: updateProfile } = useUpdateUser();

  function onContactUpdate({ phone_number }: { phone_number: string }) {
    if (!customerId) {
      return false;
    }
    updateProfile({
      id: customerId,

    });
  }

  return (
    <div className="flex flex-col justify-center min-h-screen p-5 bg-light sm:p-8 md:min-h-0 md:rounded-xl">
      <h1 className="mb-5 text-sm font-semibold text-center text-heading sm:mb-6">
        {contact ? t('text-update') : t('text-add-new')}{' '}
        {t('text-contact-number')}
      </h1>

    </div>
  );
};

export default ProfileAddOrUpdateContact;
