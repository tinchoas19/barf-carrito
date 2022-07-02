import BackButton from '@/components/ui/back-button';
import { AddToCart } from '@/components/products/add-to-cart/add-to-cart';
import { formatPrice }  from '@/lib/use-price';
import { ThumbsCarousel } from '@/components/ui/thumb-carousel';
import { useTranslation } from 'next-i18next';
import { getVariations } from '@/lib/get-variations';
import { useEffect, useMemo } from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import Truncate from '@/components/ui/truncate';
import { scroller } from 'react-scroll';
import VariationPrice from './variation-price';
import { useRouter } from 'next/router';
import { ROUTES } from '@/lib/routes';
import type { Product } from '@/framework/types';
import { useAtom } from 'jotai';
import VariationGroups from './variation-groups';
import { isVariationSelected } from '@/lib/is-variation-selected';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { Waypoint } from 'react-waypoint';
import { stickyShortDetailsAtom } from '@/store/sticky-short-details-atom';
import { useAttributes } from './attributes.context';
import classNames from 'classnames';
import { displayImage } from '@/lib/display-product-preview-images';
import { useWindowDimensions } from '@/components/ui/modal/modal';

type Props = {
  product: Product;
  backBtn?: boolean;
  isModal?: boolean;
};
const Details: React.FC<Props> = ({
  product,
  backBtn = true,
  isModal = false,
}) => {
  const {
    name,
    image, //could only had image we need to think it also
    description,
    unit,
    gallery,
    price,
    slug,
  } = product ?? {};
  const { t } = useTranslation('common');
  const [_, setShowStickyShortDetails] = useAtom(stickyShortDetailsAtom);
  const{width: innerWidth} =useWindowDimensions()

  useEffect(() => {
    console.log(innerWidth)
  },[innerWidth])

  const router = useRouter();
  const { closeModal } = useModalAction();

  const { attributes } = useAttributes();


  const navigate = (path: string) => {
    router.push(path);
    closeModal();
  };

  const variations = useMemo(
    () => getVariations(product?.variations),
    [product?.variations]
  );
  const isSelected = isVariationSelected(variations, attributes);
  let selectedVariation: any = {};
  if (isSelected) {
    selectedVariation = product?.variation_options?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort()
      )
    );
  }

  const scrollDetails = () => {
    scroller.scrollTo('details', {
      smooth: true,
      offset: -80,
    });
  };

  const onWaypointPositionChange = ({
    currentPosition,
  }: Waypoint.CallbackArgs) => {
    if (!currentPosition || currentPosition === 'above') {
      setShowStickyShortDetails(true);
    }
  };
  const hasVariations = !isEmpty(variations);
  const previewImages = displayImage(selectedVariation?.image, gallery, image);



  return (
    <article className="rounded-lg bg-light">
      <div className="flex flex-col border-b md:flex-row border-border-200 border-opacity-70">
        <div className="p-6 pt-10 md:w-1/2 lg:p-14 xl:p-16">
          <div className="flex items-center justify-between mb-8 lg:mb-10">
            {backBtn && <BackButton />}

          </div>
          <div className="h-full product-gallery">
            <ThumbsCarousel
              gallery={previewImages}
              hideThumbs={previewImages.length <= 1}
            />
          </div>
        </div>

        <div className="flex flex-col items-start p-5 pt-10 md:w-1/2 lg:p-14 xl:p-16">
          <Waypoint
            onLeave={() => setShowStickyShortDetails(true)}
            onEnter={() => setShowStickyShortDetails(false)}
            onPositionChange={onWaypointPositionChange}
          >
            <div className="w-full">
              <h1
                className={classNames(
                  `font-semibold text-lg md:text-xl xl:text-2xl tracking-tight text-heading`,
                  {
                    'cursor-pointer transition-colors hover:text-accent':
                      isModal,
                  }
                )}
                {...(isModal && {
                  onClick: () => navigate(`${ROUTES.PRODUCT}/${slug}`),
                })}
              >
                {name}
              </h1>

              {unit && !hasVariations && (
                <span className="block mt-2 text-sm font-normal text-body md:mt-3">
                  {unit}
                </span>
              )}

              {description && (
                <div className="mt-3 text-sm leading-7 md:mt-4 text-body">
                  <Truncate
                    character={150}
                    {...(!isModal && {
                      onClick: () => scrollDetails(),
                      compressText: 'common:text-see-more',
                    })}
                  >
                    {description}
                  </Truncate>
                </div>
              )}

              {hasVariations ? (
                <>
                  <div className="flex items-center my-5 md:my-10">
                    <VariationPrice
                      selectedVariation={selectedVariation}
                      minPrice={product.min_price}
                      maxPrice={product.max_price}
                    />
                  </div>
                  <div>
                    <VariationGroups variations={variations} />
                  </div>
                </>
              ) : (
                <span className="flex items-center my-5 md:my-10">
                  <ins className="text-2xl font-semibold no-underline md:text-3xl text-accent">
                    {formatPrice({amount:price, locale:'ES', currencyCode:'ARS'})}<span className='text-lg text-gray-500'> x Kg</span>
                  </ins>

                </span>
              )}

              <div className="flex flex-col items-center mt-4 md:mt-6 lg:flex-row">
                <div className="mb-3 lg:mb-0 w-full lg:max-w-[400px]">
                  <AddToCart
                    data={product}
                    variant="big"
                    variation={selectedVariation}
                    disabled={selectedVariation?.is_disable || !isSelected}
                  />
                </div>

        
              </div>
            </div>
          </Waypoint>
        </div>
          {innerWidth && innerWidth < 768 && <div className='h-22 w-full bg-white z-100 fixed transparent'  style={{background:'linear-gradient(to top, rgba(255,0,0,0), white)', zIndex:100, opacity:0.8}}/>}
          {innerWidth && innerWidth < 768 && <div className='h-14 w-full bg-white z-100 fixed transparent'  style={{background:'linear-gradient(to top, rgba(255,0,0,0), white)', zIndex:100, opacity:0.8}}/>}
          {innerWidth && innerWidth < 768 && <div className='h-8 w-full bg-white z-[100] fixed transparent'  style={{background:'linear-gradient(to top, rgba(255,0,0,0), white)', zIndex:100, opacity:0.8}}/> }
      </div>


    </article>
  );
};

export default Details;
