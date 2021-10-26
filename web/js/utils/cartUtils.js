import { appStore } from "../store/app.js";
import { clear } from "../store/actions.js";

import { api } from "../services/api.js";
import { isPromotional } from "./isPromotional.js";

const createMontadoObject = (item) => {
  const itemPrice = isPromotional(item) ? item.PRECO_PROMOCAO : item.PRECOVENDA;

  return { 
    CODPRODUTO: item.CODIGO,
    PRECO: itemPrice
  }
}

const createAdditionalObject = (item) => {
  const itemPrice = isPromotional(item) ? item.PRECO_PROMOCAO : item.PRECOVENDA;

  return {
    CODADICIONAL: item.CODIGO,
    QTDE: 1,
    PRECO: itemPrice.toFixed(2),
    CODITEM: item.ISADICIONAL_COD
  }
}

const createOpcoesObject = (item) => {
  return {
    CODPRODUTO: item.CODIGO,
    CODINGREDIENTE: item.ISINGREDIENTE_CODINGREDIENTE,
    CODITEM: item.ISINGREDIENTE_COD,
    CANCELADO: 0,
    PAGO: "N"
  }
}

const createOptionalObject = (item) => {
  return {
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
  const currentDate = new Date();

  const mesa = {
    COD_MESA: window.nummesa,
    DATA: currentDate.toLocaleDateString(),
    HORA: currentDate.toLocaleTimeString(),
    EMPRESA: "000001",
    COD_FUNCIONARIO: "000001",
    NUM_MESA_ACOMODACAO: 0,
    ACRESCIMO: 0,
    SITUACAO: 0
  }

  const finalItems = cartItems.map(createItemToSendObject);
  return {
    mesa,
    pedido: finalItems
  }
}

export const sendCart = async (token) => {
  const requestData = createRequestObject();

  const url = `salvarpedido&&token=${token}`;

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
        message: "Seu pedido será entregue em instantes. Obrigado!",
        onConfirm: () => {
          appStore.dispatchAction(clear());

          const url = `/web/${location.search}`;
          Router.go(url);
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