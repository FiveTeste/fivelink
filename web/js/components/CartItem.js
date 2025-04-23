import { removeItem, incrementItem, decrementItem, countOrder } from "../store/actions.js";
class CartItem extends HTMLElement {
  constructor(){
    super();

    const template = document.getElementById("cart-item");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(content);
  }

  handleDelete() {    
    const index = this.index;
    fireEvent("show-modal", {
      message: "Deseja realmente excluir o item?",
      onConfirm: ()=>{
        this.store.dispatchAction(removeItem({ index }));
        this.store.dispatchAction(countOrder());
        const itensCart = this.store.state.items.length;
        isNaN(itensCart) ? itensCart = 0 : itensCart;
        if(itensCart === 0){
          const url = `/home${window.location.search}`;
          Router.go(url);
        }
      },
      textConfirm: "Confirmar",
      onCancel: () => {
  
      },
      textCancel: "Cancelar"
    });

    //this.store.dispatchAction(removeItem({ index }));
  }

  handleIncrement() {
    const index = this.index;
    this.store.dispatchAction(incrementItem({ index }));
  }

  handleDecrement() {
    const index = this.index;
    this.store.dispatchAction(decrementItem({ index }));
  }

  connectedCallback() {
    const buttonPlus = this.shadowRoot.querySelector(".item__quantity button.button__add");
    const buttonMinus = this.shadowRoot.querySelector(".item__quantity button.button__remove");

    buttonPlus.addEventListener("click", this.handleIncrement.bind(this));
    buttonMinus.addEventListener("click", this.handleDecrement.bind(this));

    const deleteButton = this.shadowRoot.querySelector("button.item__button-remove");
    deleteButton.addEventListener("click", this.handleDelete.bind(this));

    /*const quantityContainer = this.shadowRoot.querySelector(".item__quantity");
    quantityContainer.addEventListener("click",function(){
      fireEvent("show-modal", {
        message: "Senhor(a) cliente, caso o pedido tenha adicionais ou mais de uma opção "+
        "marcada em opções de sabores, não será possível alterar a quantidade!",
        textConfirm: "Ok"
      });
    });*/
  }

  disconnectedCallback() {
    const buttonPlus = this.shadowRoot.querySelector(".item__quantity button.button__add");
    const buttonMinus = this.shadowRoot.querySelector(".item__quantity button.button__remove");

    buttonPlus.removeEventListener("click", this.handleIncrement.bind(this));
    buttonMinus.removeEventListener("click", this.handleDecrement.bind(this));

    const deleteButton = this.shadowRoot.querySelector("button.item__button-remove");
    deleteButton.removeEventListener("click", this.handleDelete.bind(this));
  }
}

export const { name,component } = registerComponent({
  name: "cart-item",
  component: CartItem
})