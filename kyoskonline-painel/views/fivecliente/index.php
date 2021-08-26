<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;
use yii\helpers\Url;

/* @var $this yii\web\View */
/* @var $searchModel app\models\FiveclienteSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Fiveclientes';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="fivecliente-index">



    <?php Pjax::begin(); ?>

    <p>
        <?= Html::a('Adicionar Cliente Five', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]);  ?>

    <?=
    GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],
            'CNPJ',
            'FANTASIA',
            'RAZAO',
            //'ENDERECO',
            //'NUMERO',
            //'BAIRRO',
            //'CIDADE',
            //'TELEFONE1',
            //'TELEFONE2',
            //'CELULAR',
            //'IE',
            //'OBS',
            //'SITUACAO',
            //'BLOQUEADO'
            [
                'header' => 'Estado',
                'attribute' => 'BLOQUEADO',
                'format' => 'raw',
                'value' => function($model, $key, $index, $column) {
                    if ($model->BLOQUEADO == 0) {
                        return Html::a(
                                        '<label class="switch" >
                                        <input type="checkbox" value="' . $model->BLOQUEADO . '" checked id="' . $model->CNPJ . '" />
                                        <span class="slider round"></span>
                                      </label>'
                        );
                    } else {
                        return Html::a(
                                        '<label class="switch" >
                                        <input type="checkbox" value="' . $model->BLOQUEADO . '" id="' . $model->CNPJ . '" />
                                        <span class="slider round"></span>
                                      </label>'
                        );
                    }
                },
                'contentOptions' => ['style' => 'width:70px;']
            ],
            //'IDFIVE',
            //'DEMONSTRACAO',
            'LIBERADO_ATE',
            [
                'header' => 'Vendas',
                'format' => 'raw',
                'value' => function($model, $key, $index, $column) {
                    return Html::a(
                                    '<i ></i>', Url::to(['venda/index', 'cnpj' => $model->CNPJ]), [
                                'id' => 'grid-custom-button',
                                'data-pjax' => true,
                                'action' => Url::to(['venda/index', 'cnpj' => $model->CNPJ, 'target' => 'blank']),
                                'class' => 'button btn btn-default btn_gridvendas',
                                    ]
                    );
                }
            ],
            [
                'header' => 'Disp.',
                'format' => 'raw',
                'value' => function($model, $key, $index, $column) {
                    return Html::a(
                                    '<i ></i>', Url::to(['empresadispositivo/index', 'cnpj' => $model->CNPJ]), [
                                'id' => 'grid-custom-button',
                                'data-pjax' => true,
                                'action' => Url::to(['empresadispositivo/index', 'cnpj' => $model->CNPJ]),
                                'class' => 'button btn btn-default btn_dispositivos',
                                    ]
                    );
                }
            ],
            ['class' => 'yii\grid\ActionColumn', 'contentOptions' => ['style' => 'width:70px;'],],
        ],
    ]);
    ?>

    <?php Pjax::end(); ?>


</div>
<style>
    /* The switch - the box around the slider */
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 25px;
    }

    /* Hide default HTML checkbox */
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    /* The slider */
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 6px;
        bottom: 3px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: #2196F3;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }

</style>
