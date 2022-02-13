import { isPromotional } from "./isPromotional.js";

export const calcAdditionalPrice = (additional = []) => {
  const price = additional.reduce((acc, item) => {
    const itemUnitPrice = loadProductPrice(item);
    const parsedValue = parseFloat(itemUnitPrice);

    return acc + parsedValue;
  }, 0);

  return isNaN(price) ? 0 : price.toFixed(2);
}

export const calcProductsUnitPrice = (productList) => {
  const totalProductsPrice = productList.reduce((acc, item) => {
    const itemPrice = loadProductPrice(item);
    const parsedValue = parseFloat(itemPrice);
    return acc + parsedValue;
  }, 0);
  
  const unitPrice = totalProductsPrice / productList.length;
  return isNaN(unitPrice) ? 0 : unitPrice.toFixed(2);
}

export const loadProductPrice = (product) => {
  return isPromotional(product) ? product.PRECO_PROMOCAO : product.PRECOVENDA;
}

export const sumTotalPrice = (productList = []) => {
  const price = productList.reduce((acc, item) => {
    const parsedValue = parseFloat(item.totalPrice);
    return acc + parsedValue;
  }, 0);

  return isNaN(price) ? 0 : price.toFixed(2);
}

export const getShippingTax = (state) => {
  if (state.retirarLocal) return 0;
  if (!state.shipping) return 0;

  return state.shipping.bairro.tx_entrega;
}


export const getDiscountValue = (total, cupom) => {
  if (!cupom) return 0;
  if (parseFloat(total) < parseFloat(cupom.valor_minimo)) return 0;

  if (cupom.porcentagem === 0) {
    return cupom.valor;
  }

  const discountFactor = parseFloat(cupom.valor) / 100;
  const finalDiscount = parseFloat(total) * discountFactor;

  return finalDiscount.toFixed(2);
}