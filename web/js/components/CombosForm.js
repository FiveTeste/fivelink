class ComboForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.combos = [];
        this.selected = new Map();
        // this.currentIndex = 0;
    }

    connectedCallback() {
        this.render();
    }

    async loadProducts(combos) {
        this.combos = combos.sort((a, b) => a.ORDEM - b.ORDEM);
        this.selected.clear();
        // this.currentIndex = 0;
        this.render();
    }

    render() {
        if (!this.combos.length) return;
        console.log(this.combos);

        const template = document.getElementById("combo-form");
        this.shadowRoot.innerHTML = ""; // limpa a renderização anterior
    
        this.combos.forEach(combo => {
            const content = template.content.cloneNode(true);
    
            content.querySelector("#step-title").textContent = combo.DESCRICAO;
    
            const list = content.querySelector("#step-list");
    
            combo.PRODUTOS_COMBO.forEach(produto => {
                const item = document.createElement("product-item");

                // Resolve o caminho completo da imagem
                const imagePath = `${window.painelUrl}/${produto.FOTO}`;
                item.setAttribute("image", imagePath);
                item.setAttribute("checked", false);
    
                const nameSlot = document.createElement("span");
                nameSlot.slot = "name";
                nameSlot.textContent = produto.PRODUTO;

    
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
    
            this.shadowRoot.appendChild(content);
        });

    }
    handleSelect(step, produto, item) {
        const currentSelections = this.selected.get(step.ID) || [];

        const isAlreadySelected = currentSelections.find(p => p.ID === produto.ID);
        if (isAlreadySelected) return;
    
        if (currentSelections.length >= step.QTDE_MAX) return;
    
        item.setAttribute("checked", true);
        const updated = [...currentSelections, produto];
        this.selected.set(step.ID, updated);
    
        // Atualiza contadores visuais se quiser (opcional)
        this.updateCounters();
    }

    updateCounters() {
        this.combos.forEach(step => {
            const selecionados = this.selected.get(step.ID) || [];
            console.log(`Combo "${step.DESCRICAO}" selecionados: ${selecionados.length}/${step.QTDE_MAX}`);
            // Você pode atualizar isso no DOM se quiser mostrar isso na interface.
        });
    }

    tryDispatch() {
        // Verifica se todos os steps foram preenchidos com quantidade suficiente
        for (const step of this.combos) {
            const selecionados = this.selected.get(step.ID) || [];
            if (selecionados.length < step.QTDE_MIN) {
                alert(`Selecione pelo menos ${step.QTDE_MIN} item(ns) para: ${step.DESCRICAO}`);
                return;
            }
        }

        const value = [];
        this.selected.forEach((produtos, comboId) => {
            value.push({ comboId, produtos });
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