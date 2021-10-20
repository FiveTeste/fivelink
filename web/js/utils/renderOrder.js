import { name as PontoCarne } from "../components/PontoCarne.js";
import { name as UsaCopos } from "../components/UsaCopos.js";
import { name as FormTalheres } from "../components/FormTalheres.js";
import { name as ObservationForm } from "../components/ObservationForm.js";
import { name as FormQuantity } from "../components/FormQuantity.js";
import { name as ProductsForm } from "../components/ProductsForm.js";
import { name as AditionalForm } from "../components/AditionalForm.js";
import { name as OpcionaisForm } from "../components/OpcionaisForm.js";

import {
  addItem,
  setPontoCarne, 
  setCopos,
  setTalheres,
  setObservation,
  setQuantity,
  setProducts,
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
      if (index > 0) return `${acc}, ${item.PRODUTO}`;

      return `${item.PRODUTO}`;
    }, "");

    finalStr = `${finalStr}<br />Opcionais: ${str}`;
  }

  if (additional && additional.length > 0) {
    const str = additional.reduce((acc, item, index) => {
      const { product, quantity } = item;
      if (index > 0) return `${acc}, (${quantity}x) ${product.PRODUTO}`;

      return `(${quantity}x) ${product.PRODUTO}`;
    }, "");

    finalStr = `${finalStr}<br />Adicionais: ${str}`;
  }

  if (opcoes && opcoes.length > 0) {
    const str = opcoes.reduce((acc, item, index) => {
      if (index > 0) return `${acc}, ${item.PRODUTO}`;

      return `${item.PRODUTO}`;
    }, "");

    finalStr = `${finalStr}<br />Opções: ${str}`;
  }

  return finalStr;
}

