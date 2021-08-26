<?php

namespace app\modules\api\controllers;

use Yii;
use yii\web\Controller;
use app\models\User;
use yii\web\Response;
use yii\filters\AccessControl;

/**
 * Default controller for the `api` module
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Authorization");
//header("Accept:application/json");
header("Content-type: application/json; charset=utf-8");

class ServiceController extends Controller {

    public $modelClass = 'app\models\User';

    /**
     * Renders the index view for the module
     * @return string
     */
    public function actionSyncgrupo() {
        $req = Yii::$app->request;
        Yii::$app->response->format = Response::FORMAT_JSON;
        if ($req->isPost) {
            $model = \app\models\Grupo::findOne(['CODIGO' => $req->post('codigo')]);

            if ($model != null) {
                $model->attributes = $req->post();
                $model->update();
                return ['mensagem' => 'sucesso'];
            } else {
                $model = new \app\models\Grupo();
                $model->attributes = $req->post();
                if ($model->save()) {
                    return ['mensagem' => 'sucesso'];
                } else {
                    return ['mensagem' => $model->errors];
                }
            }
        }
    }
    
    public function actionSyncsubgrupo() {
        $req = Yii::$app->request;
        Yii::$app->response->format = Response::FORMAT_JSON;
        if ($req->isPost) {
            $model = \app\models\Subgrupo::findOne(['CODIGO' => $req->post('codigo')]);

            if ($model != null) {
                $model->attributes = $req->post();
                $model->update();
                return ['mensagem' => 'sucesso'];
            } else {
                $model = new \app\models\Subgrupo();
                $model->attributes = $req->post();
                if ($model->save()) {
                    return ['mensagem' => 'sucesso'];
                } else {
                    return ['mensagem' => $model->errors];
                }
            }
        }
    }

    public function actionSyncproduto() {
        $req = Yii::$app->request;
        Yii::$app->response->format = Response::FORMAT_JSON;
        if ($req->isPost) {
            
            $model = \app\models\Produto::findOne(['CODIGO' => $req->post('CODIGO')]);
            
            if ($model != null) {
                $model->attributes = $req->post();
                $model->PRECOVENDA = doubleval($model->PRECOVENDA);
                $model->PRECO_PROMOCAO = doubleval($model->PRECO_PROMOCAO);
                $model->update();
                return ['mensagem' => 'sucesso'];
            } else {
               $model = new \app\models\Produto();            
               $model->attributes = $req->post();               
               $model->PRECOVENDA = doubleval($model->PRECOVENDA);
               $model->PRECO_PROMOCAO = doubleval($model->PRECO_PROMOCAO);
               
               if ($model->save()){
                   return ['mensagem' => 'sucesso'];
               }else{
                  return ['mensagem' => $model->errors]; 
               }
            }
        }
    }
    

}
