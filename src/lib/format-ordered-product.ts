export function formatOrderedProduct(product: any) {
  return {
    id: product?.productId ? product.productId : product.id,
    ...(product?.variationId
      ? { variation_option_id: product.variationId }
      : {}),
    quantity: product.quantity,
    unit_price: product.price,
    subtotal: product.itemTotal,
  };
}
