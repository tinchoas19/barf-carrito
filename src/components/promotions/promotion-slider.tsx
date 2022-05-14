import { ArrowNext, ArrowPrev } from '@/components/icons';
import { Swiper, SwiperSlide, Navigation } from '@/components/ui/slider';
import { Image } from '@/components/ui/image';
import { useTranslation } from 'next-i18next';

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
  return (
    <div className="px-6 py-5 border-t md:p-8 border-border-200 bg-light">
      <div className="relative">
        <Swiper
          id="offer"
          //TODO: need discussion
          // loop={true}
          breakpoints={offerSliderBreakpoints}
          modules={[Navigation]}
          navigation={{
            nextEl: '.next',
            prevEl: '.prev',
          }}
        >
          {/* {sliders?.map((d) => ( */}
          <SwiperSlide key={1}>
            <Image
              className="w-full h-auto"
              src="https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/offer-5.png"
              alt="1"
              layout="responsive"
              width="580"
              height="270"
            />
          </SwiperSlide>
          <SwiperSlide key={2}>
            <Image
              className="w-full h-auto"
              src="https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/offer-4.png"
              alt="1"
              layout="responsive"
              width="580"
              height="270"
            />
          </SwiperSlide>
          <SwiperSlide key={3}>
            <Image
              className="w-full h-auto"
              src="https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/offer-3.png"
              alt="1"
              layout="responsive"
              width="580"
              height="270"
            />
          </SwiperSlide>
          {/* ))} */}
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
