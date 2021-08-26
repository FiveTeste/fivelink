<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\FiveclienteSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="fivecliente-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
        'options' => [
            'data-pjax' => 1
        ],
    ]); ?>

    <?= $form->field($model, 'CNPJ') ?>

    <?= $form->field($model, 'FANTASIA') ?>

    <?= $form->field($model, 'RAZAO') ?>

    <?= $form->field($model, 'ENDERECO') ?>

    <?= $form->field($model, 'NUMERO') ?>

    <?php // echo $form->field($model, 'BAIRRO') ?>

    <?php // echo $form->field($model, 'CIDADE') ?>

    <?php // echo $form->field($model, 'TELEFONE1') ?>

    <?php // echo $form->field($model, 'TELEFONE2') ?>

    <?php // echo $form->field($model, 'CELULAR') ?>

    <?php // echo $form->field($model, 'IE') ?>

    <?php // echo $form->field($model, 'OBS') ?>

    <?php // echo $form->field($model, 'SITUACAO') ?>

    <?php // echo $form->field($model, 'BLOQUEADO') ?>

    <?php // echo $form->field($model, 'IDFIVE') ?>

    <?php // echo $form->field($model, 'DEMONSTRACAO') ?>

    <?php // echo $form->field($model, 'LIBERADO_ATE') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-outline-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
