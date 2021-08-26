<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;
use kartik\date\DatePicker;
use kartik\select2\Select2;
use yii\helpers\Url;

/* @var $this yii\web\View */
/* @var $model app\models\Fivecliente */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="fivecliente-form">

    <?php $form = ActiveForm::begin(); ?>
    <div class="col-md-12">
        <?= $form->field($model, 'RAZAO')->textInput(['maxlength' => true]) ?>
    </div>
    <div class="col-md-12">
        <?= $form->field($model, 'FANTASIA')->textInput(['maxlength' => true]) ?>
    </div>
    <div class="col-md-3">
        <?= $form->field($model, 'CNPJ')->textInput(['maxlength' => true]) ?>
    </div>

    <div class="col-md-9">
        <?= $form->field($model, 'ENDERECO')->textInput(['maxlength' => true]) ?>
    </div>
    <div class="col-md-2">
        <?= $form->field($model, 'NUMERO')->textInput(['maxlength' => true]) ?>
    </div>
    <div class="col-md-5">
        <?= $form->field($model, 'BAIRRO')->textInput(['maxlength' => true]) ?>
    </div>
    <div class="col-md-5">
        <?=
        //$form->field($model, 'CIDADE')->textInput()
        $form->field($model, 'CIDADE')->widget(Select2::classname(), [
            'data' => yii\helpers\ArrayHelper::map(app\models\Cidade::find()->all(), "IDCIDADE", "NOME"),
            'options' => ['placeholder' => 'Selecione a cidade ...'],
            'pluginOptions' => [
                'allowClear' => true,
            ],
        ]);
        ?>
    </div>

    <div class="col-md-2">
        <?=
        // $form->field($model, 'TELEFONE1')->textInput(['maxlength' => true])
        $form->field($model, 'TELEFONE1')->widget(\yii\widgets\MaskedInput::className(), [
            'mask' => '(99)9999-9999',
        ])
        ?>
    </div>
    <div class="col-md-2">
        <?=
        //$form->field($model, 'TELEFONE2')->textInput(['maxlength' => true]) 
        $form->field($model, 'TELEFONE2')->widget(\yii\widgets\MaskedInput::className(), [
            'mask' => '(99)9999-9999',
        ])
        ?>
    </div>
    <div class="col-md-2">
        <?=
        //$form->field($model, 'CELULAR')->textInput(['maxlength' => true])
        $form->field($model, 'CELULAR')->widget(\yii\widgets\MaskedInput::className(), [
            'mask' => '(99)99999-9999',
        ])
        ?>
    </div>
    <div class="col-md-3">
        <?= $form->field($model, 'IE')->textInput(['maxlength' => true]) ?>
    </div>
    <div class="col-md-3">
        <?= $form->field($model, 'IDFIVE')->textInput() ?>
    </div>

    <div class="col-md-12">
        <?= $form->field($model, 'OBS')->textInput(['maxlength' => true]) ?>
    </div>
    <div class="col-md-2">
        <?=
        //$form->field($model, 'SITUACAO')->textInput() 
        $form->field($model, 'SITUACAO')->widget(Select2::classname(), [
            'data' => [0 => 'Ativo', 1 => 'Inativo'],
            'options' => ['placeholder' => 'Situação ...'],
            'hideSearch' => true,
            'pluginOptions' => [
                'allowClear' => true,
            ],
        ]);
        ?>
    </div>
    <div class="col-md-2">
        <?=
        //$form->field($model, 'BLOQUEADO')->textInput()
        $form->field($model, 'BLOQUEADO')->widget(Select2::classname(), [
            'data' => [0 => 'Desbloqueado', 1 => 'Bloqueado'],
            'options' => ['placeholder' => 'Bloqueio ...'],
            'hideSearch' => true,
            'pluginOptions' => [
                'allowClear' => true,
            ],
        ]);
        ?>
    </div>
    <div class="col-md-2">
        <?=
        //$form->field($model, 'DEMONSTRACAO')->textInput()
        $form->field($model, 'DEMONSTRACAO')->widget(Select2::classname(), [
            'data' => [0 => 'Produção', 1 => 'Demonstração'],
            'options' => ['placeholder' => 'Versão ...'],
            'hideSearch' => true,
            'pluginOptions' => [
                'allowClear' => true,
            ],
        ]);
        ?>
    </div>

    <?php if (Yii::$app->user->identity->username != 'suporte') { ?>
        <div class="col-md-3">
            <?=
            //$form->field($model, 'LIBERADO_ATE')->textInput()
            $form->field($model, 'LIBERADO_ATE')->widget(DatePicker::classname(), [
                'type' => DatePicker::TYPE_COMPONENT_APPEND,
                'value' => date('d/m/yy'),
                'pluginOptions' => [
                    'autoclose' => true,
                    'format' => 'yyyy-mm-dd'
                ]
            ]);
            ?>
        </div>
        <div class="col-md-1">
            <?=
            $form->field($model, 'CARENCIA')->textInput()
            ?>
        </div>
        <div class="col-md-2">
            <?=
            //$form->field($model, 'LIBERACAO_EXTRA')->textInput()
            $form->field($model, 'LIBERACAO_EXTRA')->widget(DatePicker::classname(), [
                'type' => DatePicker::TYPE_COMPONENT_APPEND,
                'value' => date('d/m/yy'),
                'pluginOptions' => [
                    'autoclose' => true,
                    'format' => 'yyyy-mm-dd'
                ]
            ]);
            ?>
        </div>

    <?php } ?>

    <div class="col-md-12">
        <div class="form-group">
            <?= Html::submitButton('Salvar', ['class' => 'btn btn-success']) ?>
            <?=
            Html::a(
                    '<i >Cancelar</i>', Url::to(['fivecliente/index']), [
                'id' => 'grid-custom-button',
                'data-pjax' => true,
                'action' => Url::to(['fivecliente/index']),
                'class' => 'button btn btn-danger',
                    ]
            );
            ?>
        </div>
    </div>
    <?php ActiveForm::end(); ?>

</div>
