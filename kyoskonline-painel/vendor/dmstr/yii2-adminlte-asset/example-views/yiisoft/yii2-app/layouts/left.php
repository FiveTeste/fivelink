<aside class="main-sidebar">

    <section class="sidebar">

        <!-- Sidebar user panel -->
        <div class="user-panel">
            <div class="pull-left image">
                <img src="<?= $directoryAsset ?>/img/avatar5.png" class="img-circle" alt="User Image"/>
            </div>
            <div class="pull-left info">
                <p><?= Yii::$app->user->identity->username ?></p>

                <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
        </div>

        <!-- search form -->
        <form action="#" method="get" class="sidebar-form">
            <div class="input-group">
                <input type="text" name="q" class="form-control" placeholder="Search..."/>
              <span class="input-group-btn">
                <button type='submit' name='search' id='search-btn' class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
              </span>
            </div>
            
        </form>
        <!-- /.search form -->

        <?= dmstr\widgets\Menu::widget(
            [
                'options' => ['class' => 'sidebar-menu'],
                'items' => [
                    [
                        'label' => 'Suporte',
                        'icon' => 'fa fa-share',
                        'active'=>'active',
                        'url' => '#',
                        'items' => [
                            ['label' => 'Produtos', 'icon' => '  fa-users', 'url' => ['/produto/index'],],
                            //['label' => 'Vendas', 'icon' => ' fa  fa-cc-diners-club', 'url' => ['/venda','cnpj'=>''],],
                            //['label' => 'Dispositivos', 'icon' => ' fa-mobile', 'url' => ['/empresadispositivo','cnpj'=>''],],
                            //['label' => 'Liberação Offline - Five', 'icon' => ' fa  fa-unlock', 'url' => ['/fivecliente/liberacaooff'],],
                           
                        ],
                    ],
                ],
            ]
        ) ?>

    </section>

</aside>
