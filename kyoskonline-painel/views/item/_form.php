<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\Item */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="item-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'IDVENDA')->textInput() ?>

    <?= $form->field($model, 'IDPRODUTO')->textInput() ?>

    <?= $form->field($model, 'QTDE')->textInput() ?>

    <?= $form->field($model, 'UNITARIO')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'SUBTOTAL')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'DESCONTO')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'TOTAL')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'DATA')->textInput() ?>

    <?= $form->field($model, 'ITEM')->textInput(['maxlength' => true]) ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
