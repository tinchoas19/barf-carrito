import { ArrowNext, ArrowPrev } from '@/components/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Image } from '@/components/ui/image';
import { useTranslation } from 'next-i18next';
import shippings from '../../assets/home/1.png';
import orders from '../../assets/home/2.png';
import help from '../../assets/home/3.png';
import guide from '../../assets/home/4bis2.jpeg';
import { ROUTES } from '@/lib/routes';
import Link from 'next/link';
import { Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const offerSliderBreakpoints = {
  320: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  580: {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  1920: {
    slidesPerView: 4,
    spaceBetween: 24,
  },
};

export default function PromotionSlider() {
  const { t } = useTranslation();

  const sliders2 = [
    // {
    //   img: guide,
    //   route: ROUTES.GUIDE
    // },
    {
      img: shippings,
      route: ROUTES.SHIPPINGS,
    },
    {
      img: orders,
      route: ROUTES.ORDERS_AND_STOCK,
    },
    {
      img: help,
      route: ROUTES.HELP,
    },
  ];
  return (
    <div className="border-t border-border-200 bg-light px-6 py-5 md:p-8">
      <div className="relative">
        <Swiper
          //autoplay={{delay:6000}}
          id="offer"
          //loop={true}
          breakpoints={offerSliderBreakpoints}
          modules={[Navigation]}
          navigation={{
            nextEl: '.next',
            prevEl: '.prev',
          }}
        >
          {sliders2.map((slider, i) => (
            <SwiperSlide
              key={'slider' + i}
              id={'slider' + i}
              
            >
             
                <Image
                  className="h-auto w-full"
                  src={slider.img}
                  alt="1"
                  layout="responsive"
                  width="586"
                  height="270"
                />
              
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className="prev absolute top-2/4 z-10 -mt-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border-200 border-opacity-70 bg-light text-heading shadow-xl transition-all duration-200 hover:border-accent hover:bg-accent hover:text-light ltr:-left-4 rtl:-right-4 md:-mt-5 md:h-9 md:w-9 ltr:md:-left-5 rtl:md:-right-5"
          role="button"
        >
          <span className="sr-only">{t('common:text-previous')}</span>
          <ArrowPrev width={18} height={18} />
        </div>
        <div
          className="next absolute top-2/4 z-10 -mt-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border-200 border-opacity-70 bg-light text-heading shadow-xl transition-all duration-200 hover:border-accent hover:bg-accent hover:text-light ltr:-right-4 rtl:-left-4 md:-mt-5 md:h-9 md:w-9 ltr:md:-right-5"
          role="button"
        >
          <span className="sr-only">{t('common:text-next')}</span>
          <ArrowNext width={18} height={18} />
        </div>
      </div>
    </div>
  );
}
