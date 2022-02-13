import { appStore } from "../store/app.js";
import { api } from "../services/api.js";

import { sumTotalPrice, getShippingTax } from "./calcs.js";
import { formatMoney } from "./numberFormat.js";

export const validateCupomDate = (cupom) => {
  const currentDate = new Date();
  const dateStart = new Date(cupom.datahora_inicial);
  const dateEnd = new Date(cupom.datahora_final);

  const currentTime = currentDate.getTime();
  const timeStart = dateStart.getTime();
  const timeEnd = dateEnd.getTime();

  if (currentTime < timeStart) return false;
  return currentTime < timeEnd;
}

export const validateMinValue = (cupom) => {
  const state = appStore.state;
  const { items = [] } = state;

  const totalPrice = sumTotalPrice(items);
  const shippingTax = getShippingTax(state);

  const totalFinal = parseFloat(totalPrice) + parseFloat(shippingTax);

  if (totalFinal < cupom.valor_minimo) {
    fireEvent("show-modal", {
      type: "error",
      message: `Valor minimo ${formatMoney(cupom.valor_minimo)}!`
    });

    return false;
  }

  return true;
}

export const getCupom = async (value) => {
  try {
    const url = `cupom&cupom=${value}`;
    const cupom = await api(url, {
      method: "GET"
    });

    const cupomIsValid = validateCupomDate(cupom);
    if (!cupomIsValid) {
      fireEvent("show-modal", {
        type: "error",
        message: "Cupom de desconto inválido!"
      });
      return;
    }

    if (validateMinValue(cupom)) {
      return cupom;
    }
  } catch (err) {
    if (err.data.message) {
      fireEvent("show-modal", {
        type: "error",
        message: "Cupom de desconto inválido!"
      });
    } else {
      fireEvent("show-modal", {
        type: "error",
        message: "Não foi possível carregar o cupom de desconto!"
      });
    }
  }
}

