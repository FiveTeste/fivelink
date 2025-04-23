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

    public $modelClass = 'app\models\Consumo';

    public function actionMesa() {
        $req = Yii::$app->request;
        if ($req->isGet) {
            $models = \app\models\MesaGenerica::find()->all();
            $retorno = [];
            foreach ($models as $mesa) {
                $result = json_decode(Json::encode($mesa), true);
                $result['CONSUMO'] = \app\models\Consumo::findAll(['COD_MESA' => $mesa->COD_MESA, 'NAOSINCRONIZADO' => 0]);

                array_push($retorno, $result);
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

    public function actionMesaconferencia() {
        $req = Yii::$app->request;
        if ($req->isPost) {
            $codmesa = $req->post('codmesa');
            $situacao = $req->post('situacao');
            if (isset($codmesa) && isset($situacao)) {
                $mesa = Mesa::findOne(['COD_MESA' => $codmesa]);
                if (isset($mesa)) {
                    $mesa->SITUACAO = intval($situacao);
                    $up = $mesa->update();
                    return $up;
                } else {
                    return 'mesa não encontrada';
                }
            } else {
                return 'codigo da mesa ou situação não informado';
            }
        }
    }

    public function actionDeletarmesa() {
        $req = Yii::$app->request;
        if ($req->isGet) {
            $codmesa = $req->get('codmesa');
            $del = '';
            if (isset($codmesa)) {
                $mesa = Mesa::findOne(['COD_MESA' => $codmesa]);
                if (isset($mesa)) {
                    $consumos = \app\models\Consumo::findAll(['COD_MESA' => $codmesa]);
                    //$consumo = \app\models\Consumo::findOne(['COD_MESA' => $codmesa]);
                    foreach ($consumos as $consumo) {
                        \app\models\Itemadicional::deleteAll(['CONSUMO' => $consumo->CODIGO]);
                        \app\models\Itemopcional::deleteAll(['CONSUMO' => $consumo->CODIGO]);
                        \app\models\Itemmontado::deleteAll(['CONSUMO' => $consumo->CODIGO]);
                        \app\models\Itemingrediente::deleteAll(['CONSUMO' => $consumo->CODIGO]);
                        $consumo->delete();
                    }

                    $del = $mesa->delete();
                } else {
                    $del = 'mesa não encontrada';
                }
            } else {
                $del = 'nenhum codigo informado';
            }
            return $del;
        }
    }

}
