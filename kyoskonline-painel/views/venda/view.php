<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model app\models\Venda */

$this->title = $model->IDVENDA;
$this->params['breadcrumbs'][] = ['label' => 'Vendas', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="venda-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Update', ['update', 'id' => $model->IDVENDA], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Delete', ['delete', 'id' => $model->IDVENDA], [
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
            'IDVENDA',
            'CODIGO',
            'IDCLIENTE',
            'IDVENDEDOR',
            'DATAVENDA',
            'SUBTOTAL',
            'DESCONTO',
            'TOTAL',
            'FORMAPGTO',
            'CONDPGTO',
            'SITUACAO',
            'OBS',
            'DATA_ENTREGA',
            'OBS_ENTREGA',
            'DISPOSITIVO',
            'CNPJ',
        ],
    ]) ?>

</div>
