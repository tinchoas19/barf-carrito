import { ArrowNext, ArrowPrev } from '@/components/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Image } from '@/components/ui/image';
import { useTranslation } from 'next-i18next';
import caba1 from '../../assets/shippings/1.png'
import caba2 from '../../assets/shippings/2.png'
import zn1 from '../../assets/shippings/3.png'
import zn2 from '../../assets/shippings/4.png'
import sur from '../../assets/shippings/5.png'
import oeste from '../../assets/shippings/6.png'
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

export default function ShippingsSlider() {
  const { t } = useTranslation();

  const images = [caba1,caba2,zn1,zn2,sur,oeste]
  return (
    <div className="px-6 py-5 border-t md:p-8 border-border-200 bg-light">
      <div className="relative">
        <Swiper
          id="shipping"
          //autoplay={{delay:6000}}
          //loop={true}
          breakpoints={offerSliderBreakpoints}
          modules={[Navigation]}
          navigation={{
            nextEl: '.next',
            prevEl: '.prev',
          }}
        >
          {
            images.map((img,i) => 
            <SwiperSlide key={i}>
            <Image
              className="w-full h-auto"
              src={img}
              alt="zona de envio"
              layout="responsive"
              width="343"
              height="257"
            />
            </SwiperSlide>)
          }
              
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
