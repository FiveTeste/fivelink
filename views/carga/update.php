<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Carga */

$this->title = 'Update Carga: ' . $model->CODIGO;
$this->params['breadcrumbs'][] = ['label' => 'Cargas', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->CODIGO, 'url' => ['view', 'id' => $model->CODIGO]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="carga-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
