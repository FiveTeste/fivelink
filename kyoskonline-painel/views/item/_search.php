<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\ItemSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="item-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
        'options' => [
            'data-pjax' => 1
        ],
    ]); ?>

    <?= $form->field($model, 'ID') ?>

    <?= $form->field($model, 'IDVENDA') ?>

    <?= $form->field($model, 'IDPRODUTO') ?>

    <?= $form->field($model, 'QTDE') ?>

    <?= $form->field($model, 'UNITARIO') ?>

    <?php // echo $form->field($model, 'SUBTOTAL') ?>

    <?php // echo $form->field($model, 'DESCONTO') ?>

    <?php // echo $form->field($model, 'TOTAL') ?>

    <?php // echo $form->field($model, 'DATA') ?>

    <?php // echo $form->field($model, 'ITEM') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-outline-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
