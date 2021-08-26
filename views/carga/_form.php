<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\Carga */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="carga-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'CODIGO')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'DATA')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'CODCLIENTE')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'CODVENDEDOR')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'SUBTOTAL')->textInput() ?>

    <?= $form->field($model, 'DESCONTO')->textInput() ?>

    <?= $form->field($model, 'ACRESCIMO')->textInput() ?>

    <?= $form->field($model, 'TOTAL')->textInput() ?>

    <?= $form->field($model, 'OBS1')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'OBS2')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'OBS3')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'OBS4')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'SITUACAO')->textInput() ?>

    <?= $form->field($model, 'CODROTA')->textInput(['maxlength' => true]) ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
