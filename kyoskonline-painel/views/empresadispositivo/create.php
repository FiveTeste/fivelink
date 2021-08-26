<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Empresadispositivo */

$this->title = 'Novo dispositivo';
$this->params['breadcrumbs'][] = ['label' => 'Empresadispositivos', 'url' => ['index','cnpj'=>$model->CNPJ]];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="empresadispositivo-create">

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
