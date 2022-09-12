import { Product } from '@/framework/types';
import dynamic from 'next/dynamic';
const Helium = dynamic(() => import('@/components/products/cards/helium'));


interface ProductCardProps {
  product: Product;
  className?: string;
}
const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
  ...props
}) => {
  const Component = Helium;
  return <Component product={product} {...props} className={className} />;
};
export default ProductCard;
