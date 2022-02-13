import { appStore } from "../store/app.js";
import { userStore } from "../store/user.js";
import { clear } from "../store/actions.js";

import { api } from "../services/api.js";
import { isPromotional } from "./isPromotional.js";
import { sumTotalPrice, getShippingTax, getDiscountValue } from "./calcs.js";
import { formatMoney } from "./numberFormat.js";

const WHATSAPP_BREAK_LINE = "\n";

const createMontadoObject = (item) => {
  const itemPrice = isPromotional(item) ? item.PRECO_PROMOCAO : item.PRECOVENDA;

  return { 
    NOMEPRODUTO: item.PRODUTO,
    CODPRODUTO: item.CODIGO,
    PRECO: itemPrice
  }
}

const createAdditionalObject = (item) => {
  const itemPrice = isPromotional(item) ? item.PRECO_PROMOCAO : item.PRECOVENDA;
  const parsedPrice = parseFloat(itemPrice);

  return {
    NOMEADICIONAL: item.PRODUTO,
    CODADICIONAL: item.CODIGO,
    QTDE: 1,
    PRECO: parsedPrice.toFixed(2),
    CODITEM: item.ISADICIONAL_COD
  }
}

const createOpcoesObject = (item) => {
  return {
    NOMEINGREDIENTE: item.NOME,
    CODPRODUTO: item.ISINGREDIENTE_CODPRODUTO,
    CODINGREDIENTE: item.CODIGO,
    CODITEM: item.ISINGREDIENTE_CODPRODUTO,
    CANCELADO: 0,
    PAGO: "N"
  }
}

const createOptionalObject = (item) => {
  return {
    NOMEOPCIONAL: item.PRODUTO,
    CODOPCIONAL: item.CODIGO,
    CODITEM: item.ISOPCIONAL_COD
  }
}

const createItemToSendObject = (item) => {
  const subGrupo = item.subgroup ? item.subgroup.CODIGO : undefined;
  const codProduto = item.product ? item.product.CODIGO : undefined;

  const name = item.product ? item.product.PRODUTO : item.subgroup.SUBGRUPO;
  const itemDate = item.time;

  const itemsMontado = item.montagem ? item.montagem : [];
  const montado = itemsMontado.map(createMontadoObject);

  const itemsAdicional = item.additional || [];
  const adicional = itemsAdicional.map(createAdditionalObject);

  const itemsOptional = item.optional || [];
  const opcionais = itemsOptional.map(createOptionalObject);

  const itemsOpcoes = item.opcoes || [];
  const opcoes = itemsOpcoes.map(createOpcoesObject);

  return {
    ADC_CODITEM: "",
    ADICIONAL: "N",
    CANCELADO: 0,
    CODSUBGRUPO: subGrupo,
    COD_AGRUP: "",
    COD_MESA: window.nummesa,
    COD_PRODUTO: codProduto,
    COD_TEMP: "",
    COD_USUARIO: "000001",
    COMPLEMENTO: item.observation,
    COMPLEMENTO2: item.detail,
    DATA: itemDate.toLocaleDateString(),
    DISPOSITIVO: item.hash,
    FOTO: "default.png",
    HORA: itemDate.toLocaleTimeString(),
    IMPRESSO: 0,
    LISTA_ADICIONAIS: adicional,
    LISTA_OPCIONAIS: opcionais,
    LISTA_OPCOES: opcoes,
    LISTA_MONTAGEM: montado,
    NAOSINCRONIZADO: 0,
    PAGO: "N",
    PRODUTO: name,
    QTDE: item.quantity,
    TOTAL: item.totalPrice,
    TRANSF_MESA: 0,
    UNITARIO: item.unitPrice,
  }
}

const createRequestObject = () => {
  const cartItems = appStore.state.items ? appStore.state.items : [];
  const user = userStore.state.user ? userStore.state.user : {};

  const totalPrice = sumTotalPrice(cartItems);
  const shippingTax = getShippingTax(appStore.state);

  let totalFinal = parseFloat(totalPrice) + parseFloat(shippingTax);
  
  const discount = getDiscountValue(totalFinal, appStore.state.cupom);

  totalFinal = totalFinal - parseFloat(discount);
  totalFinal = totalFinal.toFixed(2);
  totalFinal = parseFloat(totalFinal);

  const currentDate = new Date();

  let shipping;
  if (appStore.state.retirarLocal) {
    shipping = "Retirar no local";
  } else {
    const storeShipping = appStore.state.shipping;
    let addressText = `${storeShipping.endereco}, ${storeShipping.numero}, ${storeShipping.bairro.nome}`;
    if (storeShipping.complemento && storeShipping.complemento !== "") {
      addressText = `${addressText} - ${storeShipping.complemento}`;
    }

    shipping = addressText;
  }

  const pedido = {
    CLIENTE_ID: user.id,
    VALOR: totalFinal,
    PAGAMENTO: appStore.state.payment,
    ENTREGA: shipping,
    VALOR_TROCO: appStore.state.troco,
    DESEJA_RECIBO: appStore.state.recibo ? 1 : 0,
    INFO_RECIBO: appStore.state.infoRecibo,
    COD_CUPOM: appStore.state.cupom ? appStore.state.cupom.codigo : undefined,
    DATA: currentDate.toLocaleDateString(),
    HORA: currentDate.toLocaleTimeString(),
  }

  const finalItems = cartItems.map(createItemToSendObject);
  return {
    pedido,
    items: finalItems
  }
}

