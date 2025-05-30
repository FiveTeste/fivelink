<?php

use app\assets\CssLoader;
use yii\helpers\Json;

$this->title = 'Five - Delivery';
?>

<page-content></page-content>
<template id="page-content">

<!-- PAGE CONTENT TEMPLATE -->
    <?= CssLoader::loadCss("page-content.css") ?>

    <div class="page" style="grid-template-rows: 1fr">
        <header class="page__header header"  style="display: none;">
            <a href="/home" class="header__link">
                <div 
                    class="header__logo" 
                    style="background-image: url(<?= Yii::$app->request->baseUrl?>/images/logo/logo.png)"
                ></div>

                
            </a>
            <span class="header__nomeempresa header__title"></span>
            
            <a href="/carrinho" class="cart">
                <div class="cart__price">
                    <span id="cart_value">R$ 0,00</span>
                </div>
                <svg-icon src="shopping-cart.svg" style="color: #ddd8d8" />
            </a>
        </header>

        <main class="page__content"><slot name="content"></slot></main>

        <footer class="page__footer" style="display: none">
            <nav class="navbar">
                <a href="/home" data-href="<?= Yii::$app->request->baseUrl?>/home" class="navbar__item">
                    <svg-icon src="home.svg" />
                </a>
                <a href="/carrinho" data-href="<?= Yii::$app->request->baseUrl?>/carrinho" class="navbar__item">
                    <svg-icon src="shopping-cart.svg" />
                </a>
            </nav>
        </footer>
    </div>
    <div class="modal" style="opacity: 0; visibility: hidden;"></div>
    <prompt-modal></prompt-modal>
    <app-loader></app-loader>
</template>

<template id="wellcome-template">
    <?= CssLoader::loadCss("wellcome-page.css") ?>
    <div class="content">
        <div class="content__header header">
            <img class="header__logo" src="<?= Yii::$app->request->baseUrl?>/images/logo/logo-five.png" />
            <h1 class="header__title">Seja bem-vindo!</h1>
            <div class="header__item operation-closed" id="operation-closed">
                <svg-icon src="warning.svg" style="display: contents;color:#e83131;"></svg-icon>
                <strong style="color:#e83131;margin-left: 1rem;">Não estamos aceitando pedidos no momento!</strong>
            </div>
        </div>
        <div class="content__infos">
            <a class="info__item order-link" id="order-available" href="<?= Yii::$app->request->baseUrl?>/home">
                <svg-icon src="shopping-bag.svg" style="display: contents"></svg-icon> 
                <span class="item__text">Faça seu pedido</span>
            </a>

            <!-- <a class="info__item order-link" id="order-unavailable" disabled href="<?= Yii::$app->request->baseUrl?>/home">
                <svg-icon src="warning.svg" style="display: contents"></svg-icon> 
                <span class="item__text">Não estamos aceitando pedidos</span>
            </a> -->

            <a class="info__item insta-link" target="_blank" href="<?= $empresa->instagram ?>">
                <svg-icon src="instagram.svg" style="display: contents"></svg-icon> 
                <span class="item__text">Siga nosso Instagram</span>
            </a>
            <a class="info__item location-link" target="_blank" href="<?= $empresa->localizacao ?>">
                <svg-icon src="map-pin.svg" style="display: contents"></svg-icon> 
                <span class="item__text">Onde estamos localizados</span>
            </a>           
        </div>
        <div class="content__footer footer">
            <img class="footer__logo" src="<?= Yii::$app->request->baseUrl?>/images/logo/logo_five_footer.png" />
            <span class="footer__text">© 2022 Five tecnologia. Todos os direitos reservados</span>
        </div>
    </div>
</template>


<template id="loader-template">
    <?= CssLoader::loadCss("loader.css") ?>
    <div class="container">
        <div class="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<!-- HOME PAGE TEMPLATE -->
<template id="home-page">
    <?= CssLoader::loadCss("home.css") ?>
    <section class="highlights-container">
        <div class="glide" id="highlights-slider">
            <div class="glide__track" data-glide-el="track">
                <ul class="glide__slides highlights">
                    
                </ul>
            </div>
        </div>
    </section>

    <section class="content">
        <slot name="items"></slot>
    </section>
</template>

<!-- CARD ITEM TEMPLATE -->
<template id="card-item">
    <?= CssLoader::loadCss("card-item.css") ?>

    <article class="card">
        <div class="card__image"></div>
        <div class="card__name"><slot name="name"></slot></div>
    </article>
</template>

