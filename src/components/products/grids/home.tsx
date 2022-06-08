import { useProducts } from '@/framework/product';
import { Grid } from '@/components/products/grid';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface Props {
  className?: string;
  variables: any;
  column?: any;
  gridClassName?: string;
}
export default function ProductGridHome({
  className,
  variables,
  column,
  gridClassName,
}: Props) {
  const { query } = useRouter();
  const { products } =useProducts();

    function filterProducts(prods) {
      if (query.category) {
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
      />
  );
}
