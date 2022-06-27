import Accordion from '@/components/ui/accordion';
import { faq } from '@/framework/static/faq';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { getLayout } from '@/components/layouts/layout';
import Seo from '@/components/seo/seo';
import { ROUTES } from '@/lib/routes';

export default function HelpPage() {
  const { t } = useTranslation();
  return (
    <>
      <Seo title="Help" url="help" />
      <section className='mt-4'>
       <header className="mb-8 text-center">
          <h1 className="text-xl font-bold md:text-2xl xl:text-3xl">
            {t('common:nav-menu-others-faq')}
          </h1>
        </header> 
        <div className="mx-auto w-full max-w-screen-lg text-center">
        <a style={{textDecoration: 'underline'}} href={ROUTES.ORDERS_AND_STOCK}>{t('text-go-to-section')+t('nav-menu-ordersAndStock')}</a>
        </div>
        <div className="mx-auto w-full max-w-screen-lg text-center">
        <a style={{textDecoration: 'underline'}} href={ROUTES.GUIDE}>{t('text-go-to-section')+t('nav-menu-guide')}</a>
        </div>
        <div className="mx-auto w-full max-w-screen-lg text-center">
        <a style={{textDecoration: 'underline'}} href={ROUTES.SHIPPINGS}>{t('text-go-to-section')+t('nav-menu-shippings')}</a>
        </div>
      </section>
      <section className="py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
        <header className="mb-8 text-center">
          <h1 className="text-xl font-bold md:text-2xl xl:text-3xl">
            {t('common:nav-menu-faq')}
          </h1>
        </header>
        <div className="mx-auto w-full max-w-screen-lg">
          <Accordion items={faq} translatorNS="faq" />
        </div>
      </section>
    </>
  );
}

HelpPage.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'faq'])),
    },
  };
};
