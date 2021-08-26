<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Fivecliente */

$this->title = 'Update Fivecliente: ' . $model->CNPJ;
$this->params['breadcrumbs'][] = ['label' => 'Fiveclientes', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->CNPJ, 'url' => ['view', 'id' => $model->CNPJ]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="fivecliente-update">

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
