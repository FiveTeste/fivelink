<?php

namespace app\modules\api\controllers;

use Yii;
use yii\web\Controller;

/**
 * Default controller for the `api` module
 */
class ImportController extends Controller {

    /**
     * Renders the index view for the module
     * @return string
     */
    public function actionProduto() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isGet) {
            $cnpj = $request->get('cnpj');
            $model = \app\models\Produto::findAll(['CNPJ' => $cnpj, 'EXCLUIDO' => 0]);
            return $model;
        } else {
            return Yii::error();
        }
    }

    public function actionRegiao() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isGet) {
            $cnpj = $request->get('cnpj');
            $model = \app\models\Regiao::findAll(['CNPJ' => $cnpj, 'EXCLUIDO' => 0]);
            return $model;
        } else {
            return Yii::error();
        }
    }

    public function actionCliente() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isGet) {
            $cnpj = $request->get('cnpj');
            $model = \app\models\Cliente::findAll(['CNPJ' => $cnpj, 'EXCLUIDO' => 0]);
            return $model;
        } else {
            return Yii::error();
        }
    }

    public function actionCidade() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isGet) {
            $model = \app\models\Cidade::find()->all();
            return $model;
        } else {
            return Yii::error();
        }
    }

    public function actionEstado() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isGet) {
            $model = \app\models\Estado::find()->all();
            return $model;
        } else {
            return Yii::error();
        }
    }

    public function actionCondicaopgto() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isGet) {
            $cnpj = $request->get('cnpj');
            $model = \app\models\Condicaopgto::findAll(['CNPJ' => $cnpj, 'EXCLUIDO' => 0]);
            return $model;
        } else {
            return Yii::error();
        }
    }

    public function actionEmpresaconfiguracao() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isGet) {
            $cnpj = $request->get('cnpj');
            $model = \app\models\Empresaconfiguracao::findAll(['CNPJ' => $cnpj]);
            return $model;
        } else {
            return Yii::error();
        }
    }

    public function actionFuncionario() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isGet) {
            $cnpj = $request->get('cnpj');
            $model = \app\models\Funcionario::findAll(['CNPJ' => $cnpj]);
            return $model;
        } else {
            return Yii::error();
        }
    }

    public function actionPagamento() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isGet) {
            $cnpj = $request->get('cnpj');
            $model = \app\models\Pagamento::findAll(['CNPJ' => $cnpj]);
            return $model;
        } else {
            return Yii::error();
        }
    }

    public function actionReceber() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isGet) {
            $cnpj = $request->get('cnpj');
            $model = \app\models\Receber::findAll(['CNPJ' => $cnpj]);
            return $model;
        } else {
            return Yii::error();
        }
    }
    public function actionEstados() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isGet) {
            $model = \app\models\Estado::find()->all();
            return $model;
        } else {
            return Yii::error();
        }
    }
    public function actionCidades() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isGet) {
            $model = \app\models\Cidade::find()->all();
            return $model;
        } else {
            return Yii::error();
        }
    }

    public function actionEmpresa() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isGet) {
            $cnpj = $request->get('cnpj');
            $model = \app\models\Fivecliente::findOne(['CNPJ' => $cnpj]);
            $cidade = \app\models\Cidade::findOne(['IDCIDADE' => $model->CIDADE]);
            $model->setAttribute('CIDADE', $cidade->NOME . ' - ' . $cidade->eSTADO->UF);
            return $model;
        } else {
            return Yii::error();
        }
    }

    public function actionVenda() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isGet) {
            $cnpj = $request->get('cnpj');
            $model = \app\models\Venda::findAll(['CNPJ' => $cnpj, 'DISPOSITIVO' => 'FIVE']);
            $retorno = array();
            $lista_vendas = array();
            foreach ($model as $v) {
                $retorno = $v->attributes;
                $retorno['listaItens'] = $v->items;
                $lista_vendas[] = $retorno;
            }
            return $lista_vendas;
        } else {
            return Yii::error();
        }
    }
    
    public function actionVendaparafive() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isGet) {
            $cnpj = $request->get('cnpj');
            $model = \app\models\Venda::findAll(['CNPJ' => $cnpj, 'SITUACAO' => 0]);
            $retorno = array();
            $lista_vendas = array();
            foreach ($model as $v) {
                $retorno = $v->attributes;
                $retorno['IDCLIENTE'] = \app\models\Cliente::findOne(['CNPJ'=>$v->CNPJ,'IDCLIENTE'=>$v->IDCLIENTE]);
                $retorno['listaItens'] = $v->items;
                $lista_vendas[] = $retorno;
            }
            return $lista_vendas;
        } else {
            return Yii::error();
        }
    }

    public function actionVerificabloqueio() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isGet) {
            
            $cnpj = $request->get('cnpj');
            $disp = $request->get('disp');
            
            $empresa = \app\models\Fivecliente::find(['CNPJ' => $cnpj])->one();           
            $dispositivo = \app\models\Empresadispositivo::findOne(['DISPOSITIVO' => $disp, 'CNPJ' => $cnpj]);
            
            $retorno = ['empresa' => 'inexistente','dispositivo' => 'inexistente'];
            if ($empresa) {
                $retorno['empresa'] = $empresa->BLOQUEADO;
            } 
            if ($dispositivo) {
                $retorno['dispositivo'] = $dispositivo->BLOQUEADO;
            } 
           
            return $retorno;
        } else {
            return Yii::error();
        }
    }

}
