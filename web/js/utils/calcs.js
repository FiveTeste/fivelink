export const calcAdditionalPrice = (additional = []) => {
  const price = additional.reduce((acc, item) => {
    const itemUnitPrice = loadProductPrice(item.product);
    const parsedValue = parseFloat(itemUnitPrice * item.quantity);
    //const parsedValue = parseFloat(itemUnitPrice);

    return acc + parsedValue;
  }, 0);

  return isNaN(price) ? 0 : price.toFixed(2);
}

export const calcProductsUnitPrice = (productList) => {
  var itemvalor = 0, unitPrice = 0;
  const configPreco = window.empresa.PRECO_DIVISIVEL;
  const totalProductsPrice = productList.reduce((acc, item) => {
    const itemPrice = loadProductPrice(item);
    const parsedValue = parseFloat(itemPrice);

    if(itemvalor == 0) itemvalor = parsedValue;    
    if(configPreco === 0){ // Maior preco
      itemvalor < parsedValue ? itemvalor = parsedValue : itemvalor = itemvalor;
    }else if(configPreco === 1){// Menor preco
      itemvalor > parsedValue ? itemvalor = parsedValue : itemvalor = itemvalor;
    }else{
      itemvalor > parsedValue;
    }    
    return acc + parsedValue;
  }, 0);

  if(configPreco > 1){
    unitPrice = totalProductsPrice / productList.length;
  }else{
    unitPrice = itemvalor;
    productList.forEach(p=>{
      p.PRECOVENDA = itemvalor;
    });
  }
  //const unitPrice = itemvalor;// totalProductsPrice / productList.length;
  return isNaN(unitPrice) ? 0 : unitPrice.toFixed(2);
}

export const loadProductPrice = (product) => {
  return product.isPromotional ? product.PRECO_PROMOCAO : product.PRECOVENDA;
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

  if (state.shipping.bairro.permite_entrega_gratis == 1) {
    const { items = [], cupom } = state;
    
    const totalPrice = sumTotalPrice(items);
    const discount = getDiscountValue(parseFloat(totalPrice), cupom);
    const totalFinal = parseFloat(totalPrice) - parseFloat(discount);

    if (totalFinal >= window.empresa.valor_entrega_gratis) {
      return 0;
    }
  }

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