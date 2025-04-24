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
    }

    render() {
        const step = this.combos[this.currentIndex];
        if (!step) return;

        const combo = this.combos;
        const produtos = step.PRODUTOS_COMBO;

        const template = document.getElementById("combo-form");
        const content = template.content.cloneNode(true);

        content.querySelector("#step-title").textContent = this.DESCRICAO;

        const list = content.querySelector("#step-list");
        console.log(produtos, 'comb0')

        produtos.forEach(produto => {
            const item = document.createElement("product-item");

            item.setAttribute("image", produto.FOTO);
            item.setAttribute("checked", false);

            // slots
            const nameSlot = document.createElement("span");
            nameSlot.slot = "name";
            nameSlot.textContent = `Produto ${produto.PRODUTO}`;

            const precoSlot = document.createElement("span");
            precoSlot.slot = "preco";
            precoSlot.textContent = `R$ ${produto.VALOR.toFixed(2)}`;

            const descSlot = document.createElement("span");
            descSlot.slot = "description";
            descSlot.textContent = produto.DESCRICAO || "";

            item.appendChild(nameSlot);
            item.appendChild(precoSlot);
            item.appendChild(descSlot);

            item.product = produto;

            item.addEventListener("kyosk-click", () => {
                this.handleSelect(combo, produto, item);
            });

            list.appendChild(item);
        });

        this.shadowRoot.innerHTML = ""; 
        this.shadowRoot.appendChild(content);

    }
    handleSelect(combo, produto, item) {
        const currentSelections = this.selected.get(combo.ID) || [];
        const selections = [...currentSelections, produto];

        this.selected.set(combo.ID, selections);

        item.setAttribute("checked", true);

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