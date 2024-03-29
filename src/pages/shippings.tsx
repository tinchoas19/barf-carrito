import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { getLayout } from '@/components/layouts/layout';
import Seo from '@/components/seo/seo';
import ShippingsSlider from '@/components/promotions/shippings-slider';
import {Element } from 'react-scroll';
import { shippings } from '@/framework/static/shippings';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ROUTES } from '@/lib/routes';

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(' ').join('_');
}



export default function ShippingsPage() {
  const { t } = useTranslation('shippings');
  
  const [showSlider, setShowSlider] = useState(true)
  const router = useRouter()

  useEffect(() => {
    return () => {
      setShowSlider(false)
      router.reload()
    }
  }) 
 
  return (
    <>
      <Seo title="Shippings" url="shippings" />

      <section className="py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
        <header className="mb-8 text-center">
          <h1 className="text-xl font-bold md:text-2xl xl:text-3xl">
            {t('common:nav-menu-shippings')}
          </h1>
        </header>
        <div className="mx-auto w-full max-w-screen-lg">
           {showSlider && <ShippingsSlider/>}
        </div>
      </section>
      <section className='flex justify-center pb-8 px-4 lg:pb-10 lg:px-8 xl:pb-14 xl:px-16 2xl:px-20'>
      <div className="flex-row md:max-w-[1000px] align-center">
            {shippings?.map((item) => (
              <Element
                key={item.title}
                name={makeTitleToDOMId(item.title)}
                className="mb-10"
              >
                {item.title !== '' && <h2 className="mb-4 text-lg font-bold text-heading md:text-xl lg:text-2xl">
                  {t(item.title)}
                </h2>}
                <div
                  className="leading-loose text-body-dark"
                  dangerouslySetInnerHTML={{ __html: t(item.content)}}
                />
              </Element>
            ))}
          </div>
      </section>
      
    </>
  );
}

ShippingsPage.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'shippings'])),
    },
  };
};
