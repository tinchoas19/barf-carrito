import { useProducts } from '@/framework/product';
import { Grid } from '@/components/products/grid';
import { useRouter } from 'next/router';

interface Props {
  className?: string;
  variables?: any;
  column?: any;
  gridClassName?: string;
}
export default function ProductGridHome({
  className,
  column,
  gridClassName,
}: Props) {
  const { query } = useRouter();
  const { products } =useProducts(1);

    function filterProducts(prods) {
      if (query.category && products) {
        let result = products.filter(product => 
          !!(product.categories.find(category => category.slug === query.category)
            ))
        return result
      } else return prods
    }

  return (
      <Grid
      products={filterProducts(products)}
      className={className}
      gridClassName={gridClassName}
      column={column}
      isLoading={!products ? true : false}
      />
  );
}
