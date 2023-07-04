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

  const { name, image, price, isPersonalized = false } = product ?? {};

  const { openModal } = useModalAction();

  function handleProductQuickView() {
    return openModal('PRODUCT_DETAILS', product);
  }
  return (
    <article
      className={cn(
        'product-card cart-type-neon h-full transform overflow-hidden rounded border border-border-200 bg-light shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow',
        className
      )}
    >
      <div
        className="relative flex h-48 w-auto cursor-pointer items-center justify-center sm:h-64"
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

      {isPersonalized && (
        <div
          className="absolute ml-2 mt-2 rounded-full bg-gray-500 pr-2 pl-2 pt-1 pb-1 text-sm text-white"
          style={{ zIndex: 2, top: 0, cursor: 'pointer', opacity: 0.8 }}
        >
          {t('text-personalized')}
        </div>
      )}
      <div className="p-3 md:p-6">
        <div className="mb-2 flex items-center">
          <span className="text-sm font-semibold text-heading md:text-base">
            {formatPrice({ amount: price, currencyCode: 'ARS', locale: 'ES' })}
          </span>
        </div>

        {/* End of product price */}

        <h3
          className="mb-4 cursor-pointer truncate text-xs text-body md:text-sm"
          onClick={handleProductQuickView}
        >
          {name}
        </h3>
        {/* End of product title */}

        <>
          <AddToCart variant="neon" data={product} />
        </>

        {/* End of add to cart */}
      </div>
    </article>
  );
};

export default Helium;
