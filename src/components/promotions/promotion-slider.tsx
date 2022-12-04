import { ArrowNext, ArrowPrev } from '@/components/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Image } from '@/components/ui/image';
import { useTranslation } from 'next-i18next';
import shippings from '../../assets/home/1.png'
import orders from '../../assets/home/2.png'
import help from '../../assets/home/3.png'
import guide from '../../assets/home/4bis2.jpeg'
import { ROUTES } from '@/lib/routes';
import Link from 'next/link';
import { Autoplay, Navigation } from 'swiper';
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

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
    {
      img: guide,
      route: ROUTES.GUIDE
    },
    {
      img: shippings,
      route: ROUTES.SHIPPINGS
    },
    {
      img: orders,
      route: ROUTES.ORDERS_AND_STOCK
    },
    {
      img: help,
      route: ROUTES.HELP
    },
    
  ]
  return (
    <div className="px-6 py-5 border-t md:p-8 border-border-200 bg-light">
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
           {sliders2.map((slider,i) =>
          <SwiperSlide key={'slider'+i} id={'slider'+i} style={{cursor:'pointer'}}>
            <Link href={slider.route} passHref={true}>
            <Image
              className="w-full h-auto"
              src={slider.img}
              alt="1"
              layout="responsive"
              width="586"
              height="270"
            />
          </Link>
        </SwiperSlide>
          )} 
        </Swiper>

        <div
          className="absolute z-10 flex items-center justify-center w-8 h-8 -mt-4 transition-all duration-200 border rounded-full shadow-xl cursor-pointer prev top-2/4 ltr:-left-4 rtl:-right-4 ltr:md:-left-5 rtl:md:-right-5 md:-mt-5 md:w-9 md:h-9 bg-light border-border-200 border-opacity-70 text-heading hover:bg-accent hover:text-light hover:border-accent"
          role="button"
        >
          <span className="sr-only">{t('common:text-previous')}</span>
          <ArrowPrev width={18} height={18} />
        </div>
        <div
          className="absolute z-10 flex items-center justify-center w-8 h-8 -mt-4 transition-all duration-200 border rounded-full shadow-xl cursor-pointer next top-2/4 ltr:-right-4 rtl:-left-4 ltr:md:-right-5 md:-mt-5 md:w-9 md:h-9 bg-light border-border-200 border-opacity-70 text-heading hover:bg-accent hover:text-light hover:border-accent"
          role="button"
        >
          <span className="sr-only">{t('common:text-next')}</span>
          <ArrowNext width={18} height={18} />
        </div>
      </div>
    </div>
  );
}
