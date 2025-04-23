class ComboForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.combos = [];
    this.selected = new Map();
    this.currentIndex = 0;
  }

  connectedCallback() {
    this.render();
  }

  async loadProducts(combos) {
    this.combos = combos.sort((a, b) => a.ORDEM - b.ORDEM);
    this.selected.clear();
    this.currentIndex = 0;
    this.render();
    console.log(combos)
  }

  render() {
    const step = this.combos[this.currentIndex];
    if (!step) return;

    const { combo, produtos } = step;
    const html = `
      <h3>${combo.DESCRICAO}</h3>
      <ul>
        ${produtos.map(p => `
          <li>
            <button data-id="${p.CODPRODUTO}">
              Produto ${p.CODPRODUTO} - R$ ${p.VALOR.toFixed(2)}
            </button>
          </li>
        `).join('')}
      </ul>
    `;

    this.shadowRoot.innerHTML = html;

    this.shadowRoot.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (e) => {
          this.handleSelect(step.combo, produtos.find(p => p.CODPRODUTO === button.dataset.id));
        });
    });
  }
  handleSelect(combo, produto) {
    const selections = this.selected.get(combo.ID) || [];
    if (selections.length < combo.QTDE_MAX) {
      selections.push(produto);
      this.selected.set(combo.ID, selections);
    }

    // Avança se já atingiu o máximo
    if (selections.length >= combo.QTDE_MAX) {
      this.currentIndex++;
      if (this.currentIndex >= this.combos.length) {
        this.dispatch();
      } else {
        this.render();
      }
    }
  }

  dispatch() {
    const value = [];
    this.selected.forEach((produtos, comboId) => {
      value.push({
        comboId,
        produtos
      });
    });

    this.dispatchEvent(new CustomEvent('kyosk-change', {
      bubbles: true,
      composed: true,
      detail: { value }
    }));
  }
}


export const { name, component } = registerComponent({
  name: "combo-form",
  component: ComboForm,
});