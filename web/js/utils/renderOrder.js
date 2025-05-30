import { name as PontoCarne } from "../components/PontoCarne.js";
import { name as ObservationForm } from "../components/ObservationForm.js";
import { name as FormQuantity } from "../components/FormQuantity.js";
import { name as ProductsForm } from "../components/ProductsForm.js";
import { name as OpcionaisForm } from "../components/OpcionaisForm.js";
import { name as OpcoesForm } from "../components/OpcoesForm.js";
import { name as CombosForm } from "../components/CombosForm.js";

import {
  addItem,
  setPontoCarne,
  setObservation,
  setQuantity,
  setProducts,
  setCombos,
  setAdditional,
  setOptional,
  setOpcoes,
  clearOrder,
} from "../store/actions.js";
import { orderStore } from "../store/order.js";
import { appStore } from "../store/app.js";

import { calcAdditionalPrice } from "./calcs.js";

export const createOrderDetail = (state) => {
  const productsDetail = createProductsDetail(state);

  const detail = createDetail(state);
  if (detail !== "") {
    return `${productsDetail}<br />${detail}`;
  }

  
  return productsDetail;
}

export const createProductsDetail = (state) => {
  const { products, additional, optional, opcoes } = state;

  let finalStr = "";
  if (products && products.length > 0) {
    const str = products.reduce((acc, montagemItem, index) => {
      if (index > 0) return `${acc}, ${montagemItem.PRODUTO}`;

      return montagemItem.PRODUTO;
    }, "");

    finalStr = str;
  }
  if (optional && optional.length > 0) {
    const str = optional.reduce((acc, item, index) => {
      if (index > 0) return `${acc}, (${item.quantity}x) ${item.product.PRODUTO}`;

      return `(${item.quantity}x) ${item.product.PRODUTO}`;
    }, "");

    finalStr = `${finalStr}<br />Opcionais: ${str}`;
  }

  if (additional && additional.length > 0) {
    const str = additional.reduce((acc, item, index) => {
      if (index > 0) return `${acc}, (${item.quantity}x) ${item.product.PRODUTO}`;

      return `(${item.quantity}x) ${item.product.PRODUTO}`;
    }, "");

    finalStr = `${finalStr}<br />Adicionais: ${str}`;
  }

  if (opcoes && opcoes.length > 0) {
    const str = opcoes.reduce((acc, item, index) => {
      if (index > 0) return `${acc}, ${item.NOME}`;

      return `${item.NOME}`;
    }, "");

    finalStr = `${finalStr}<br />Opções: ${str}`;
  }

  return finalStr;
}

export const createDetail = (state) => {
  const carneStr = state.ponto_carne ? `${state.ponto_carne}`: '';

  let detail = "";
  if (carneStr !== "") {
    detail = carneStr;
  }

  return detail.replace(/\r?\n|\r/g, '. ');
}


const filterProductOptions = (current, newItems) => {
  return newItems.filter((adicional) => {
    const exist = current.findIndex(current => current.CODIGO === adicional.CODIGO);
    return exist === -1;
  });
}
export const getProductsConfig = (productList, category) => {
  const hasProducts = !!category ? 1 : 0;

  const defaultOptions = {
    PRODUTOS: hasProducts,
    USA_PONTO_CARNE: 0
  };

  return productList.reduce((acc, item) => {
    const opts = {...acc};
    const currentAdicionais = opts.adicionais || [];
    const currentOpcionais = opts.opcionais || [];
    const currentOpcoes = opts.opcoes || [];

    if (item.adicionais && item.adicionais.length > 0) {
      const currentMaxAdicionais = +opts.QTDE_MAX_ADICIONAL || 0;
      const itemMaxAdicionais = +item.QTDE_MAX_ADICIONAL || 0;

      const newMaxAdicionais = Math.max(currentMaxAdicionais, itemMaxAdicionais);

      const filteredAdicionais = filterProductOptions(currentAdicionais, item.adicionais);
      opts.adicionais = [...currentAdicionais, ...filteredAdicionais];
      opts.QTDE_MAX_ADICIONAL = newMaxAdicionais;
    }
    if (item.opcionais && item.opcionais.length > 0) {
      const currentMaxOpcionais = +opts.QTDE_MAX_OPCIONAL || 0;
      const itemMaxOpcionais = +item.QTDE_MAX_OPCIONAL || 0;

      const newMaxOpcionais = Math.max(currentMaxOpcionais, itemMaxOpcionais);

      const filteredOpcionais = filterProductOptions(currentOpcionais, item.opcionais);
      opts.opcionais = [...currentOpcionais, ...filteredOpcionais];
      opts.QTDE_MAX_OPCIONAL = newMaxOpcionais;
    }
    if (item.opcoes && item.opcoes.length > 0) {
      const currentMaxOpcoes = +opts.QTDE_MAX_OPCOES || 0;
      const itemMaxOpcoes = +item.QTDE_MAX_OPCOES || 0;

      const newMaxOpcoes = Math.max(currentMaxOpcoes, itemMaxOpcoes);

      const filteredOpcoes = filterProductOptions(currentOpcoes, item.opcoes);
      opts.opcoes = [...currentOpcoes, ...filteredOpcoes];
      opts.QTDE_MAX_OPCOES = newMaxOpcoes;
    }

    if (item.USA_PONTO_CARNE === 1) {
      opts.USA_PONTO_CARNE = 1;
    }

    return {...opts};
  }, defaultOptions);
}

const dispatchStore = (action) => {
  return (event) => {
    const value = event.detail.value;
    orderStore.dispatchAction(action(value));
  }
}

