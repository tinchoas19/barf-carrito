import { Image } from '@/components/ui/image';
import cn from 'classnames';
import usePrice, { formatPrice } from '@/lib/use-price';
import { AddToCart } from '@/components/products/add-to-cart/add-to-cart';
import { useTranslation } from 'next-i18next';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { Product } from '@/framework/types';
import { productPlaceholder } from '@/lib/placeholders';
import CartIcon from '@/components/icons/cart';

type HeliumProps = {
  product: any;
  className?: string;
};

const Helium: React.FC<HeliumProps> = ({ product, className }) => {

  const { t } = useTranslation('common');
  // const { name, image, quantity } = product ?? {};
  // const { price, basePrice, discount } = usePrice({
  //   amount: product.sale_price ? product.sale_price : product.price!,
  //   baseAmount: product.price,
  // });

  const { name, image, min_price, max_price, price,  product_type } =
    product ?? {};
/*   const { price2, basePrice, discount } = usePrice({
    amount: product.sale_price ? product.sale_price : product.price!,
    baseAmount: product.price,
  });
  const { price: minPrice } = usePrice({
    amount: min_price,
  });
  const { price: maxPrice } = usePrice({
    amount: max_price,
  }); */

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
        {/* {discount && (
          <div className="absolute top-3 ltr:right-3 rtl:left-3 md:top-4 ltr:md:right-4 rtl:md:left-4 rounded text-xs leading-6 font-semibold px-1.5 sm:px-2 md:px-2.5 bg-accent text-light">
            {discount}
          </div>
        )} */}
      </div>
      {/* End of product image */}

      <header className="p-3 md:p-6">
        <div className="flex items-center mb-2">
          <span className="text-sm md:text-base text-heading font-semibold">
            {formatPrice({amount : price, currencyCode: 'ARS',locale: 'ES'})}
          </span>
          {/* {basePrice && (
              <del className="text-xs md:text-sm text-muted ltr:ml-2 rtl:mr-2">
                {basePrice}
              </del>
            )} */}
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
