<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;
use kartik\select2\Select2;
use yii\helpers\Url;

/* @var $this yii\web\View */
/* @var $model app\models\Empresadispositivo */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="empresadispositivo-form">

    <?php $form = ActiveForm::begin(); ?>

    <div class="col-md-12">
        <div class="col-md-5">
            <?=
            //$form->field($model, 'CNPJ')->textInput(['maxlength' => true]) 
            $form->field($model, 'CNPJ')->widget(Select2::classname(), [
                'data' => yii\helpers\ArrayHelper::map(app\models\Fivecliente::find()->all(), "CNPJ", "RAZAO", "FANTASIA"),
                'options' => ['placeholder' => 'Selecione a empresa ...'],
                'pluginOptions' => [
                    'allowClear' => true,
                ],
            ]);
            ?>
        </div>
    </div>
    <div class="col-md-12">
        <div class="col-md-5">
            <?= $form->field($model, 'DISPOSITIVO')->textInput(['maxlength' => '15']) ?>
        </div>
    </div>
    <div class="col-md-12">
        <div class="col-md-5">
            <?=
            //$form->field($model, 'BLOQUEADO')->textInput() 
            $form->field($model, 'BLOQUEADO')->widget(Select2::classname(), [
                'data' => [0 => 'Desbloqueado', 1 => 'Bloqueado'],
                'options' => ['placeholder' => '', 'value' => $model->BLOQUEADO],
                'pluginOptions' => [
                    'allowClear' => true,
                ],
            ]);
            ?>
        </div>
    </div>
    <div class="col-md-12">
        <div class="col-md-5">
            <div class="form-group">
                <?= Html::submitButton('Salvar', ['class' => 'btn btn-success']) ?>
                <?=
                Html::a(
                        '<i >Cancelar</i>', Url::to(['empresadispositivo/index', 'cnpj' => $model->CNPJ]), [
                    'id' => 'grid-custom-button',
                    'data-pjax' => true,
                    'action' => Url::to(['empresadispositivo/index', 'cnpj' => $model->CNPJ]),
                    'class' => 'button btn btn-danger',
                        ]
                );
                ?>
            </div>
        </div>
    </div>
<?php ActiveForm::end(); ?>

</div>
