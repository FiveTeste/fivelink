import { api } from "../services/api.js";

async function finishOrder(token, quantity) {
  const url = `fecharmesa`;

  const requestData = {
    token,
    quantidade: quantity
  }

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
        message: "Em breve um garçon virá até sua mesa. Obrigado!",
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
        } else {
          fireEvent("show-modal", { 
            type: "error", message: "Não foi possível pedir sua conta."
          });
        }
      }
    } else {
      fireEvent("show-modal", { 
        type: "error", message: "Não foi possível pedir sua conta."
      });
    }
  }
}

function quantityPrompt(token) {
  fireEvent("quantity-prompt", {
    message: "Dividir a conta em:",
    confirmText: "Finalizar",
    cancelText: "Cancelar",
    onConfirm: (value) => {
      finishOrder(token, value);
    }, 
    onCancel: () => {}
  });
}

function readQr() {
  fireEvent("show-qr-reader", { onResult: quantityPrompt });
}

export function closeOrder() {
  fireEvent("show-modal", { 
    type: "warning",
    message: "Para pedir sua conta escaneie o QRCode presente em sua mesa.",
    onConfirm: readQr
  });
}