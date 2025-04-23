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
            $adicionais = json_decode($req->post("ADICIONAIS"));
            $opcionais = json_decode($req->post("OPCIONAIS"));
            $ingredientes = json_decode($req->post("INGREDIENTES"));

            $model = \app\models\Produto::findOne(['CODIGO' => $req->post('CODIGO')]);

            if ($model != null) {
                $model->attributes = $req->post();
                $model->PRECOVENDA = doubleval($model->PRECOVENDA);
                $model->PRECO_PROMOCAO = doubleval($model->PRECO_PROMOCAO);
                $model->update();
                //return ['mensagem' => 'sucesso'];
            } else {
                $model = new \app\models\Produto();
                $model->attributes = $req->post();
                $model->PRECOVENDA = doubleval($model->PRECOVENDA);
                $model->PRECO_PROMOCAO = doubleval($model->PRECO_PROMOCAO);

                if (!$model->save()) {
                    return ['mensagem' => $model->errors];
                }
            }

            // ATUALIZA OS ADICIONAIS DO PRODUTO
            \app\models\Produtoadicional::deleteAll(['CODPRODUTO' => $model->CODIGO]);
            if (count($adicionais) > 0) {
                foreach ($adicionais as $ad) {
                    $model1 = new \app\models\Produtoadicional();
                    $model1->attributes = ['CODIGO' => $ad->{'CODIGO'}, 'CODPRODUTO' => $ad->{'CODPRODUTO'}, 'PROD_ADICIONAL' => $ad->{'PROD_ADICIONAL'}];
                    if (!$model1->save()) {
                        return $model1->errors;
                    }
                }
            }

            // ATUALIZA OS OPCIONAIS DO PRODUTO
            \app\models\Produtoopcional::deleteAll(['CODPRODUTO' => $model->CODIGO]);
            if (count($adicionais) > 0) {
                foreach ($opcionais as $op) {
                    $model1 = new \app\models\Produtoopcional();
                    $model1->attributes = ['CODIGO' => $op->{'CODIGO'}, 'CODPRODUTO' => $op->{'CODPRODUTO'}, 'CODOPCIONAL' => $op->{'CODOPCIONAL'}];
                    if (!$model1->save()) {
                        return $model1->errors;
                    }
                }
            }

            // ATUALIZA OS INGREDIENTES DO PRODUTO
            \app\models\Produtoingrediente::deleteAll(['CODPRODUTO' => $model->CODIGO]);
            if (count($adicionais) > 0) {
                foreach ($ingredientes as $ing) {
                    $model1 = new \app\models\Produtoingrediente();
                    $model1->attributes = ['CODIGO' => $ing->{'CODIGO'}, 'CODPRODUTO' => $ing->{'CODPRODUTO'}, 'CODINGREDIENTE' => $ing->{'CODINGREDIENTE'}];
                    if (!$model1->save()) {
                        return $model1->errors;
                    }
                }
            }


            return ['mensagem' => 'sucesso'];
        }
    }

    public function actionSyncprodutoadicional() {
        $req = Yii::$app->request;
        Yii::$app->response->format = Response::FORMAT_JSON;
        if ($req->isPost) {
            $adicionais = json_decode($req->post("produto_adicional"));

            $query = new \yii\db\Query();
            $comand = $query->createCommand();
            $comand->setSql("DELETE FROM produto_adicional");
            $comand->execute();

            if (count($adicionais) > 0) {
                foreach ($adicionais as $ad) {
                    $model = new \app\models\Produtoadicional();
                    $model->attributes = [
                        'CODIGO' => $ad->{'CODIGO'},
                        'CODPRODUTO' => $ad->{'CODPRODUTO'},
                        'PROD_ADICIONAL' => $ad->{'PROD_ADICIONAL'}
                    ];
                    if (!$model->save()) {
                        return $model->errors;
                    }
                }
                return ['mensagem' => 'sucesso'];
            } else {
                return ['mensagem' => 'sucesso'];
            }
        }
    }

    public function actionSyncingredientes() {
        $req = Yii::$app->request;
        Yii::$app->response->format = Response::FORMAT_JSON;
        if ($req->isPost) {
            $ingredientes = json_decode($req->post("INGREDIENTES"));


            if (count($ingredientes) > 0) {
                foreach ($ingredientes as $ig) {
                    $model = \app\models\Ingrediente::findOne(['CODIGO' => $ig->CODIGO]);
                    
                    if ($model != null) {
                       $model->attributes = [
                            'CODIGO' => $ig->{'CODIGO'},
                            'NOME' => $ig->{'NOME'}
                        ];
                        $model->update();
                    } else {
                        $model = new \app\models\Ingrediente();
                        $model->attributes = [
                            'CODIGO' => $ig->{'CODIGO'},
                            'NOME' => $ig->{'NOME'}
                        ];
                        if (!$model->save()) {
                            return $model->errors;
                        }
                    }
                }
                return ['mensagem' => 'sucesso'];
            } else {
                return ['mensagem' => 'sucesso'];
            }
        }
    }

}
