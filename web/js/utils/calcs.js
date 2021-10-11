import { isPromotional } from "./isPromotional.js";

export const calcAdditionalPrice = (additional = []) => {
  const price = additional.reduce((acc, item) => {
    const itemUnitPrice = loadProductPrice(item.product);
    const itemPrice = itemUnitPrice * item.quantity;

    return acc + itemPrice;
  }, 0);

  return isNaN(price) ? 0 : price.toFixed(2);
}

export const calcProductsUnitPrice = (productList) => {
  const totalProductsPrice = productList.reduce((acc, item) => {
    const itemPrice = loadProductPrice(item);
    return acc + itemPrice;
  }, 0);
  
  const unitPrice = totalProductsPrice / productList.length;
  return isNaN(unitPrice) ? 0 : unitPrice.toFixed(2);
}

export const loadProductPrice = (product) => {
  return isPromotional(product) ? product.PRECO_PROMOCAO : product.PRECOVENDA;
}