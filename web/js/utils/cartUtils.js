import { appStore } from "../store/app.js";
import { userStore } from "../store/user.js";
import { clear } from "../store/actions.js";

import { api } from "../services/api.js";
import { sumTotalPrice, getShippingTax, getDiscountValue } from "./calcs.js";
import { formatMoney } from "./numberFormat.js";
import { masks } from "./masks.js";

const WHATSAPP_BREAK_LINE = "\n";

const createMontadoObject = (item) => {
  const itemPrice = item.isPromotional ? item.PRECO_PROMOCAO : item.PRECOVENDA;

  return { 
    NOMEPRODUTO: item.PRODUTO,
    CODPRODUTO: item.CODIGO,
    PRECO: itemPrice
  }
}

const createAdditionalObject = (item) => {
  const itemPrice = item.product.isPromotional ? item.product.PRECO_PROMOCAO : item.product.PRECOVENDA;
  const parsedPrice = parseFloat(itemPrice);

  return {
    NOMEADICIONAL: item.product.PRODUTO,
    CODADICIONAL: item.product.CODIGO,
    QTDE: item.quantity,
    PRECO: parsedPrice.toFixed(2),
    CODITEM: item.product.ISADICIONAL_COD
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
    NOMEOPCIONAL: item.product.PRODUTO,
    CODOPCIONAL: item.product.CODIGO,
    QTDE: item.quantity,
    CODITEM: item.product.ISOPCIONAL_COD
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

  const day = itemDate.getDate();
  const month = itemDate.getMonth() + 1;
  const year = itemDate.getFullYear();
  const hour = itemDate.getHours();
  const minute = itemDate.getMinutes();
  const seconds = itemDate.getSeconds();
  
  const dayStr = String(day).padStart(2, '0');
  const monthStr = String(month).padStart(2, '0');
  const hourStr = String(hour).padStart(2, '0');
  const minuteStr = String(minute).padStart(2, '0');
  const secondsStr = String(seconds).padStart(2, '0');

  const dateStr = `${dayStr}/${monthStr}/${year}`;
  const timeStr = `${hourStr}:${minuteStr}:${secondsStr}`;


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
    DATA: dateStr,
    DISPOSITIVO: item.hash,
    FOTO: "default.png",
    HORA: timeStr,
    IMPRESSO: 0,
    LISTA_ADICIONAIS: adicional,
    LISTA_OPCIONAIS: opcionais,
    LISTA_OPCOES: opcoes,
    LISTA_MONTAGEM: montado,
    NAOSINCRONIZADO: 0,
    PAGO: "N",
    PRODUTO: name,
    QTDE: item.quantity,
    TOTAL: (item.quantity * item.unitPrice).toFixed(2) ,// item.totalPrice,
    TRANSF_MESA: 0,
    UNITARIO: item.unitPrice,
  }
}

const createRequestObject = () => {
  const cartItems = appStore.state.items ? appStore.state.items : [];
  const user = userStore.state.user ? userStore.state.user : {};

  const totalPrice = sumTotalPrice(cartItems);
  const shippingTax = getShippingTax(appStore.state);
  
  const discount = getDiscountValue(totalPrice, appStore.state.cupom);

  let totalFinal = parseFloat(totalPrice) - parseFloat(discount);
  totalFinal = totalFinal + parseFloat(shippingTax);
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

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  
  const dayStr = String(day).padStart(2, '0');
  const monthStr = String(month).padStart(2, '0');
  const hourStr = String(hour).padStart(2, '0');
  const minuteStr = String(minute).padStart(2, '0');
  const secondsStr = String(seconds).padStart(2, '0');

  const dateStr = `${dayStr}/${monthStr}/${year}`;
  const timeStr = `${hourStr}:${minuteStr}:${secondsStr}`;
  

  const pedido = {
    CLIENTE_ID: user.id,
    VALOR: totalFinal,
    PAGAMENTO: appStore.state.payment,
    ENTREGA: shipping,
    VALOR_TROCO: appStore.state.troco,
    DESEJA_RECIBO: appStore.state.recibo ? 1 : 0,
    INFO_RECIBO: appStore.state.infoRecibo,
    COD_CUPOM: appStore.state.cupom ? appStore.state.cupom.codigo : undefined,
    DATA: dateStr,
    HORA: timeStr,
    VALOR_ENTREGA: shippingTax,
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
  if (item.LISTA_MONTAGEM.length) {
    rows.push(`  - Montagem:`);
    const montagemStr = item.LISTA_MONTAGEM.map(createMontagemMessage).join(WHATSAPP_BREAK_LINE);
    rows.push(`     ${montagemStr}`);
  }
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
    const opcoesStr = item.LISTA_OPCOES.map(createOpcoesMessage).join(WHATSAPP_BREAK_LINE);
    rows.push(`     ${opcoesStr}`);
  }
  
  if (item.COMPLEMENTO && item.COMPLEMENTO !== "") {
    rows.push(`  - Observação: ${item.COMPLEMENTO}`);
  }

  return rows.join(WHATSAPP_BREAK_LINE);
}

