<?php

use app\assets\CssLoader;

$this->title = 'Kyosk online';
?>

<page-content></page-content>

<!-- PAGE CONTENT TEMPLATE -->
<template id="page-content">
    <?= CssLoader::loadCss("new/page-content.css") ?>

    <div class="page">
        <header class="page__header header">
            <a href="/web/" class="header__link">
                <div class="header__logo"></div>
                <!-- <h1 class="header__title">Kyosk</h1> -->
            </a>
            
            <a href="/web/carrinho" class="cart">
                <div class="cart__price">
                    <span id="cart_value">R$ 0,00</span>
                </div>
                <svg-icon src="/web/icons/shopping-cart.svg" style="color: #ddd8d8" />
            </a>
        </header>

        <main class="page__content"><slot name="content"></slot></main>

        <footer class="page__footer">
            <nav class="navbar">
                <a href="/web/" class="navbar__item">
                    <svg-icon src="/web/icons/home.svg" />
                </a>
                <a href="/web/carrinho" class="navbar__item">
                    <svg-icon src="/web/icons/shopping-cart.svg" />
                </a>
                <a href="#" data-action="end-order" class="navbar__item">
                    <svg-icon src="/web/icons/order-list.svg" />
                </a>
            </nav>
        </footer>
    </div>
    <div class="modal" style="opacity: 0; visibility: hidden;">
    </div>
</template>

<!-- HOME PAGE TEMPLATE -->
<template id="home-page">
    <?= CssLoader::loadCss("new/home.css") ?>

    <div class="mesa">
        Mesa: <?php echo $mesa ?>
    </div>

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
    <?= CssLoader::loadCss("new/card-item.css") ?>

    <article class="card">
        <div class="card__image"></div>
        <div class="card__name"><slot name="name"></slot></div>
    </article>
</template>

<!-- PRODUCT PAGE TEMPLATE -->
<template id="product-page">
    <?= CssLoader::loadCss("new/product.css") ?>

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
    <?= CssLoader::loadCss("new/product-item.css") ?>
    
    <li class="item">
        <div class="item__image image-container">
            <svg-icon class="image-container__check" src="/web/icons/check.svg"></svg-icon>
            <div class="image-container__image"></div>
        </div>
        <div class="item__detail">
            <div class="item__name"><slot name="name"></slot></div>
            <div class="item__price price-container">
                <div class="item__preco"><slot name="preco"></slot></div>
                <div class="item__precooriginal"><slot name="preco_original"></slot></div>
            </div>
        </div>
    </li>
</template>

<!-- CATEGORY ITEM TEMPLATE -->
<template id="category-item">
    <?= CssLoader::loadCss("new/category-item.css") ?>
    
    <li class="item">
        <div class="item__image"></div>
        <div class="item__name"><slot name="name"></slot></div>
    </li>
</template>


<template id="ponto-carne">
    <?= CssLoader::loadCss("new/ponto-carne.css") ?>

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
    <?= CssLoader::loadCss("new/usa-copos.css") ?>

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
    <?= CssLoader::loadCss("new/form-talheres.css") ?>

    <div class="content">
        <strong class="content__title">Pratos e talheres:</strong>
        <article class="content__selector selector">
            <quantity-selector name="talheres" class="selector__input" />
        </article>
    </div>
</template>

<template id="form-quantity">
    <?= CssLoader::loadCss("new/form-quantity.css") ?>

    <div class="content">
        <strong class="content__title">Quantidade:</strong>
        <article class="content__selector selector">
            <quantity-selector name="quantity" class="selector__input" minvalue="1" />
        </article>
    </div>
</template>

<!-- CARRINHO PAGE -->
<template id="cart-page">
    <?= CssLoader::loadCss("new/cart.css") ?>
    
    <div class="content">
        <ul class="content__list" style="padding: 0;">
            <slot name="items"></slot>
        </ul>

        <button class="content__button" id="send_cart">Finalizar pedido</button>
    </div>
</template>

<!-- CARRINHO ITEM -->
<template id="cart-item">
    <?= CssLoader::loadCss("new/cart-item.css") ?>

    <div class="container">
        <li class="item">
            <img class="item__image" loading="lazy" />
            <div class="item__detail">
                <div style="display: flex; justify-content: space-between;">
                    <div class="item__name"><slot name="name"></slot></div>
                    <div class="item__preco"><slot name="price">R$ 0,00</slot></div>
                </div>
                
                <div class="item__observation"><slot name="observation"></slot></div>
            </div>
            <div class="item__quantity">
                <button class="button__add">+</button>
                <label class="item__order-quantity"><slot name="order-quantity"></slot></label>
                <button class="button__remove">-</button>
            </div>
        </li>
        <div class="item__icon">
            <button class="item__button-remove">
                <svg-icon src="/web/icons/trash.svg" style="color: #BF4816" />
            </button>
        </div>
    </div>

</template>



<script type="text/javascript">
    window.baseUrl = '<?= Yii::$app->request->baseUrl; ?>';
    window.nummesa = '<?= $mesa ?>';
</script>

<script src="/web/js/jsQR.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
<script src="https://unpkg.com/@glidejs/glide"></script>

<script type="module" src="/web/js/imports.js"></script>
<script type="module" defer src="/web/js/loadGlobalComponents.js"></script>
<script type="module" defer src="/web/js/router.js"></script>