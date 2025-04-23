import { addCupom, removeCupom, setPayment } from "../store/actions.js";
import { getCupom, validateCupomDate, validateMinValue } from "../utils/cupom.js";
import { formatMoney } from "../utils/numberFormat.js";

class PaymentCard extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("payment-card");
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(content);
  }

  async applyCupom({ value }) {
    fireEvent("show-loader");
    const cupom = await getCupom(value);
    fireEvent("close-loader");
    if (!cupom) {
      this.handleRemoveCupom();
    } else {
      this.store.dispatchAction(addCupom(cupom));
    }
  }

  handleAddCupom() {
    fireEvent("show-prompt", {
      text: "Informe o cupom de desconto.",
      confirmText: "Confirmar",
      cancelText: "Cancelar",
      onConfirm: this.applyCupom.bind(this)
    });
  }

  handleRemoveCupom() {
    this.store.dispatchAction(removeCupom());
  }

  getValidCupom(cupom) {
    if (!cupom) return;

    const isValidCupomDate = validateCupomDate(cupom);
    const isValidCupomValue = validateMinValue(cupom);

    if (isValidCupomDate && isValidCupomValue) {
      return cupom;
    }
  }

  onChangeCupom({ cupom }) {
    const validCupom = this.getValidCupom(cupom);

    const buttonAddCupom = this.shadowRoot.getElementById("add-cupom");
    const cupomDetailContainer = this.shadowRoot.getElementById("cupom-detail");
    const cupomNameContainer = cupomDetailContainer.querySelector("#cupom-name");
    const cupomValueContainer = cupomDetailContainer.querySelector("#cupom-value");


    if (validCupom) {
      buttonAddCupom.style.setProperty("display", "none");
      cupomDetailContainer.style.setProperty("display", "block");

      const isPercentage = validCupom.porcentagem === 1;
      const cupomValue = isPercentage ? `${validCupom.valor}%` : formatMoney(validCupom.valor);

      cupomNameContainer.textContent = validCupom.cupom;
      cupomValueContainer.textContent = `(-${cupomValue})`;
    } else {
      buttonAddCupom.style.setProperty("display", "flex");
      cupomDetailContainer.style.setProperty("display", "none");

      cupomNameContainer.textContent = "";
      cupomValueContainer.textContent = "";
    }
  }

  onChangeInput(event) {
    const value = event.target.value;
    const dispatchValue = value && value !== "" ? value : undefined;

    this.store.dispatchAction(setPayment(dispatchValue));

    const boxpix = this.shadowRoot.getElementById("input-box-chave-pix"); 
    const chavepix = this.shadowRoot.getElementById("input-chave-pix");    
    if(dispatchValue === 'Pix' && chavepix.textContent !== ''){
      boxpix.removeAttribute("hidden");      
    }else{
      boxpix.setAttribute("hidden", true);      
    }
  }

  onCopyChavePix(event){
    const chavepix = this.shadowRoot.getElementById("input-chave-pix");    
    navigator.clipboard.writeText(chavepix.textContent);  
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-bottom-full-width",
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
    toastr.success("A chave Pix foi copiada.");   
  }

  connectedCallback() {
    this.onChangeCupom(this.store.state);

    const paymentSelect = this.shadowRoot.querySelector(`select[name="payment_type"]`);
    const buttonAddCupom = this.shadowRoot.getElementById("add-cupom");
    const buttonRemoveCupom = this.shadowRoot.getElementById("remove-cupom");
    const buttonChavePix = this.shadowRoot.getElementById("btn-chave-pix");

    buttonAddCupom.addEventListener("click", this.handleAddCupom.bind(this));
    buttonRemoveCupom.addEventListener("click", this.handleRemoveCupom.bind(this));

    paymentSelect.addEventListener("change", this.onChangeInput.bind(this));

    buttonChavePix.addEventListener("click", this.onCopyChavePix.bind(this));
    const chavepix = this.shadowRoot.getElementById("input-chave-pix");

    const chave_pix_value = window.empresa.CHAVE_PIX || '';
    chavepix.textContent = chave_pix_value;

    this.store.addListener(this.onChangeCupom.bind(this));
  }

  disconnectedCallback() {
    const buttonAddCupom = this.shadowRoot.getElementById("add-cupom");
    const buttonRemoveCupom = this.shadowRoot.getElementById("remove-cupom");

    buttonAddCupom.removeEventListener("click", this.handleAddCupom.bind(this));
    buttonRemoveCupom.removeEventListener("click", this.handleRemoveCupom.bind(this));
  }
}


export const { name, component } = registerComponent({
  name: "payment-card",
  component: PaymentCard
});