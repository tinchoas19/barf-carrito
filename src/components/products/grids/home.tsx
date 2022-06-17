import { useProducts } from '@/framework/product';
import { Grid } from '@/components/products/grid';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from '@/framework/user';
import { useAtom } from 'jotai';
import { authorizationAtom } from '@/store/authorization-atom';
import Cookies from 'js-cookie';
import { AUTH_TOKEN_KEY } from '@/lib/constants';

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
  const { getProducts, products, isLoading } = useProducts();
  const [isAuthorize] = useAtom(authorizationAtom);

  useEffect(()=> {
    if (isAuthorize) {
      const token:string = Cookies.get(AUTH_TOKEN_KEY)
      getProducts(parseInt(token))
    } else {
      getProducts(0)
    }

  },[])

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
      isLoading={isLoading}
      />
  );
}
