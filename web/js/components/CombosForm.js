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

    setMax(max) {
        this.max = +max;
        this.validateMax = this.max > 0;
    }

    render() {
        if (!this.combos.length) return;

        const template = document.getElementById("combo-form");
        this.shadowRoot.innerHTML = ""; // limpa a renderização anterior


        const selectedCard = document.createElement("div");
        selectedCard.id = "selected-card";
        selectedCard.style.border = "1px solid #ccc";
        selectedCard.style.padding = "3px";
        selectedCard.style.marginBottom = "1px";
        this.shadowRoot.appendChild(selectedCard);


        this.updateSelectedCard(); // Atualiza o conteúdo do card

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
        if (isAlreadySelected) {
            // Desmarca o item se já estiver selecionado
            this.selected.set(step.ID, currentSelections.filter(p => p.ID !== produto.ID));
            item.setAttribute("checked", false);
        } else {
            if (currentSelections.length >= step.QTDE_MAX) {
                alert(`Você só pode selecionar até ${step.QTDE_MAX} itens para: ${step.DESCRICAO}`);
                return;
            }

            // Marca o item como selecionado
            item.setAttribute("checked", true);
            const updated = [...currentSelections, produto];
            this.selected.set(step.ID, updated);
        }
        this.updateCounters();
        this.updateSelectedCard(); // Atualiza o card com os produtos selecionados
    }

    updateCounters() {
        this.combos.forEach(step => {
            const selecionados = this.selected.get(step.ID) || [];
        });
    }

    updateSelectedCard() {
        const selectedCard = this.shadowRoot.querySelector("#selected-card");
        selectedCard.innerHTML = ""; // Limpa o conteúdo anterior

        const selectedData = {};

        this.combos.forEach(step => {
            const selecionados = this.selected.get(step.ID) || [];
            if (selecionados.length) {
                selectedData[step.DESCRICAO] = selecionados.map(produto => ({
                    codigo: produto.ID,
                    descricao: produto.PRODUTO,
                    valor: produto.VALOR
                }));
            }
        });

        Object.entries(selectedData).forEach(([stepTitle, produtos]) => {
            const stepDiv = document.createElement("div");
            stepDiv.style.marginBottom = "10px";

            const title = document.createElement("h4");
            title.textContent = stepTitle;
            stepDiv.appendChild(title);

            const produtosText = produtos.map(produto => `${produto.descricao} - R$ ${produto.valor.toFixed(2)}`).join(", ");
            const produtosDiv = document.createElement("div");
            produtosDiv.textContent = produtosText;
            produtosDiv.style.fontSize = "12px";
            stepDiv.appendChild(produtosDiv);

            selectedCard.appendChild(stepDiv);
        });
    }

    tryDispatch() {
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
        console.log("Disparando kyosk-change com os combos selecionados:", value);
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