import type {
  PopularProductQueryOptions,
  Product,
} from '@/types';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import client from './client';
import { API_ENDPOINTS } from './client/api-endpoints';

export function useProducts() {
  const { mutate: getProducts, isLoading, data } = useMutation(client.products.all, {
    onSuccess: (data) => {

    },
    onError: (error) => {

    },
  });

  return {
    getProducts,
    isLoading,
    data
  };
}


/* export function useProducts2(id:number = 0) {
  const { data } = useQuery<Product[], Error>(
    [API_ENDPOINTS.PRODUCTS],
    () => client.products.all(id)
  );
  return {
    products :data
  };
}
 */
export const usePopularProducts = (
  options?: Partial<PopularProductQueryOptions>
) => {
  const { data, isLoading, error } = useQuery<Product[], Error>(
    [API_ENDPOINTS.PRODUCTS_POPULAR, options],
    ({ queryKey }) =>
      client.products.popular(queryKey[1] as PopularProductQueryOptions)
  );

  return {
    products: data ?? [],
    isLoading,
    error,
  };
};

export function useProduct({ slug }: { slug: string }) {
  const { data, isLoading, error } = useQuery<Product, Error>(
    [API_ENDPOINTS.PRODUCTS, slug],
    () => client.products.get(slug)
  );
  return {
    product: data,
    isLoading,
    error,
  };
}
