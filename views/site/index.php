<?php
$this->title = 'Kyosk online';
?>

<header>
    <h1>Kyosk Online</h1>
</header>

<main></main>

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
    <link rel="stylesheet" href="/web/css/new/products-page.css">
    
    <ul class="content">
        <slot name="items"></slot>
    </ul>
</template>
    
    <!-- PRODUCT ITEM TEMPLATE -->
<template id="product-item">
    <link rel="stylesheet" href="/web/css/new/product-item.css">
    
    <li class="item">
        <img class="item__image" loading="lazy" />
        <div class="item__name"><slot name="name"></slot></div>
        <div>
            <div class="item__preco"><slot name="preco"></slot></div>
        </div>
    </li> 
</template>


<script type="text/javascript">
    window.baseUrl = '<?php echo Yii::$app->request->baseUrl; ?>';
    window.nummesa = '<?php echo $mesa ?>';
</script>

<script type="module" src="/web/js/imports.js"></script>
<script type="module" defer src="/web/js/router.js"></script>