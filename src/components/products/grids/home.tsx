import { useProducts } from '@/framework/product';
import { Grid } from '@/components/products/grid';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { authorizationAtom } from '@/store/authorization-atom';
import Cookies from 'js-cookie';
import { AUTH_TOKEN_KEY } from '@/lib/constants';
import { categorySlugAtom } from '@/store/category-atom';

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
  const [categorySlug, setCategorySlug] = useAtom(categorySlugAtom)
  const [filteredProducts, setFilteredProducts] = useState(null)

  useEffect(()=> {
    if (categorySlug !== '') setCategorySlug('')
    if (isAuthorize) {
      const token:string = Cookies.get(AUTH_TOKEN_KEY)
      getProducts(parseInt(token))
    } else {
      getProducts(0)
    }

  },[])

  useEffect(() => {
    if (categorySlug === '') setFilteredProducts(null)
    else {
      let result = products.filter(product => 
        !!(product.categories.find(category => category.slug === categorySlug)
      ))
      
      setFilteredProducts(result)
    }
  },[categorySlug])

/*     function filterProducts(prods) {
      if (query.category && products) {
        let result = products.filter(product => 
          !!(product.categories.find(category => category.slug === query.category)
            ))
        return result
      } else return prods
    } */

  return (
      <Grid
      products={filteredProducts ? filteredProducts : products}
      className={className}
      gridClassName={gridClassName}
      column={column}
      isLoading={isLoading}
      />
  );
}