<!-- PRODUCT PAGE TEMPLATE -->
<template id="product-page">
    <?= CssLoader::loadCss("product.css") ?>

    <div class="product">
        <div class="product__image"></div>
        <div class="product__info">
            <div class="product__detail">
                <div class="product__name">
                    <slot name="name"></slot>
                </div>
                <div class="product__description">
                    <slot name="description"></slot>
                </div>
            </div>
            <div class="product__price price">
                <span class="price__description">Subtotal:</span>
                <div class="price__value">
                    <slot name="price">R$ 0,00</slot>
                </div>
            </div>
        </div>
        <div class="order"> 
            <strong class="order__title">Pedido:</strong>
            <span class="order__detail"></span>
        </div>
        <div class="slider">
        </div>
    </div>
</template>

<!-- PRODUCT ITEM TEMPLATE -->
<template id="product-item">
    <?= CssLoader::loadCss("product-item.css") ?>
    
    <li class="item">
        <div class="item__image image-container">
            <svg-icon class="image-container__check" src="check.svg"></svg-icon>
            <div class="image-container__image"></div>
        </div>
        <div class="item__detail">
            <div class="item__namepreco">
                <div class="item__name"><slot name="name"></slot></div>
                <div class="item__price price-container">
                    <div class="item__preco"><slot name="preco"></slot></div>
                    <div class="item__precooriginal"><slot name="preco_original"></slot></div>
                </div>  
            </div>
            <div class="product__item__description">
                <slot name="description"></slot>
            </div>
        </div>       
    </li>
</template>

<!-- COMBOS TEMPLATE -->
<template id="combo-form">
<?= CssLoader::loadCss("combo-form.css") ?>
    <div class="combo-step">
    <div class="combo-step__title" id="step-title"></div>
        <ul class="combo-step__list" id="step-list"></ul>
    </div>
</template>

<!-- CATEGORY ITEM TEMPLATE -->
<template id="category-item">
    <?= CssLoader::loadCss("category-item.css") ?>
    
    <li class="item">
        <div class="item__image"></div>
        <div class="item__name"><slot name="name"></slot></div>
    </li>
</template>


<template id="ponto-carne">
    <?= CssLoader::loadCss("ponto-carne.css") ?>

    <div class="content">
        <strong class="content__title">Escolha o ponto da carne:</strong>
        <ul class="content__list list">
            <li class="list__item item">
                <label class="item__radio radio">
                    <span>Mal passado</span>
                    <input type="radio" name="ponto" value="Mal passado" />
                </label>
            </li>
            <li class="list__item item">
                <label class="item__radio radio">
                    <span>Ao ponto</span>
                    <input type="radio" name="ponto" value="Ao ponto" />
                </label>
            </li>
            <li class="list__item item">
                <label class="item__radio radio">
                    <span>Bem passado</span>
                    <input type="radio" name="ponto" value="Bem passado" />
                </label>
            </li>
        </ul>
    </div>
</template>

<template id="usa-copos">
    <?= CssLoader::loadCss("usa-copos.css") ?>

    <div class="content">
        <strong class="content__title">Copos:</strong>
        <ul class="content__list list">
            <li class="list__item item">
                <label class="item__label" for="copo">
                    <span>Copo</span>
                    <div class="item__selector">
                        <quantity-selector name="copo" />
                    </div>
                </label>
            </li>
            <li class="list__item item">
                <label class="item__label" for="copo_gelo">
                    <span>Copo com gelo</span>
                    <div class="item__selector">
                        <quantity-selector name="copo_gelo" />
                    </div>
                </label>
            </li>
            <li class="list__item item">
                <label class="item__label" for="copo_gelo_limao">
                    <span>Copo com gelo e limão</span>
                    <div class="item__selector">
                        <quantity-selector name="copo_gelo_limao" />
                    </div>
                </label>
            </li>
        </ul>
    </div>
</template>

<template id="form-talheres">
    <?= CssLoader::loadCss("form-talheres.css") ?>

    <div class="content">
        <strong class="content__title">Pratos e talheres:</strong>
        <article class="content__selector selector">
            <quantity-selector name="talheres" class="selector__input" />
        </article>
    </div>
</template>

<template id="form-quantity">
    <?= CssLoader::loadCss("form-quantity.css") ?>

    <div class="content">
        <strong class="content__title">Observação:</strong>
        <div id="content__observation" class="content__input input">
          <span class="input__label">Alguma observação sobre o pedido?</span>
          <textarea class="input__field" id="input_observacao" maxlength="100"></textarea>
        </div> 
        <strong class="content__title">Quantidade:</strong> 
        <article id="containerQuantity" class="content__selector selector">
            <quantity-selector name="quantity" class="selector__input" minvalue="1" />
        </article>
    </div>
</template>

<!-- CARRINHO PAGE -->
<template id="cart-page">
    <?= CssLoader::loadCss("cart.css") ?>
    
    <div class="content">
        <ul class="content__list" style="padding: 0;">
            <slot name="items"></slot>
        </ul>

        <button class="content__button" id="send_cart">Finalizar pedido</button>
    </div>
