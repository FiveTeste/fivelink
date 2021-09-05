<?php
$this->title = 'Kyosk online';
?>

<page-content></page-content>

<!-- PAGE CONTENT TEMPLATE -->
<template id="page-content">
    <link href="/web/css/new/page-content.css" rel="stylesheet" />

    <div class="page">
        <header class="page__header">
            <h1 class="page__title">Kyosk Online</h1>
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


<!-- PRODUCTS PAGE TEMPLATE -->
<template id="products-page">
    <div id="item-id"></div>
</template>


<script type="text/javascript">
    window.baseUrl = '<?php echo Yii::$app->request->baseUrl; ?>';
    window.nummesa = '<?php echo $mesa ?>';
</script>

<script type="module" src="/web/js/imports.js"></script>
<script type="module" defer src="/web/js/components/PageContent.js"></script>
<script type="module" defer src="/web/js/router.js"></script>