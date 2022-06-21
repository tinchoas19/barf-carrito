import Spinner from '@/components/ui/loaders/spinner/spinner';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import Details from './details';
import ShortDetails from './short-details';
import { stickyShortDetailsAtom } from '@/store/sticky-short-details-atom';
import { useAtom } from 'jotai';
import { AttributesProvider } from './attributes.context';
import { Product } from '@/types';
import {UserIcon as PersonalizedIcon }from '@/components/icons/user-icon';

const RelatedProducts = dynamic(() => import('./related-products'));
interface ProductPopupProps {
  product: Product;
}
const Popup: React.FC<ProductPopupProps> = ({ product }) => {
  const { t } = useTranslation('common');
  const [showStickyShortDetails] = useAtom(stickyShortDetailsAtom);

  const { id, isPersonalized = false } = product ?? {};

  if (!product)
    return (
      <div className="relative flex items-center justify-center w-96 h-96 bg-light">
        <Spinner text={t('common:text-loading')} />
      </div>
    );

  return (
    <AttributesProvider>
      <article className="bg-light w-full max-w-6xl xl:min-w-[1152px] relative z-[51] md:rounded-xl">
      {
        isPersonalized &&  
        <PersonalizedIcon className='absolute ml-5 mt-5' style={{zIndex: 2, top:0 , cursor:'pointer'}} />
        }
        {/* Sticky bar */}
        <ShortDetails product={product} isSticky={showStickyShortDetails} />
        {/* End of sticky bar */}
        <Details product={product} backBtn={false} isModal={true} />


      </article>
    </AttributesProvider>
  );
};

export default Popup;
