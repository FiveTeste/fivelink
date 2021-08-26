<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;
use yii\helpers\Url;

/* @var $this yii\web\View */
/* @var $searchModel app\models\ItemSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Items';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="item-index">



<?php Pjax::begin(); ?>
    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?=
        Html::a(
                '<i"></i>', Url::to(['venda/index', 'cnpj' => Yii::$app->session['cnpj']]), [
            'id' => 'grid-custom-button',
            'data-pjax' => true,
            'action' => Url::to(['venda/index', 'cnpj' => Yii::$app->session['cnpj']]),
            'class' => 'button btn btn-default btn_gridvoltar',
                ]
        );
        ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]);  ?>

    <?=
    GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],
            //'ID',
            //'IDVENDA'
            [
                'header'=>'Venda',
                'attribute' => 'IDVENDA',
                'filter' => $searchModel->IDVENDA
            ],
            //'IDPRODUTO'
            [
                'header' => 'Produto',
                'attribute' => 'PRODUTONOME',
                'filter' => $searchModel->IDPRODUTO
            ],
            //'QTDE'
            [
                'attribute' => 'QTDE',
                'filter' => $searchModel->QTDE,
                'contentOptions' => ['style' => 'width:60px;'],
            ],
            //'UNITARIO'
            [
                'attribute' => 'UNITARIO',
                'filter' => $searchModel->UNITARIO,
                'contentOptions' => ['style' => 'width:60px;'],
            ],
            //'SUBTOTAL'
            [
                'attribute' => 'SUBTOTAL',
                'filter' => $searchModel->SUBTOTAL,
                'contentOptions' => ['style' => 'width:60px;'],
            ],
           // 'DESCONTO'
            [
                'attribute' => 'DESCONTO',
                'filter' => $searchModel->DESCONTO,
                'contentOptions' => ['style' => 'width:60px;'],
            ],
            //'TOTAL'
            [
                'attribute' => 'TOTAL',
                'filter' => $searchModel->TOTAL,
                'contentOptions' => ['style' => 'width:60px;'],
            ],
            'DATA',
            //'ITEM'
            [
                'attribute' => 'ITEM',
                'filter' => $searchModel->ITEM,
                'contentOptions' => ['style' => 'width:60px;'],
            ]
            ,
            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]);
    ?>

<?php Pjax::end(); ?>

</div>