export const createForms = () => {
  const productsForm = document.createElement(ProductsForm);
  productsForm.addEventListener("kyosk-change", dispatchStore(setProducts));

  const adicionalForm = document.createElement(OpcionaisForm);
  adicionalForm.storeKey = "additional";
  adicionalForm.titleText = "Adicione"; // OpcionaisForm linha 93 tem uma logica que usa o valor dessa variavel
  adicionalForm.showPrice = true;
  adicionalForm.validateMax = true;
  adicionalForm.addEventListener("kyosk-change", dispatchStore(setAdditional));

  const opcionaisForm = document.createElement(OpcionaisForm);
  opcionaisForm.storeKey = "optional";
  opcionaisForm.addEventListener("kyosk-change", dispatchStore(setOptional));

  const opcoesForm = document.createElement(OpcoesForm);
  opcoesForm.storeKey = "opcoes";
  opcoesForm.titleText = "Opções";
  opcoesForm.addEventListener("kyosk-change", dispatchStore(setOpcoes));

  const combosForm = document.createElement(CombosForm);
  combosForm.addEventListener("kyosk-change", dispatchStore(setCombos));

  const pontoCarneForm = document.createElement(PontoCarne);
  pontoCarneForm.addEventListener("kyosk-change", dispatchStore(setPontoCarne));
  
  const observationForm = document.createElement(ObservationForm);
  observationForm.addEventListener("kyosk-change", dispatchStore(setObservation));
  
  const quantityForm = document.createElement(FormQuantity);
  quantityForm.addEventListener("kyosk-change", dispatchStore(setQuantity));

  const forms = new Map();
  forms.set("products", { index: 0, element: productsForm });
  forms.set("ponto-carne", { index: 1, element: pontoCarneForm });
  forms.set("opcionais", { index: 2, element: opcionaisForm });
  forms.set("additional", { index: 3, element: adicionalForm });
  forms.set("opcoes", { index: 4, element: opcoesForm });
  forms.set("combos", { index: 5, element: combosForm });
  // forms.set("usa-copos", { index: 5, element: usaCoposForm });
  // forms.set("usa-talheres", { index: 6, element: usaTalheresForm });
  //forms.set("observation", { index: 7, element: observationForm });
  forms.set("quantity", { index: 8, element: quantityForm });

  return forms;
}


export const getSliderForms = (options, forms) => {
  const observation = forms.get("observation");
  const quantity = forms.get("quantity");

  //const resultForms = [observation, quantity];
  const resultForms = [quantity];

  if (options.PRODUTOS === 1) {
    const form = forms.get("products");
    resultForms.push(form);
  }
  if (options.USA_PONTO_CARNE === 1) {
    const form = forms.get("ponto-carne");
    resultForms.push(form);
  }

  if (options.adicionais && options.adicionais.length > 0) {    
    const maxAdicional = options.QTDE_MAX_ADICIONAL || 0;
    const form = forms.get("additional");
    form.element.loadProducts(options.adicionais);
    form.element.setMax(maxAdicional);

    resultForms.push(form);
  }

  if (options.opcionais && options.opcionais.length > 0) {
    const maxOpcional = options.QTDE_MAX_OPCIONAL || 0;
    const form = forms.get("opcionais");
    form.element.loadProducts(options.opcionais);
    form.element.setMax(maxOpcional);

    resultForms.push(form);
  }

  if (options.opcoes && options.opcoes.length > 0) {
    const maxOpcoes = options.QTDE_MAX_OPCOES || 0;
    const form = forms.get("opcoes");
    form.element.loadProducts(options.opcoes);
    form.element.setMax(maxOpcoes);
    resultForms.push(form);
  }
  
  if(options.COMBOS && options.COMBOS.length > 0){
    const form = forms.get("combos");
    form.element.loadProducts(options.COMBOS);
    resultForms.push(form);
  }

  return resultForms.sort((a, b) => a.index - b.index).map(item => item.element);
}

export const finishOrder = ({ product, unitPrice, category }) => {
  const state = orderStore.state;
  const totalPrice = unitPrice * state.quantity;

  const additionalPrice = state.quantity * calcAdditionalPrice(state.additional);  //calculo que considera qtde do produto para ficar certo o valor dos adicionais
  //const additionalPrice = calcAdditionalPrice(state.additional);
  const finalPrice = parseFloat(totalPrice) + parseFloat(additionalPrice);

  const currentDate = new Date();
  const str = `${currentDate.toLocaleString()}${totalPrice}${state.quantity}${window.nummesa}`;
  const hash = CryptoJS.MD5(str).toString().toUpperCase();

  const name = product ? product.PRODUTO : category.SUBGRUPO;
  const detail = createDetail(state);

  const uid = Date.now().toString(36) + Math.random().toString(36).substring(2);

  const finish = {
    uid: uid.toUpperCase(),
    product: product,
    subgroup: category,
    quantity: state.quantity,
    unitPrice: unitPrice,
    observation: state.observation,
    time: currentDate,
    montagem: state.products,
    additional: state.additional,
    optional: state.optional,
    opcoes: state.opcoes,
    combos: state.combos,
    totalPrice: finalPrice.toFixed(2),
    detail,
    name,
    hash,
  }

  appStore.dispatchAction(addItem(finish));

  window.qtdeProdutos = 0;
  window.qtdeAdicionais = 0;  
  
  fireEvent("show-confirm", {
    message: "Deseja continuar pedindo?",
    confirmText: "Pedir mais",
    cancelText: "Ir para o carrinho",
    onConfirm: () => {
      orderStore.dispatchAction(clearOrder());
      //const url = `/home${window.location.search}`;      
      const url = window.location.returnnavigation || `/home${window.location.search}`;
      Router.go(url);
    }, 
    onCancel: () => {
      orderStore.dispatchAction(clearOrder());      
      const url = `/carrinho${window.location.search}`;
      Router.go(url);
    }
  });
}