</template>

<template id="finish-page">
    <?= CssLoader::loadCss("finish.css") ?>
    
    <div class="content">
        <div class="detail">
            <div class="detail__item contact">
                <client-card></client-card>
            </div>

            <div class="detail__item">
                <span class="detail__title">Entrega</span>
                <shipping-card></shipping-card>
            </div>

            <div class="detail__item">
                <span class="detail__title">Pagamento</span>
                <payment-card></payment-card>
            </div>

            <div class="detail__item">
                <span class="detail__title">Resumo</span>
                <order-summary></order-summary>
            </div>
        </div>

        <button class="content__button" id="send_cart">Finalizar</button>
    </div>
</template>

<!-- ADICIONAL ITEM -->
<template id="aditional-item">
    <?= CssLoader::loadCss("aditional-item.css") ?>

    <li class="item">
        <div class="item__detail">
            <div style="display: flex;">
                <div class="item__name"><slot name="name"></slot></div>
                <div class="item__price price"><slot name="price">R$ 0,00</slot></div>
            </div>
            
            <div class="item__observation"><slot name="observation"></slot></div>
        </div>
        <div class="item__quantity">
            <button class="button button__minus">-</button>
            <span class="quantity"></span>
            <button class="button button__plus">+</button>
            <quantity-selector></quantity-selector> 
        </div>
    </li>

</template>

<!-- OPTIONAL ITEM -->
<template id="optional-item">
    <?= CssLoader::loadCss("optional-item.css") ?>

    <li class="item">
        <div class="item__detail">
            <div class="item__name"><slot name="name"></slot></div>
            <div class="item__price price">
                <div class="price__current"><slot name="price"></slot></div>
                <div class="price__original"><slot name="original_price"></slot></div>
            </div>
        </div>
        <div class="item__checked checked">
            <svg-icon class="checked__icon" src="check-small.svg" />
        </div>
        <div class="item__quantity">
                <button class="button__add">+</button>
                <label class="quantity"><slot name="quantity"></slot></label>
                <button class="button__remove">-</button>
            </div>
    </li>

</template>


<!-- OPTIONAL ITEM -->
<template id="opcao-item">
    <?= CssLoader::loadCss("opcao-item.css") ?>

    <li class="item">
        <div class="item__detail">
            <div class="item__name"><slot name="name"></slot></div>
        </div>
        <div class="item__checked checked">
            <svg-icon class="checked__icon" src="check-small.svg" />
        </div>
    </li>

</template>

<!-- CARRINHO ITEM -->
<template id="cart-item">
    <?= CssLoader::loadCss("cart-item.css") ?>

    <div class="container">
        <li class="item">
            <div class="item__detail">
                <div style="display: flex; justify-content: space-between;">
                    <div class="item__name"><slot name="name"></slot></div>
                    <div class="item__preco"><slot name="price">R$ 0,00</slot></div>
                </div>
                
                <div class="item__observation"><slot name="observation"></slot></div>
            </div>
            <div id="quantityContainer" class="item__quantity">
                <button class="button__add">+</button>
                <label class="item__order-quantity"><slot name="order-quantity"></slot></label>
                <button class="button__remove">-</button>
            </div>
        </li>
        <div class="item__icon">
            <button class="item__button-remove">
                <svg-icon src="trash.svg" style="color: #BF4816" />
            </button>
        </div>
    </div>
</template>


<!-- REGISTER PAGE TEMPLATE -->
<template id="register-page">
    <?= CssLoader::loadCss("register.css") ?>

    <div class="page">
        <h1 class="page__title" id="page_title">Faça seu cadastro</h1>
        <form class="form">
            <label class="form__item">
                <span>Nome:</span>
                <div class="input-container">
                    <input name="nome" required />
                </div>
            </label>

            <label class="form__item">
                <span>Telefone:</span>
                <div class="input-container">
                    <input id="phone" name="telefone" inputmode="numeric" required />
                </div>
            </label>

            <label class="form__item">
                <span>Bairro:</span>
                <div class="input-container">
                    <select name="bairro_id" required >
                        <option></option>
                    </select>
                </div>
            </label>

            <label class="form__item">
                <span>Seu endereço (Rua):</span>
                <div class="input-container">
                    <input name="endereco"  required />
                </div>
            </label>

            <label class="form__item">
                <span>Número:</span>
                <div class="input-container">
                    <input name="numero" required />
                </div>
            </label>

            <label class="form__item">
                <span>Complemento:</span>
                <div class="input-container">
                    <input name="complemento" />
                </div>
            </label>

            <button class="form__button" id="send_cart">Finalizar</button>
        </form>
    </div>
