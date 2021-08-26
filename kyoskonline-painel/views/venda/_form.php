<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\Venda */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="venda-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'CODIGO')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'IDCLIENTE')->textInput() ?>

    <?= $form->field($model, 'IDVENDEDOR')->textInput() ?>

    <?= $form->field($model, 'DATAVENDA')->textInput() ?>

    <?= $form->field($model, 'SUBTOTAL')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'DESCONTO')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'TOTAL')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'FORMAPGTO')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'CONDPGTO')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'SITUACAO')->textInput() ?>

    <?= $form->field($model, 'OBS')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'DATA_ENTREGA')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'OBS_ENTREGA')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'DISPOSITIVO')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'CNPJ')->textInput(['maxlength' => true]) ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
