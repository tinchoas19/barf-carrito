import { ProductQueryOptions } from '@/types';

export const formatProductsArgs = (options?: Partial<ProductQueryOptions>) => {
  // Destructure
  const {
    limit = 30,
    price,

    text,
    searchType,
    searchQuery,
    ...restOptions
  } = options || {};

  return {
    limit,
    ...(price && { min_price: price as string }),
    ...(text && { name: text.toString() }),

    ...(searchType && { type: searchType.toString() }),
    ...(searchQuery && { name: searchQuery.toString() }),
    ...restOptions,
  };
};
