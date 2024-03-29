import ProfileAddressGrid from '@/components/profile/profile-address';
import Card from '@/components/ui/cards/card';
import { useTranslation } from 'next-i18next';
import ProfileForm from '@/components/profile/profile-form';
import Seo from '@/components/seo/seo';
import { useUser } from '@/framework/user';
import DashboardLayout from '@/layouts/_dashboard';
import { useEffect } from 'react';
export { getStaticProps } from '@/framework/general.ssr';


const ProfilePage = () => {
  const { t } = useTranslation('common');
  const { me , refetch} = useUser();

  useEffect(() => {
    refetch()
  },[])

  if (!me) return null;
  return (
    <>
      <Seo noindex={true} nofollow={true} />
      <div className="w-full px-1 pb-1 overflow-hidden">
        <div className="mb-8">
          <ProfileForm user={me} />

        </div>

        <Card className="w-full">
          <ProfileAddressGrid
            userId={me.id}
            //@ts-ignore
            type="profile"
            addresses={me.address}
            label={t('text-addresses')}
          />
        </Card>
      </div>
    </>
  );
};

ProfilePage.authenticationRequired = true;

ProfilePage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default ProfilePage;
