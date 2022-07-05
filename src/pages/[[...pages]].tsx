import type { NextPageWithLayout } from '@/types';
import HomeLayout from '@/components/layouts/_home';
import Seo from '@/components/seo/seo';
import { useWindowSize } from '@/lib/use-window-size';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { scroller } from 'react-scroll';
import { getStaticPaths, getStaticProps } from '@/framework/home-pages.ssr';
import { InferGetStaticPropsType } from 'next';
export { getStaticPaths, getStaticProps };
const CartCounterButton = dynamic(
  () => import('@/components/cart/cart-counter-button'),
  { ssr: false }
);
const Classic = dynamic(() => import('@/components/layouts/classic'));


const MAP_LAYOUT_TO_GROUP: Record<string, any> = {
  classic: Classic,
  default: Classic,
};
const Home: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ variables, layout }) => {
  const { query } = useRouter();
  const { width } = useWindowSize();
  // const { layout, page } = useLayout();

  const [redirect, setRedirect] = useState(true)
  const router = useRouter()
  useEffect(() => {
    if(router.asPath === '/' && redirect) {
        setRedirect(false)
        router.push('/#').then(() => {
          
          router.push('/#')
        })
      } 
  },[])

  useEffect(() => {
    if (query.text || query.category) {
      scroller.scrollTo('grid', {
        smooth: true,
        offset: -110,
      });
    }
  }, [query.text, query.category]);

  const Component = MAP_LAYOUT_TO_GROUP[layout];
  return (
    <>
      {/* <Seo title={page?.name} url={page?.slug} images={page?.banners} /> */}
      <Component variables={variables} />
      {!['compact', 'minimal'].includes(layout) && width > 1023 && (
        <CartCounterButton />
      )}
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <HomeLayout layout={page.props.layout}>{page}</HomeLayout>;
};

export default Home;
