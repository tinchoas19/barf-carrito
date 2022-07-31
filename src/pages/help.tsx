import Accordion from '@/components/ui/accordion';
import { faq } from '@/framework/static/faq';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { getLayout } from '@/components/layouts/layout';
import Seo from '@/components/seo/seo';
import { ROUTES } from '@/lib/routes';
import { formatPrice } from '@/lib/use-price';

export default function HelpPage() {
  const { t } = useTranslation();
  return (
    <>
      <Seo title="Help" url="help" />
      <section className="pt-8 px-4 lg:pt-10 lg:px-8 xl:pt-14 xl:px-16 2xl:px-20">
       <header className="mb-8 text-center">
          <h1 className="text-xl font-bold md:text-2xl xl:text-3xl">
            {t('common:nav-menu-others-faq')}
          </h1>
        </header> 
        <div className='text-xl'>
        <p className="mx-auto w-full max-w-screen-lg text-center">
        <a style={{textDecoration: 'underline'}} className='hover:opacity-80' href={ROUTES.ORDERS_AND_STOCK}>{t('nav-menu-ordersAndStock')}</a>
        </p>
        <p className="mx-auto w-full max-w-screen-lg text-center">
        <a style={{textDecoration: 'underline'}} className='hover:opacity-80' href={ROUTES.GUIDE}>{t('nav-menu-guide')}</a>
        </p>
        <p className="mx-auto w-full max-w-screen-lg text-center">
        <a style={{textDecoration: 'underline'}} className='hover:opacity-80' href={ROUTES.SHIPPINGS}>{t('nav-menu-shippings')}</a>
        </p>
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
