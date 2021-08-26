<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel app\models\ProdutoSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Produtos';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="produto-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Create Produto', ['create'], ['class' => 'btn btn-success']) ?>
    </p>
    
    <p id="basefoto">
        <?= Yii::$app->getBasePath(); ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'CODIGO',
            'PRODUTO',
            'UNIDADE',
            'PRECOVENDA',
            'SITUACAO',
                [
                'attribute' => 'Imagem',
                'value' => function($model){
                    return Html::fileInput('foto', $model->imagen,['class'=>'imagens','id'=>$model->CODIGO]);
                },
                'format' => 'raw'
            ],
            //'ADICIONAL',
            //'CODGRUPO',
            //'CODSUBGRUPO',
            //'PRODUTO_MONTADO',
            //'MOSTRA_KYOSK_APP',
            //'PRECO_PROMOCAO',
            //'DT_INICIO_PROMOCAO',
            //'DT_FIM_PROMOCAO',
            //'HORA_INICIO_PROMOCAO',
            //'HORA_FIM_PROMOCAO',
            //'HORARIO_PROMOCAO',
            //'USA_BALANCA',
            //'USA_TALHERES',
            //'USA_PONTO_CARNE',
            //'USA_COPOS',
            //'ACOMPANHAMENTO',
            //'FOTO',

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>


</div>
