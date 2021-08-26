<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;
use yii\helpers\Url;
use kartik\select2\Select2;
use kartik\date\DatePicker;

/* @var $this yii\web\View */
/* @var $searchModel app\models\FiveclienteSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Fiveclientes - Liberação Offline';
$this->params['breadcrumbs'][] = $this->title
?>

<div class="fivecliente-index">



    <?php Pjax::begin(); ?>

    <?php // echo $this->render('_search', ['model' => $searchModel]);  ?>

    <div class="col-md-6">
        <div class="col-md-12">

            <?=
            //$form->field($model, 'CNPJ')->textInput(['maxlength' => true]) 
            Select2::widget([
                'name' => 'state_10',
                'data' => yii\helpers\ArrayHelper::map(app\models\Fivecliente::find()->all(), "CNPJ", "RAZAO"),
                'options' => [
                    'placeholder' => 'Selecione o cliente...',
                    'multiple' => false,
                    'id' => 'empresa'
                ],
            ]);
            ?>
            <hr/>
        </div>
        <br/>
        <div class="col-md-6">

            <?=
            DatePicker::widget([
                'name' => 'dp_3',
                'type' => DatePicker::TYPE_COMPONENT_APPEND,
                'value' => date('d/m/yy'),
                'id' => 'dt_lib',
                'pluginOptions' => [
                    'autoclose' => true,
                    'format' => 'dd/mm/yyyy',
                ]
            ]);
            ?> 
        </div>
        <div class="col-md-6">
            <button type="button" onclick="calcularCodigo()" class="btn btn-success">Calcular</button>
        </div>

        <div class="col-md-12">
            <br/><br/>            
            <br/>
            <!-- The text field -->
            <input type="text" placeholder="Código gerado..." id="myInput" class="col-md-8">

            <!-- The button used to copy the text -->

            <button class=" fa fa-copy" onclick="myFunction()" onmouseout="outFunc()" onmouseover="mostrarToltip()" style="height: 25px; margin-left: 5px; border: none;">

                
            </button>
            <span class="tooltiptext" id="myTooltip">Copy to clipboard</span>


        </div>


    </div>

    <?php Pjax::end(); ?>

    <input id="base_url" style="visibility: hidden;" value="<?= Url::base(); ?>"/>
</div>
<script>
    function myFunction() {
        var copyText = document.getElementById("myInput");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");

        var tooltip = document.getElementById("myTooltip");
        tooltip.innerHTML = "Copied: " + copyText.value;
    }
    ;

    function outFunc() {
        var tooltip = document.getElementById("myTooltip");
        tooltip.innerHTML = "Copy to clipboard";
        tooltip.css('visibility', 'hidden');
    }
    ;
    function mostrarToltip() {
        var tooltip = document.getElementById("myTooltip");
        tooltip.innerHTML = "Copy to clipboard";
        tooltip.css('visibility', 'visible');
    }
    ;
    
</script>
<style>
    .tooltip {
        position: relative;
        display: inline-block;
        color: #000000;
    }

    .tooltip .tooltiptext {
        visibility: hidden;
        width: 140px;
        background-color: #555;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px;
        position: absolute;
        z-index: 1;
        bottom: 150%;
        left: 50%;
        margin-left: -75px;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .tooltip .tooltiptext::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #555 transparent transparent transparent;
    }

    .tooltip:hover .tooltiptext {
        visibility: visible;
        opacity: 1;
    }
</style>
