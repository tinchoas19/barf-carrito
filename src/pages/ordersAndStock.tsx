import Accordion from '@/components/ui/accordion';
import { data } from '@/framework/static/ordersAndStock';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { getLayout } from '@/components/layouts/layout';
import Seo from '@/components/seo/seo';

export default function OrdersAndStock() {
  const { t } = useTranslation();
  return (
    <>
      <Seo title="Orders" url="ordersAndStock" />
      <section className="py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
        <header className="mb-8 text-center">
          <h1 className="text-xl font-bold md:text-2xl xl:text-3xl">
            {t('common:nav-menu-ordersAndStock')}
          </h1>
        </header>
        <div className="mx-auto w-full max-w-screen-lg">
          <Accordion items={data} translatorNS="ordersAndStock" />
        </div>
      </section>
    </>
  );
}

OrdersAndStock.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'ordersAndStock'])),
    },
  };
};
