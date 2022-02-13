import { api } from "../services/api.js";

import { userStore } from "../store/user.js";
import { setPhone, setAddress, setUser } from "../store/userActions.js";

export const findClient = async ({ value: telefone }) => {
  fireEvent("show-loader");

  const url = `cliente&telefone=${telefone}`;

  let client;
  try {
    const response = await api(url);
    const { bairro_id, bairro, endereco, numero, complemento, ...user } = response;
    const address = {
      bairro,
      bairro_id, 
      endereco, 
      numero, 
      complemento
    };

    userStore.dispatchAction(setUser(user));
    userStore.dispatchAction(setAddress(address));

    client = user;
  } catch (err) {
    if (err.data.message === "client not found") {
      fireEvent("show-modal", { 
        type: "warning",
        message: "Telefone não cadastrado, realize o cadastro para finalizar o pedido.",
        onConfirm: () => {
          Router.go(`/cadastro`)
        }
      });

      userStore.dispatchAction(setPhone(telefone));
    }

  } finally {
    fireEvent("close-loader");
  }

  return client;
}