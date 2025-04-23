import "../components/QuantitySelector.js";

class FormQuantity extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("form-quantity");
    const content = template.content.cloneNode(true);
    
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(content);
    
  }

  handleChange(event) {
    const field = this.shadowRoot.querySelector("#input_observacao");
    const value1 = field ? field.value : "";
    //const value = event.detail.value;
    const value = { quantity: event.detail.value,observation : value1}

    const detail = {value};
    this.dispatchEvent(new CustomEvent("kyosk-change", { detail }));   

    if (value > 0) {
      fireEvent("toggle-form-slider", { enabled: true });
    }
  }

  handleChange_obs(e) {
    const field = this.shadowRoot.querySelector("#input_observacao");
    const field_qtde = this.shadowRoot.querySelector("#quantity");
    const value1 = field ? field.value : "";
    const qtde = field_qtde ? parseFloat(field_qtde.value) : 1;

    const value = { quantity: qtde,observation : value1}
    const detail = { value };
    this.dispatchEvent(new CustomEvent("kyosk-change", { detail }));
  }

  connectedCallback() {
    this.handleChange = this.handleChange.bind(this);

    const selector = this.shadowRoot.querySelector("quantity-selector");
    selector.addEventListener("kyosk-change", this.handleChange);

    const field = this.shadowRoot.querySelector("#input_observacao");
    field.addEventListener("change", this.handleChange_obs.bind(this));

    const quantitiContainer = this.shadowRoot.querySelector("#containerQuantity");
    quantitiContainer.addEventListener('click',function(){
      var qtdeProdutos = window.qtdeProdutos;
      isNaN(qtdeProdutos) ? qtdeProdutos = 1 : qtdeProdutos;  

      var qtdeAdicionais = window.qtdeAdicionais;
      isNaN(qtdeAdicionais) ? qtdeAdicionais = 0 : qtdeAdicionais;
      
      if((qtdeProdutos > 2) || (qtdeAdicionais > 0)){
        const mnsg = "Olá! Não é possível alterar a quantidade em pedidos com adicionais ou mais de uma opção de sabores.</br>"+
        "Adicione o item ao carrinho e faça um novo pedido!";
        toastr.options = {
          "closeButton": true,
          "debug": false,
          "newestOnTop": false,
          "progressBar": false,
          "positionClass": "toast-bottom-right",
          "preventDuplicates": false,
          "onclick": null,
          "showDuration": "300",
          "hideDuration": "1000",
          "timeOut": "6000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        }
        toastr.success(mnsg);       
      }
    });

    fireEvent("toggle-form-slider", { enabled: true });        
  }

  disconnectedCallback() {
    const selector = this.shadowRoot.querySelector("quantity-selector");
    selector.removeEventListener("kyosk-change", this.handleChange);

    const field = this.shadowRoot.querySelector("#input_observacao");
    field.removeEventListener("change", this.handleChange_obs.bind(this));
  }
}

export const { name, component } = registerComponent({
  name: "form-quantity",
  component: FormQuantity
});