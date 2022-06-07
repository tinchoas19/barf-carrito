import { useProducts } from '@/framework/product';
import { PRODUCTS_PER_PAGE } from '@/framework/client/variables';
import { Grid } from '@/components/products/grid';
import { useRouter } from 'next/router';
import { useEffect , useState} from 'react';
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
  const { products, loadMore, isLoadingMore, isLoading, hasMore, error } =
    useProducts({
      ...variables,
      //...(query.category && { categories: query.category }),
      //...(query.text && { text: query.text }),
      // ...(query.type && { type: query.pages?.[0] }),
    });

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
      loadMore={loadMore}
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
      hasMore={hasMore}
      error={error}
      limit={PRODUCTS_PER_PAGE}
      className={className}
      gridClassName={gridClassName}
      column={column}
      />
  );
}
