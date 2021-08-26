<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\CargaSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="carga-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'CODIGO') ?>

    <?= $form->field($model, 'DATA') ?>

    <?= $form->field($model, 'CODCLIENTE') ?>

    <?= $form->field($model, 'CODVENDEDOR') ?>

    <?= $form->field($model, 'SUBTOTAL') ?>

    <?php // echo $form->field($model, 'DESCONTO') ?>

    <?php // echo $form->field($model, 'ACRESCIMO') ?>

    <?php // echo $form->field($model, 'TOTAL') ?>

    <?php // echo $form->field($model, 'OBS1') ?>

    <?php // echo $form->field($model, 'OBS2') ?>

    <?php // echo $form->field($model, 'OBS3') ?>

    <?php // echo $form->field($model, 'OBS4') ?>

    <?php // echo $form->field($model, 'SITUACAO') ?>

    <?php // echo $form->field($model, 'CODROTA') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-outline-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
