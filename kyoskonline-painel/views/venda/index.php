<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;
use kartik\date\DatePicker;
use yii\widgets\MaskedInput;
use kartik\widgets\Select2;
use kartik\tabs\TabsX;
use yii\helpers\Url;

/* @var $this yii\web\View */
/* @var $searchModel app\models\VendaSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

/* @var $searchModelItem app\models\ItemSearch */
/* @var $dataProviderItem yii\data\ActiveDataProvider */

$this->title = 'Vendas';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="venda-index">

    <?php Pjax::begin(); ?>
    <h1><?= Html::encode($this->title) ?></h1>
    <p>
        <?=
        Html::a(
                '<i ></i>', Url::to(['fivecliente/index']), [
            'id' => 'grid-custom-button',
            'data-pjax' => true,
            'action' => Url::to(['fivecliente/index']),
            'class' => 'button btn btn-default btn_gridvoltar',
                ]
        );
        ?>
    </p>
    <?php // echo $this->render('_search', ['model' => $searchModel]);   ?>

    <?=
    GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            [
                'header' => 'Itens',
                'format' => 'raw',
                'value' => function($model, $key, $index, $column) {
                    return Html::a(
                                    '<i ></i>', Url::to(['item/index', 'venda' => $model->IDVENDA]), [
                                'id' => 'grid-custom-button',
                                'data-pjax' => true,
                                'action' => Url::to(['item/index', 'venda' => $model->IDVENDA, 'target' => 'blank']),
                                'class' => 'button btn btn-default btn_gridItensvendas',
                                    ]
                    );
                },
                'contentOptions' => ['style' => 'width:50px;'],
            ],
            //'IDVENDA'
            [
                'header' => 'Venda',
                'attribute' => 'IDVENDA',
                'filter' => $searchModel->IDVENDA,
                'contentOptions' => ['style' => 'width:60px;'],
            ],
            //'CODIGO'
            [
                'attribute' => 'CODIGO',
                'filter' => $searchModel->CODIGO,
                'contentOptions' => ['style' => 'width:70px;'],
            ],
            //'NOMECLIENTE'
            [
                'filter' => Select2::widget([
                    'model' => $searchModel,
                    'attribute' => 'IDCLIENTE',
                    'data' => yii\helpers\ArrayHelper::map(app\models\Cliente::findAll(["CNPJ" => $searchModel->CNPJ]), "IDCLIENTE", "NOME"),
                    'options' => ['placeholder' => 'Selecionar  cliente ...'],
                    'pluginOptions' => [
                        'allowClear' => true
                    ],
                ]),
                'attribute' => 'NOMECLIENTE',
                'contentOptions' => ['style' => 'width:290px;'],
            ],
            //'IDVENDEDOR'
            [
                'filter' => Select2::widget([
                    'model' => $searchModel,
                    'attribute' => 'IDVENDEDOR',
                    'data' => yii\helpers\ArrayHelper::map(app\models\Funcionario::findAll(["CNPJ" => $searchModel->CNPJ]), "CODIGO", "NOME"),
                    'options' => ['placeholder' => 'Selecionar vendedor ...'],
                    'pluginOptions' => [
                        'allowClear' => true
                    ],
                ]),
                'attribute' => 'VENDEDOR',
                'contentOptions' => ['style' => 'width:150px;'],
            ],
            // 'DATAVENDA'
            [
                'filter' => DatePicker::widget([
                    'model' => $searchModel,
                    'attribute' => 'DATAVENDA',
                    'type' => DatePicker::TYPE_INPUT,
                    'value' => date('dd-mm-yy'),
                    'pluginOptions' => [
                        'autoclose' => true,
                        'format' => 'yyyy-mm-dd'
                    ]
                ]),
                'attribute' => 'DATAVENDA',
                'contentOptions' => ['style' => 'width:150px;'],
            ],
            //'SUBTOTAL',
            //'DESCONTO',
            //'TOTAL'
            [
                'filter' => MaskedInput::widget([
                    'model' => $searchModel,
                    'attribute' => 'TOTAL',
                    'clientOptions' => [
                        'alias' => 'decimal',
                        'groupSeparator' => '.',
                        'autoGroup' => true
                    ],
                ]),
                'attribute' => 'TOTAL',
                'contentOptions' => ['style' => 'width:90px;'],
            ],
            //'FORMAPGTO',
            //'CONDPGTO',
            //'SITUACAO',
            //'OBS',
            //'DATA_ENTREGA',
            //'OBS_ENTREGA',
            'DISPOSITIVO',
            //'CNPJ'
            [
                'attribute' => 'CNPJ',
                'filter' => $searchModel->CNPJ,
                'contentOptions' => ['style' => 'width:150px;'],
            ],
            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]);
    ?>

    <?php Pjax::end(); ?>


</div>
