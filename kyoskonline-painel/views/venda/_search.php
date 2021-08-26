<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\VendaSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="venda-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
        'options' => [
            'data-pjax' => 1
        ],
    ]); ?>

    <?= $form->field($model, 'IDVENDA') ?>

    <?= $form->field($model, 'CODIGO') ?>

    <?= $form->field($model, 'IDCLIENTE') ?>

    <?= $form->field($model, 'IDVENDEDOR') ?>

    <?= $form->field($model, 'DATAVENDA') ?>

    <?php // echo $form->field($model, 'SUBTOTAL') ?>

    <?php // echo $form->field($model, 'DESCONTO') ?>

    <?php // echo $form->field($model, 'TOTAL') ?>

    <?php // echo $form->field($model, 'FORMAPGTO') ?>

    <?php // echo $form->field($model, 'CONDPGTO') ?>

    <?php // echo $form->field($model, 'SITUACAO') ?>

    <?php // echo $form->field($model, 'OBS') ?>

    <?php // echo $form->field($model, 'DATA_ENTREGA') ?>

    <?php // echo $form->field($model, 'OBS_ENTREGA') ?>

    <?php // echo $form->field($model, 'DISPOSITIVO') ?>

    <?php // echo $form->field($model, 'CNPJ') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-outline-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
