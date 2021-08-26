<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model app\models\Fivecliente */

$this->title = $model->CNPJ;
$this->params['breadcrumbs'][] = ['label' => 'Fiveclientes', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="fivecliente-view">

    <p>
        <?= Html::a('Update', ['update', 'id' => $model->CNPJ], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Delete', ['delete', 'id' => $model->CNPJ], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Are you sure you want to delete this item?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'CNPJ',
            'FANTASIA',
            'RAZAO',
            'ENDERECO',
            'NUMERO',
            'BAIRRO',
            'CIDADE',
            'TELEFONE1',
            'TELEFONE2',
            'CELULAR',
            'IE',
            'OBS',
            'SITUACAO',
            'BLOQUEADO',
            'IDFIVE',
            'DEMONSTRACAO',
            'LIBERADO_ATE',
        ],
    ]) ?>

</div>