const enviarWhatsapp = (numPedido) => {
  const { pedido, items } = createRequestObject();
  const user = userStore.state.user ? userStore.state.user : {};
  const [nome] = user.nome.split(" ");

  const rows = [];

  rows.push(`*Pedido Delivery Five ${numPedido ? `#${numPedido}` : ""}*`);
  rows.push(`---------------------------------------`);
  rows.push("");
  
  const itemsStr = items.map(createItemsMessage).join(WHATSAPP_BREAK_LINE);
  rows.push(`   ${itemsStr}`);
  rows.push("");
  rows.push(`*Total:* ${formatMoney(pedido.VALOR)}`);

  if (appStore.state.cupom) {
    rows.push(`*Cupom:* ${appStore.state.cupom.cupom}`);
  }

  rows.push("");
  rows.push(`---------------------------------------`);
  rows.push("");
  if(pedido.ENTREGA === 'Retirar no local')
    rows.push(`*Tempo para retirar em média ${window.empresa.TEMPO_RETIRADA} minutos`);
  else
    rows.push(`*Tempo de entrega em média ${window.empresa.TEMPO_ESPERA} minutos`);

  rows.push("");
  rows.push(`*${nome}*`);
  rows.push(`${masks.phone(user.telefone)}`);

  rows.push("");
  rows.push(`${pedido.ENTREGA}`);

  rows.push("");
  rows.push(`*Pagamento:* ${pedido.PAGAMENTO}`);
  
  if (pedido.VALOR_TROCO) {
    rows.push(`*Valor troco:* ${formatMoney(pedido.VALOR_TROCO)};`);
  }

  const hasRecibo = pedido.DESEJA_RECIBO === 1 && pedido.INFO_RECIBO && pedido.INFO_RECIBO !== "";
  if (hasRecibo) {
    rows.push("");
    rows.push(`*Informações para recibo:* `);
    rows.push(`${pedido.INFO_RECIBO}`);
  }

  const finalStr = rows.join(WHATSAPP_BREAK_LINE);

  const phone = `55${window.empresa.whatsapp}`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(finalStr)}`;
  window.open(url,'_blank');
}

export const clearCard = () => {
  appStore.dispatchAction(clear());

  const url = `/home${location.search}`;
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
        message: "Seu pedido foi enviado com sucesso. Obrigado!",
        textConfirm: "OK",
        onConfirm: () => {
          enviarWhatsapp(response.numPedido);
          clearCard();
        }
      });

      /*fireEvent("show-modal", {
        type: "success", 
        message: "Seu pedido foi enviado com sucesso. Obrigado! <br />Deseja enviá-lo por WhatsApp?",
        textConfirm: "Sim",
        textCancel: "Não",
        onConfirm: () => {
          enviarWhatsapp(response.numPedido);
          clearCard();
        },
        onCancel: () => {
          clearCard();
        }
      });*/
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