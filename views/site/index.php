<?php
$this->title = 'Kyosk online';
?>

<page-content></page-content>

<!-- PAGE CONTENT TEMPLATE -->
<template id="page-content">
    <link href="/web/css/new/page-content.css" rel="stylesheet" />

    <div class="page">
        <header class="page__header">
            <a href="/web/" class="cart">
                <h1 class="page__title">Kyosk Online</h1>
            </a>
            
            <a href="/web/carrinho" class="cart">
                <div class="cart__price">
                    <span id="cart_value">R$ 0,00</span>
                </div>
                <object
                    type="image/svg+xml"
                    data="/web/icons/shopping-cart.svg" 
                    data-type="svg-icon" 
                    data-icon-stroke="#0E252B"
                ></object>
            </a>
        </header>

        <main class="page__content"><slot name="content"></slot></main>

        <footer class="page__footer">
            <nav class="navbar">
                <a href="/web/" class="navbar__item">
                    <object
                        type="image/svg+xml"
                        data="/web/icons/home.svg" 
                        data-type="svg-icon" 
                        data-icon-stroke="red" 
                    ></object>
                </a>
                <a href="/web/carrinho" class="navbar__item">
                    <object
                        type="image/svg+xml"
                        data="/web/icons/shopping-cart.svg" 
                        data-type="svg-icon" 
                    ></object>
                </a>
            </nav>
        </footer>
    </div>
</template>

<!-- HOME PAGE TEMPLATE -->
<template id="home-page">
    <link href="/web/css/new/home.css" rel="stylesheet" />

    <section class="banner">
        <div class="banner__logo"></div>
        <div class="banner__mesa">Mesa: <?php echo $mesa ?></div>
    </section>

    <section class="content">
        <slot name="items"></slot>
    </section>
</template>

<!-- CARD ITEM TEMPLATE -->
<template id="card-item">
    <link href="/web/css/new/card-item.css" rel="stylesheet" />

    <article class="card">
        <img class="card__image" loading="lazy" />
        <div class="card__name"><slot name="name"></slot></div>
    </article>
</template>


    <!-- PRODUCT ITEM TEMPLATE -->
<template id="product-item">
    <link rel="stylesheet" href="/web/css/new/product-item.css">
    
    <li class="item">
        <img class="item__image" loading="lazy" />
        <div class="item__detail">
            <div class="item__name"><slot name="name"></slot></div>
            <div class="item__preco"><slot name="preco"></slot></div>
        </div>
    </li>
</template>


<!-- CATEGORY ITEM TEMPLATE -->
<template id="category-item">
    <link rel="stylesheet" href="/web/css/new/category-item.css">
    
    <li class="item">
        <img class="item__image" loading="lazy" />
        <div class="item__name"><slot name="name"></slot></div>
    </li>
</template>


<!-- CATEGORIES PAGE TEMPLATE -->
<template id="product-page">
    <link rel="stylesheet" href="/web/css/new/product.css">

    <div class="product">
        <img class="product__image" src="/web/images/new/food.jpg" />
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
        <div class="slider">
        </div>
    </div>
</template>


<template id="ponto-carne">
    <link rel="stylesheet" href="/web/css/new/ponto-carne.css">

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
    <link rel="stylesheet" href="/web/css/new/usa-copos.css">

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
    <link rel="stylesheet" href="/web/css/new/form-talheres.css">

    <div class="content">
        <strong class="content__title">Pratos e talheres:</strong>
        <article class="content__selector selector">
            <quantity-selector name="talheres" class="selector__input" />
        </article>
    </div>
</template>

<template id="form-quantity">
    <link rel="stylesheet" href="/web/css/new/form-quantity.css">

    <div class="content">
        <strong class="content__title">Quantidade:</strong>
        <article class="content__selector selector">
            <quantity-selector name="quantity" class="selector__input" />
        </article>
    </div>
</template>


<script type="text/javascript">
    window.baseUrl = '<?php echo Yii::$app->request->baseUrl; ?>';
    window.nummesa = '<?php echo $mesa ?>';
</script>

<script type="module" src="/web/js/imports.js"></script>
<script type="module" defer src="/web/js/components/PageContent.js"></script>
<script type="module" defer src="/web/js/router.js"></script>