<?php

namespace app\modules\api\controllers;

use Yii;
use yii\rest\ActiveController;
use app\models\Mesa;
use yii\helpers\Json;

/**
 * Default controller for the `api` module
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Authorization");
//header("Accept:application/json");
header("Content-type: application/json; charset=utf-8");

class PedidoController extends ActiveController {

    public $modelClass = 'app\models\Mesa';

    public function actionMesa() {
        $req = Yii::$app->request;
        if ($req->isGet) {
            $models = \app\models\MesaGenerica::findAll(['SITUACAO' => 0]);
            $retorno = [];
            foreach ($models as $mesa){
                $result = json_decode(Json::encode($mesa), true);
                $result['CONSUMO'] = \app\models\Consumo::findAll(['COD_MESA'=>$mesa->COD_MESA,'NAOSINCRONIZADO'=>0]);
                
                array_push($retorno,$result);
            }
            return $retorno;
        }
    }
    
    public function actionItemsinc() {
        $req = Yii::$app->request;
        if ($req->isPost) {
            $id = $req->post('id');
            $consumo = \app\models\Consumo::findOne($id);
            $consumo->NAOSINCRONIZADO = 1;
            $up = $consumo->update();
            
            return $up;
        }
    }

}
