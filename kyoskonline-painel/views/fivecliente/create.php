<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Fivecliente */

$this->title = 'Create Fivecliente';
$this->params['breadcrumbs'][] = ['label' => 'Fiveclientes', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="fivecliente-create">

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
