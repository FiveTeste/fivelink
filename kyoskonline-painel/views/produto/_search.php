<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\ProdutoSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="produto-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'CODIGO') ?>

    <?= $form->field($model, 'PRODUTO') ?>

    <?= $form->field($model, 'UNIDADE') ?>

    <?= $form->field($model, 'PRECOVENDA') ?>

    <?= $form->field($model, 'SITUACAO') ?>

    <?php // echo $form->field($model, 'ADICIONAL') ?>

    <?php // echo $form->field($model, 'CODGRUPO') ?>

    <?php // echo $form->field($model, 'CODSUBGRUPO') ?>

    <?php // echo $form->field($model, 'PRODUTO_MONTADO') ?>

    <?php // echo $form->field($model, 'MOSTRA_KYOSK_APP') ?>

    <?php // echo $form->field($model, 'PRECO_PROMOCAO') ?>

    <?php // echo $form->field($model, 'DT_INICIO_PROMOCAO') ?>

    <?php // echo $form->field($model, 'DT_FIM_PROMOCAO') ?>

    <?php // echo $form->field($model, 'HORA_INICIO_PROMOCAO') ?>

    <?php // echo $form->field($model, 'HORA_FIM_PROMOCAO') ?>

    <?php // echo $form->field($model, 'HORARIO_PROMOCAO') ?>

    <?php // echo $form->field($model, 'USA_BALANCA') ?>

    <?php // echo $form->field($model, 'USA_TALHERES') ?>

    <?php // echo $form->field($model, 'USA_PONTO_CARNE') ?>

    <?php // echo $form->field($model, 'USA_COPOS') ?>

    <?php // echo $form->field($model, 'ACOMPANHAMENTO') ?>

    <?php // echo $form->field($model, 'FOTO') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-outline-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