export const createDetail = (state) => {
  const carneStr = state.ponto_carne ? `${state.ponto_carne}`: '';
  const talheresStr = state.talheres ? `Talheres/Pratos: ${state.talheres}` : '';

  const coposStr = (() => {
    let resultStr = "";
    if (state.copo > 0) {
      resultStr = `Copo: ${state.copo}`;
    }
    if (state.copo_gelo > 0) {
      resultStr = `${resultStr}, Copo com gelo: ${state.copo_gelo}`;
    }
    if (state.copo_gelo_limao > 0) {
      resultStr = `${resultStr}, Copo com gelo e limão: ${state.copo_gelo_limao}`;
    }

    return resultStr;
  })();

  let detail = "";
  if (carneStr !== "") {
    detail = carneStr;
  }
  if (coposStr !== "") {
    detail = `${detail}\n${coposStr}`;
  }
  if (talheresStr !== "") {
    detail = `${detail}\n${talheresStr}`;
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
    USA_PONTO_CARNE: 0,
    USA_COPOS: 0,
    USA_TALHERES: 0,
  };

  return productList.reduce((acc, item) => {
    const opts = {...acc};
    const currentAdicionais = opts.adicionais || [];
    const currentOpcionais = opts.opcionais || [];
    const currentOpcoes = opts.opcoes || [];

    if (item.adicionais && item.adicionais.length > 0) {
      const filteredAdicionais = filterProductOptions(currentAdicionais, item.adicionais);
      opts.adicionais = [...currentAdicionais, ...filteredAdicionais];
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
    if (item.USA_COPOS === 1) {
      opts.USA_COPOS = 1;
    }
    if (item.USA_TALHERES === 1) {
      opts.USA_TALHERES = 1;
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

  const adicionalForm = document.createElement(AditionalForm);
  adicionalForm.addEventListener("kyosk-change", dispatchStore(setAdditional));

  const opcionaisForm = document.createElement(OpcionaisForm);
  opcionaisForm.storeKey = "optional";
  opcionaisForm.addEventListener("kyosk-change", dispatchStore(setOptional));

  const opcoesForm = document.createElement(OpcionaisForm);
  opcoesForm.storeKey = "opcoes";
  opcoesForm.titleText = "Opções";
  opcoesForm.addEventListener("kyosk-change", dispatchStore(setOpcoes));

  const pontoCarneForm = document.createElement(PontoCarne);
  pontoCarneForm.addEventListener("kyosk-change", dispatchStore(setPontoCarne));

  const usaCoposForm = document.createElement(UsaCopos);
  usaCoposForm.addEventListener("kyosk-change", (event) => {
    const { name, value } = event.detail;
    orderStore.dispatchAction(setCopos({ name, value }));
  });

  const usaTalheresForm = document.createElement(FormTalheres);
  usaTalheresForm.addEventListener("kyosk-change", dispatchStore(setTalheres));
  
  const observationForm = document.createElement(ObservationForm);
  observationForm.addEventListener("kyosk-change", dispatchStore(setObservation));
  
  const quantityForm = document.createElement(FormQuantity);
  quantityForm.addEventListener("kyosk-change", dispatchStore(setQuantity));

  const forms = new Map();
  forms.set("products", { index: 0, element: productsForm });
  forms.set("opcionais", { index: 1, element: opcionaisForm });
  forms.set("additional", { index: 2, element: adicionalForm });
  forms.set("opcoes", { index: 3, element: opcoesForm });
  forms.set("ponto-carne", { index: 4, element: pontoCarneForm });
  forms.set("usa-copos", { index: 5, element: usaCoposForm });
  forms.set("usa-talheres", { index: 6, element: usaTalheresForm });
  forms.set("observation", { index: 7, element: observationForm });
  forms.set("quantity", { index: 8, element: quantityForm });

  return forms;
}


export const getSliderForms = (options, forms) => {
  const observation = forms.get("observation");
  const quantity = forms.get("quantity");

  const resultForms = [observation, quantity];

  if (options.PRODUTOS === 1) {
    const form = forms.get("products");
    resultForms.push(form);
  }
  if (options.USA_PONTO_CARNE === 1) {
    const form = forms.get("ponto-carne");
    resultForms.push(form);
  }
  if (options.USA_COPOS === 1) {
    const form = forms.get("usa-copos");
    resultForms.push(form);
  }
  if (options.USA_TALHERES === 1) {
    const form = forms.get("usa-talheres");
    resultForms.push(form);
  }
  if (options.adicionais && options.adicionais.length > 0) {
    const form = forms.get("additional");
    form.element.loadProducts(options.adicionais);

    resultForms.push(form);
  }

  const maxOpcional = +options.QTDE_MAX_OPCIONAL;
  if (options.opcionais && options.opcionais.length > 0 && maxOpcional > 0) {
    const form = forms.get("opcionais");
    form.element.loadProducts(options.opcionais);
    form.element.setMax(maxOpcional);

    resultForms.push(form);
  }

  const maxOpcoes = +options.QTDE_MAX_OPCOES;
  if (options.opcoes && options.opcoes.length > 0 && maxOpcoes > 0) {
    const form = forms.get("opcoes");
    form.element.loadProducts(options.opcoes);
    form.element.setMax(maxOpcoes);

    resultForms.push(form);
  }

  return resultForms.sort((a, b) => a.index - b.index).map(item => item.element);
}

export const finishOrder = ({ product, unitPrice, category }) => {
  const state = orderStore.state;

  const totalPrice = unitPrice * state.quantity;

  const additionalPrice = calcAdditionalPrice(state.additional);
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
    totalPrice: finalPrice.toFixed(2),
    detail,
    name,
    hash,
  }

  appStore.dispatchAction(addItem(finish));

  fireEvent("show-confirm", {
    message: "Deseja continuar pedindo?",
    confirmText: "Pedir mais",
    cancelText: "Ir para o carrinho",
    onConfirm: () => {
      orderStore.dispatchAction(clearOrder());
      const url = `/web/${window.location.search}`;
      Router.go(url);
    }, 
    onCancel: () => {
      orderStore.dispatchAction(clearOrder());
      const url = `/web/carrinho${window.location.search}`;
      Router.go(url);
    }
  });
}