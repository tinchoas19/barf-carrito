import { termsAndServices } from '@/framework/static/terms';
import { Link, Element } from 'react-scroll';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { getLayout } from '@/components/layouts/layout';
import Seo from '@/components/seo/seo';
import { useSettings } from '@/framework/settings';

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(' ').join('_');
}

export default function GuidePage() {
  const { t } = useTranslation('terms');
  const {settings} = useSettings()

  return (
    <>
      <Seo title="Guide" url="guide" />
      <section className="py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
        <header className="mb-8 text-center">
          <h1 className="text-xl font-bold md:text-2xl xl:text-3xl">
            {t('nav-menu-guide')}
          </h1>
        </header>
      </section>
      <section className='flex justify-center pb-8 px-4 lg:pb-10 lg:px-8 xl:pb-14 xl:px-16 2xl:px-20'>
        <div className="flex-row md:max-w-[1000px] align-center">
            {settings.guideContent?.map((item) => (
              <Element
                key={item.title}
                name={makeTitleToDOMId(item.title)}
                className="mb-10"
              >
                <h2 className="mb-4 text-lg font-bold text-heading md:text-xl lg:text-2xl">
                  {t(item.title)}
                </h2>
                <div
                  className="leading-loose text-body-dark"
                  dangerouslySetInnerHTML={{ __html: t(item.content) }}
                />
              </Element>
            ))}
          </div>
        </section>
    </>
  );
}

GuidePage.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'guide'])),
    },
  };
};