</template>


<template id="client-card">
    <?= CssLoader::loadCss("client-card.css") ?>
    <div class="container">
        <span class="contact__item title" id="client_name"></span>

        <div class="contact__item phone">
            <strong>Telefone:</strong>
            <span id="client_phone"></span>
        </div>

        <div class="contact__item address">
            <strong>Endereço:</strong>
            <span id="client_address"></span>
        </div>

        <div class="actions">
            <button class="action__item" id="change_phone">Alterar telefone</button>
            <button class="action__item" id="update_registration">Atualizar cadastro</button>
        </div>
    </div>
</template>


<template id="payment-card">
    <?= CssLoader::loadCss("payment-card.css") ?>
    <div class="form">
        <label class="form__item">
            <span>Forma de pagamento:</span>
            <div class="input-container">
                <select name="payment_type" required >
                    <option></option>
                    <option value="Cartao de credito">Cartão de crédito</option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Cartao de debito">Cartão de débito</option>
                    <option value="Pix">PIX</option>
                </select>
            </div>

            
            <div id="input-box-chave-pix" hidden="true">
                <button class="button-add-chave-pix" id="btn-chave-pix">
                    <svg-icon src="copy-outline-icon.svg" style="width: 16px; height: 16px; display: flex; margin-right: 0.5rem;"></svg-icon>  Copiar chave PIX
                </button>
                <div style="text-align: center;">                    
                    <span id="input-chave-pix"></span>
                </div>
            </div>
        </label>
    </div>

    <button class="button-add-cupom" id="add-cupom">
        <svg-icon src="plus.svg" style="display: flex; margin-right: 0.5rem;"></svg-icon>  Adicionar cupom
    </button>
    <div class="cupom" id="cupom-detail">
        <div class="cupom__container">
            <div class="cupom__description cupom__item">
                <span class="cupom__name" id="cupom-name"></span>
                <span class="cupom__value" id="cupom-value"></span>
            </div>
            <button class="cupom__item" id="remove-cupom">Remover cupom</button>
        </div>
    </div>
</template>


<template id="shipping-card">
    <?= CssLoader::loadCss("shipping-card.css") ?>
    <ul class="content__list list">
        <li class="list__item item">
            <label class="item__radio radio">
                <span id="address"></span>
                <input type="radio" name="shipping" value="1" />
            </label>
        </li>
        <li class="list__item item">
            <label class="item__radio radio">
                <span>Retirar no local</span>
                <input type="radio" name="shipping" value="0" />
            </label>
        </li>
    </ul>
</template>


<template id="order-summary">
    <?= CssLoader::loadCss("order-summary.css") ?>
    <div class="container">
        <div class="container__item">
            <strong>Total dos itens:</strong>
            <span id="total-value"></span>
        </div>

        <div class="container__item">
            <strong>Taxa de entrega:</strong>
            <span id="shipping-tax"></span>
        </div>

        <div class="container__item">
            <strong>Descontos:</strong>
            <span id="discount"></span>
        </div>

        <div class="container__item">
            <strong>Total:</strong>
            <span id="total-final"></span>
        </div>
    </div>
</template>

<script type="text/javascript">
    window.onbeforeunload = function(){        
        return "";
    };
    

    window.addEventListener('popstate', function(event) {
    
        
        //console.log('evento na pagina',window.location.pathname);
        /*const atual = window.location.pathname.split('/');
        const page = atual.length > 0 ? `/${atual[atual.length - 2]}/${atual[atual.length - 1]}` : '';
        console.log('pagina atual',page);
        if(page == window.location.returnnavigation){
            console.log('voltar ao inicio',page ,'navegado', window.location.returnnavigation);
        }else{
            console.log('outra pagina',page ,'navegado', window.location.returnnavigation);
        }*/

        //history.pushState(null, null, window.location.pathname);

    }, false);

    window.baseUrl = '<?= Yii::$app->request->baseUrl; ?>';
    window.painelUrl = '<?= $painelUrl ?>';
    window.empresa = <?= Json::encode($empresa) ?>;

    
    
    window.onload = (event) => {

        
    };
    
</script>

<script src="<?= Yii::$app->request->baseUrl?>/js/dependencies/crypto-js.min.js"></script>
<script src="<?= Yii::$app->request->baseUrl?>/js/dependencies/glide.min.js"></script>

<script type="module" src="<?= Yii::$app->request->baseUrl?>/js/imports.js"></script>
<script type="module" defer src="<?= Yii::$app->request->baseUrl?>/js/loadGlobalComponents.js"></script>
<script type="module" defer src="<?= Yii::$app->request->baseUrl?>/js/router.js"></script>
