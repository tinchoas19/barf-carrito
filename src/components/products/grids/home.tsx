import { useProducts } from '@/framework/product';
import { Grid } from '@/components/products/grid';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { authorizationAtom } from '@/store/authorization-atom';
import Cookies from 'js-cookie';
import { AUTH_TOKEN_KEY } from '@/lib/constants';
import { categoryNameAtom, categorySlugAtom } from '@/store/category-atom';

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
  const { getProducts, isLoading, data :products} = useProducts();
  const [isAuthorize] = useAtom(authorizationAtom);
  const [categorySlug, setCategorySlug] = useAtom(categorySlugAtom)
  const [_, setCategoryName] = useAtom(categoryNameAtom)
  const [filteredProducts, setFilteredProducts] = useState(null)
  const [refetch, setRefetch] = useState(true)

  function handleGetProducts() {
    if (isAuthorize) {
      const token:string = Cookies.get(AUTH_TOKEN_KEY)
      getProducts(parseInt(token))
    } else {
      getProducts(0)
    }
  }

  useEffect(()=> {
    if (categorySlug !== '') {
      setCategorySlug('')
      setCategoryName('Todos')
  }
    handleGetProducts()
  },[])

  useEffect(() => {
    if (refetch) {
      setRefetch(false)
      setTimeout(() => {
        setRefetch(true)
        handleGetProducts()
      },300000)
    }
  },[refetch])
    
  useEffect(() => {
    handleGetProducts()
  },[isAuthorize])

  useEffect(() => {
    if (categorySlug === '') setFilteredProducts(products)
    else if (products && products.length > 0) {
      let result = products.filter(product => 
        !!(product.categories.find(category => category.slug === categorySlug)
      ))
      setFilteredProducts(result)
    }
  },[categorySlug, products]) 

/*   function filterProducts(prods:any) {
    if (categorySlug === '') return prods
    else if (prods && prods.length > 0) {
      let result = prods.filter(product => 
        !!(product.categories.find(category => category.slug === categorySlug)
      ))
      
      return prods
    }
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
