<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\Produto */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="produto-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'CODIGO')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'PRODUTO')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'UNIDADE')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'PRECOVENDA')->textInput() ?>

    <?= $form->field($model, 'SITUACAO')->textInput() ?>

    <?= $form->field($model, 'ADICIONAL')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'CODGRUPO')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'CODSUBGRUPO')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'PRODUTO_MONTADO')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'MOSTRA_KYOSK_APP')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'PRECO_PROMOCAO')->textInput() ?>

    <?= $form->field($model, 'DT_INICIO_PROMOCAO')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'DT_FIM_PROMOCAO')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'HORA_INICIO_PROMOCAO')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'HORA_FIM_PROMOCAO')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'HORARIO_PROMOCAO')->textInput() ?>

    <?= $form->field($model, 'USA_BALANCA')->textInput() ?>

    <?= $form->field($model, 'USA_TALHERES')->textInput() ?>

    <?= $form->field($model, 'USA_PONTO_CARNE')->textInput() ?>

    <?= $form->field($model, 'USA_COPOS')->textInput() ?>

    <?= $form->field($model, 'ACOMPANHAMENTO')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'FOTO')->textInput(['maxlength' => true]) ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
