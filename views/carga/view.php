<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model app\models\Carga */

$this->title = $model->CODIGO;
$this->params['breadcrumbs'][] = ['label' => 'Cargas', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="carga-view">

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
            'DATA',
            'CODCLIENTE',
            'CODVENDEDOR',
            'SUBTOTAL',
            'DESCONTO',
            'ACRESCIMO',
            'TOTAL',
            'OBS1',
            'OBS2',
            'OBS3',
            'OBS4',
            'SITUACAO',
            'CODROTA',
        ],
    ]) ?>

</div>
