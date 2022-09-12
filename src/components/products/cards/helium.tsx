import { Image } from '@/components/ui/image';
import cn from 'classnames';
import { formatPrice } from '@/lib/use-price';
import { AddToCart } from '@/components/products/add-to-cart/add-to-cart';
import { useTranslation } from 'next-i18next';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { productPlaceholder } from '@/lib/placeholders';


type HeliumProps = {
  product: any;
  className?: string;
};

const Helium: React.FC<HeliumProps> = ({ product, className }) => {

  const { t } = useTranslation('common');


  const { name, image,  price,  isPersonalized = false } =
    product ?? {};

  const { openModal } = useModalAction();

  function handleProductQuickView() {
    return openModal('PRODUCT_DETAILS', product);
  }
  return (
    <article
      className={cn(
        'product-card cart-type-neon border border-border-200 rounded h-full bg-light overflow-hidden shadow-sm transition-all duration-200 hover:shadow transform hover:-translate-y-0.5',
        className
      )}
    >
        
      <div
        className="relative flex items-center justify-center cursor-pointer w-auto h-48 sm:h-64"
        onClick={handleProductQuickView}
      >
        

        
        <span className="sr-only">{t('text-product-image')}</span>
        
        <Image
          src={image?.original ?? productPlaceholder}
          alt={name}
          layout="fill"
          objectFit="contain"
          className="product-image"
        />

      </div>
      {/* End of product image */}

      {
        isPersonalized &&  
        <div  className='absolute ml-2 mt-2 rounded-full bg-gray-500 pr-2 pl-2 pt-1 pb-1 text-white text-sm' style={{zIndex: 2, top:0 , cursor:'pointer', opacity: 0.8}}>
          {t('text-personalized')}
        </div>
        }
      <header className="p-3 md:p-6"
      style={{cursor:"pointer"}}
       onClick={handleProductQuickView}>
        <div className="flex items-center mb-2">
          <span className="text-sm md:text-base text-heading font-semibold">
            {formatPrice({amount : price, currencyCode: 'ARS',locale: 'ES'})}<span className='text-sm text-gray-500'> x Kg</span>
          </span>

        </div>

        {/* End of product price */}

        <h3
          className="text-xs md:text-sm text-body truncate mb-4 cursor-pointer"
          onClick={handleProductQuickView}
        >
          {name}
        </h3>
        {/* End of product title */}


        <>
            <AddToCart variant="neon" data={product} />
        </>



        {/* End of add to cart */}
      </header>
    </article>
  );
};


export default Helium;