const createAddicionalMessage = (item) => {
  return `${item.NOMEADICIONAL} (${item.QTDE}x);`;
}

const createOptionalMessage = (item) => {
  return `${item.NOMEOPCIONAL};`;
}

const createOpcoesMessage = (item) => {
  return `${item.NOMEINGREDIENTE};`;
}

const createMontagemMessage = (item) => {
  return `${item.NOMEPRODUTO}`;
}


const createItemsMessage = (item, index) => {
  const rows = [];
  rows.push(`${index + 1}. ${item.PRODUTO} (${item.QTDE}x);`);

  if (item.LISTA_ADICIONAIS.length) {
    rows.push(`  - Adicionais:`);
    const addicionalStr = item.LISTA_ADICIONAIS.map(createAddicionalMessage).join(WHATSAPP_BREAK_LINE);
    rows.push(`     ${addicionalStr}`);
  }
  if (item.LISTA_OPCIONAIS.length) {
    rows.push(`  - Opcionais:`);
    const optionalStr = item.LISTA_OPCIONAIS.map(createOptionalMessage).join(WHATSAPP_BREAK_LINE);
    rows.push(`     ${optionalStr}`);
  }
  if (item.LISTA_OPCOES.length) {
    rows.push(`  - Opções:`);
    const opcoesStr = item.LISTA_OPCIONAIS.map(createOpcoesMessage).join(WHATSAPP_BREAK_LINE);
    rows.push(`     ${opcoesStr}`);
  }
  if (item.LISTA_MONTAGEM.length) {
    rows.push(`  - Montagem:`);
    const montagemStr = item.LISTA_MONTAGEM.map(createMontagemMessage).join(WHATSAPP_BREAK_LINE);
    rows.push(`     ${montagemStr}`);
  }
  if (item.COMPLEMENTO && item.COMPLEMENTO !== "") {
    rows.push(`  - Observação: ${item.COMPLEMENTO}`);
  }

  return rows.join(WHATSAPP_BREAK_LINE);
}

const enviarWhatsapp = () => {
  const { pedido, items } = createRequestObject();

  const rows = [];
  rows.push(`- *Valor:* ${formatMoney(pedido.VALOR)};`);
  if (pedido.VALOR_TROCO) {
    rows.push(`- *Valor troco:* ${formatMoney(pedido.VALOR_TROCO)};`);
  }
  rows.push(`- *Pagamento:* ${pedido.PAGAMENTO};`);
  rows.push(`- *Entrega:* ${pedido.ENTREGA};`);

  const hasRecibo = pedido.DESEJA_RECIBO === 1 && pedido.INFO_RECIBO && pedido.INFO_RECIBO !== "";
  if (hasRecibo) {
    rows.push(`- *Informações para recibo:* ${pedido.INFO_RECIBO};`);
  }

  if (appStore.state.cupom) {
    rows.push(` - *Cupom:* ${appStore.state.cupom.cupom};`)
  }

  const itemsStr = items.map(createItemsMessage).join(WHATSAPP_BREAK_LINE);
  rows.push(` - *Items:*`);
  rows.push(`   ${itemsStr}`);
  
  const finalStr = rows.join(WHATSAPP_BREAK_LINE);

  const url = `https://wa.me/5569999016304?text=${encodeURIComponent(finalStr)}`;
  window.open(url,'_blank');
}

export const clearCard = () => {
  appStore.dispatchAction(clear());

  const url = `/${location.search}`;
  Router.go(url);
}

export const sendCart = async () => {
  const requestData = createRequestObject();

  const url = `salvarpedido`;

  try {
    const response = await api(url, {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.message && response.message === "sucesso") {
      fireEvent("show-modal", {
        type: "success", 
        message: "Seu pedido foi enviado com sucesso. Obrigado! <br />Deseja enviá-lo por WhatsApp?",
        textConfirm: "Sim",
        textCancel: "Não",
        onConfirm: () => {
          enviarWhatsapp();
          clearCard();
        },
        onCancel: () => {
          clearCard();
        }
      });
    }
  } catch (err) {
    console.error(err);  

    const responseData = err.data;
    if (responseData) {
      if (responseData.message) {
        if (responseData.message === "invalid token") {
          fireEvent("show-modal", { 
            type: "error",
            message: "Token inválido.",
          });
        } else if (responseData.message === "order closed") {
          fireEvent("show-modal", { 
            type: "error",
            message: "Mesa fechada, você não pode realizar um novo pedido.",
          });
        }
      }
    } else {
      fireEvent("show-modal", { 
        type: "error", message: "Não conseguimos finalizar seu pedido."
      });
    }
  }
}