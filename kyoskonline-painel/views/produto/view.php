<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model app\models\Produto */

$this->title = $model->CODIGO;
$this->params['breadcrumbs'][] = ['label' => 'Produtos', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="produto-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Update', ['update', 'id' => $model->CODIGO], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Delete', ['delete', 'id' => $model->CODIGO], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Are you sure you want to delete this item?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'CODIGO',
            'PRODUTO',
            'UNIDADE',
            'PRECOVENDA',
            'SITUACAO',
            'ADICIONAL',
            'CODGRUPO',
            'CODSUBGRUPO',
            'PRODUTO_MONTADO',
            'MOSTRA_KYOSK_APP',
            'PRECO_PROMOCAO',
            'DT_INICIO_PROMOCAO',
            'DT_FIM_PROMOCAO',
            'HORA_INICIO_PROMOCAO',
            'HORA_FIM_PROMOCAO',
            'HORARIO_PROMOCAO',
            'USA_BALANCA',
            'USA_TALHERES',
            'USA_PONTO_CARNE',
            'USA_COPOS',
            'ACOMPANHAMENTO',
            'FOTO',
        ],
    ]) ?>

</div>
