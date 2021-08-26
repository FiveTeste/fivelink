<?php

namespace app\modules\api\controllers;

use Yii;
use yii\web\Controller;
use yii\filters\AccessControl;
use yii\web\Response;

/**
 * Default controller for the `api` module
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Authorization");
header("Accept:application/json");

class SyncController extends Controller {
    // public $modelClass = 'app\models\User';

    /* public function behaviors() {
      return [
      'access' => [
      'class' => AccessControl::className(),
      'only' => ['*'],
      'rules' => [
      // deny all POST requests
      [
      'allow' => true,
      'verbs' => ['POST']
      ],
      // allow authenticated users
      [
      'allow' => false,
      'roles' => ['*'],
      ],
      // everything else is denied
      ],
      ],
      ];
      } */

    /**
     * Renders the index view for the module
     * @return string
     */
    public function actionCliente() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isPost) {

            $model = new \app\models\Cliente();
            $model->attributes = $request->post();
            $model->CODIGO = strval($request->post('IDCLIENTE'));
            if (intval($model->CODREGIAO) == 0) {
                $model->CODREGIAO = null;
            }
            
            if ($model->save()) {
                return $model;
            } else {
                $this->actionGravarLog('log_sinc_cliente_app_' . $model->CNPJ . '.txt', 'App Cliente N° '
                        . $model->CODIGO, $model->errors);
                return 0;
            }
        } else {
            return Yii::error();
        }
    }

    public function actionClientefive() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isPost) {
            try {
                $model = \app\models\Cliente::findOne(['CODIGO' => $request->post('CODIGO'), 'CNPJ' => $request->post('CNPJ')]);
                if ($model != null) {
                    $model->attributes = $request->post();
                    if ($model->update()) {
                        return true;
                    } else {
                        $this->actionGravarLog('log_sinc_cliente_' . $model->CNPJ . '.txt', 'Five', ' Cliente N° '
                                . $model->CODIGO, $model->errors);
                        return $model->errors;
                    }
                } else {
                    $model = new \app\models\Cliente();
                    $model->attributes = $request->post();

                    if ($model->save()) {
                        return true;
                    } else {
                        $this->actionGravarLog('log_sinc_cliente_' . $model->CNPJ . '.txt', 'Five Cliente N° '
                                . $model->CODIGO, $model->errors);
                        return $model->errors;
                    }
                }
            } catch (\yii\console\Exception $e) {
                $this->actionGravarLog('log_sinc_cliente.txt', 'Five Cliente N° '
                        . $model->CODIGO, $e);
                return $e;
            }
        } else {
            $this->actionGravarlog('log_sinc_cliente.txt', 'Five', Yii::error());
            return Yii::error();
        }
    }

    public function actionProduto() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isPost) {
            $model = \app\models\Produto::findOne(['CODIGO' => $request->post('CODIGO'), 'CNPJ' => $request->post('CNPJ')]);
            if ($model != null) {
                $model->attributes = $request->post();
                if ($model->update()) {
                    return true;
                } else {
                    $this->actionGravarlog('log_sinc_produto_' . $model->CNPJ . '.txt', 'Five', $model->errors);
                    return $model->errors;
                }
            } else {
                $model = new \app\models\Produto();
                $model->attributes = $request->post();
                if ($model->save()) {
                    return true;
                } else {
                    $this->actionGravarlog('log_sinc_produto_' . $model->CNPJ . '.txt', 'Five', $model->errors);
                    return $model->errors;
                }
            }
        } else {
            return Yii::error();
        }
    }

    public function actionVenda() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isPost) {
            $model = new \app\models\Venda();
            $model->attributes = $request->post();
            $itens = $request->post('listaItens');

            if ($model->save()) {
                foreach ($itens as $item) {
                    $model_item = new \app\models\Item();
                    $model_item->attributes = $item;
                    $model_item->IDVENDA = $model->IDVENDA;
                    $model_item->UNITARIO = strval($model_item->UNITARIO);
                    $model_item->TOTAL = strval($model_item->TOTAL);
                    $model_item->DESCONTO = strval($model_item->DESCONTO);
                    if (!$model_item->save()) {
                        $model->delete();
                        $this->actionGravarLog('log_sinc_venda_app_' . $model->CNPJ . '.txt', $model->DISPOSITIVO . ' Venda N '
                                . $model->CODIGO, $model_item->errors);

                        return ['menssage' => 'erro'];
                    }// FALTA VERIFICAR ID DO CLIENTE NA VENDA SE ESTA CORRETO
                }

                //$this->actionEventovenda($model->IDVENDA, $model->CNPJ);
                return ['menssage' => $model->IDVENDA];
            } else {
                $this->actionGravarLog('log_sinc_venda_app_' . $model->CNPJ . '.txt', $model->DISPOSITIVO . ' Venda N° '
                        . $model->CODIGO, $model->errors);
                return ['menssage' => 'erro'];
            }
        } else {
            return Yii::error();
        }
    }

    public function actionReenviarvenda() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isPost) {
            $model = new \app\models\Venda();
            $model->attributes = $request->post();
            $itens = $request->post('listaItens');
            
            $idVendaServidor = $model->CODIGO;
            $codigoVendaApp = $request->post('IDVENDA');

            $vendaExiste = \app\models\Venda::findOne(['IDVENDA' => $idVendaServidor]);         

            if ($vendaExiste != null) {
                $vendaExiste->delete();
                
                $model->CODIGO = strval($codigoVendaApp);
                $model->IDVENDA = $idVendaServidor;
                
                if ($model->save()) {
                    foreach ($itens as $item) {
                        $model_item = new \app\models\Item();
                        $model_item->attributes = $item;
                        $model_item->IDVENDA = $model->IDVENDA;
                        $model_item->UNITARIO = strval($model_item->UNITARIO);
                        $model_item->TOTAL = strval($model_item->TOTAL);
                        $model_item->DESCONTO = strval($model_item->DESCONTO);
                        if (!$model_item->save()) {
                            $model->delete();
                            $this->actionGravarLog('log_sinc_venda_app_' . $model->CNPJ . '.txt', $model->DISPOSITIVO . ' Venda N '
                                    . $model->CODIGO, $model_item->errors);

                            return ['menssage' => 'erro'];
                        }// FALTA VERIFICAR ID DO CLIENTE NA VENDA SE ESTA CORRETO
                    }

                    return ['menssage' => $model->IDVENDA];
                } else {
                    $this->actionGravarLog('log_sinc_venda_app_' . $model->CNPJ . '.txt', $model->DISPOSITIVO . ' Venda N° '
                            . $model->CODIGO, $model->errors);
                    return ['menssage' => 'erro'];
                }

            } else {
                $this->actionGravarLog('log_sinc_venda_app_' . $model->CNPJ . '.txt', $model->DISPOSITIVO . ' Venda N° '
                            . $model->CODIGO, ['Tentativa de reenvio venda não existente ou não transmitida']);
                    return ['menssage' => 'erro'];                
            }
        } else {
            return Yii::error();
        }
    }

    public function actionVendafive() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isPost) {
            $cliente = \app\models\Cliente::findOne(['CODIGO' => $request->post('IDCLIENTE'), 'CNPJ' => $request->post('CNPJ')]);
            if ($cliente != null) {
                $model = new \app\models\Venda();
                $model->attributes = $request->post();
                $model->IDCLIENTE = $cliente->IDCLIENTE;

                $itens = $request->post('listaItens');
                $prod_nao_sync = [];
                for ($i = 0; $i < count($itens); $i++) {
                    $produto = \app\models\Produto::findOne(['CODIGO' => $itens[$i]['IDPRODUTO'], 'CNPJ' => $model->CNPJ]);
                    if ($produto != null)
                        $itens[$i]['IDPRODUTO'] = $produto->IDPRODUTO;
                    else
                        $prod_nao_sync['ITEM_' . intval($itens[$i]['ITEM'])] = $itens[$i]['IDPRODUTO'];
                }

                if (count($prod_nao_sync) > 0) {
                    $this->actionGravarlog_itens_venda('log_sinc_venda.txt', 'Five' . ' Venda N ' . $model->CODIGO .
                            'contém produtos não sincronizados', $prod_nao_sync);
                    return 'Venda possui produtos não sincronizados';
                }

                if ($model->save()) {
                    foreach ($itens as $item) {
                        $model_item = new \app\models\Item();
                        $model_item->attributes = $item;
                        $model_item->IDVENDA = $model->IDVENDA;
                        if (!$model_item->save()) {
                            $model->delete();
                            $this->actionGravarLog('log_sinc_venda_' . $model->CNPJ . '.txt', 'Five' . ' Venda N '
                                    . $model->CODIGO, $model_item->errors);

                            return $model_item->errors;
                        }
                    }
                    if (count($cliente->vendas) > 3) {
                        $cliente->vendas[0]->delete();
                    }
                    return true;
                } else {
                    $this->actionGravarLog('log_sinc_venda_' . $model->CNPJ . '.txt', $model->DISPOSITIVO . ' Venda N° '
                            . $model->CODIGO, $model->errors);
                    return $model->errors;
                }
            } else {
                $this->actionGravarlog_itens_venda('log_sinc_venda.txt', 'Five' . ' Venda N° '
                        . $request->post('CODIGO'), ['Cliente' => 'Cliente não identificado']);
                return 'Cliente não identificado';
            }
        } else {
            return Yii::error();
        }
    }

    public function actionReceber() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isPost) {
            $model = \app\models\Receber::findOne(['CODIGO' => $request->post('CODIGO'), 'CNPJ' => $request->post('CNPJ')]);
            if ($model != null) {
                $model->attributes = $request->post();
                if ($model->update()) {
                    return true;
                } else {
                    $this->actionGravarlog('log_sinc_receber_' . $model->CNPJ . '.txt', 'Five', $model->errors);
                    return $model->errors;
                }
            } else {
                $model = new \app\models\Receber();
                $model->attributes = $request->post();
                if ($model->save()) {
                    return true;
                } else {
                    $this->actionGravarlog('log_sinc_receber_' . $model->CNPJ . '.txt', 'Five', $model->errors);
                    return $model->errors;
                }
            }
        } else {
            return Yii::error();
        }
    }

    public function actionPagamento() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isPost) {
            $model = \app\models\Pagamento::findOne(['CODIGO' => $request->post('CODIGO'), 'CNPJ' => $request->post('CNPJ')]);
            if ($model) {
                $model->attributes = $request->post();
                if ($model->update()) {
                    return true;
                } else {
                    $this->actionGravarlog('log_sinc_pagamento_' . $model->CNPJ . '.txt', 'Five', $model->errors);
                    return $model->errors;
                }
            } else {
                $model = new \app\models\Pagamento();
                $model->attributes = $request->post();
                if ($model->save()) {
                    return true;
                } else {
                    $this->actionGravarlog('log_sinc_pagamento_' . $model->CNPJ . '.txt', 'Five', $model->errors);
                    return $model->errors;
                }
            }
        } else {
            return Yii::error();
        }
    }

    public function actionCondpagamento() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isPost) {
            $model = \app\models\Condicaopgto::findOne(['CODIGO' => $request->post('CODIGO'), 'CNPJ' => $request->post('CNPJ')]);
            if ($model != null) {
                if ($request->post('NOME') != null)
                    $model->attributes = $request->post();
                else {
                    $model->EXCLUIDO = $request->post('EXCLUSAO');
                    $model->CODIGO = $request->post('CODIGO');
                    $model->CNPJ = $request->post('CNPJ');
                }
                if ($model->update()) {
                    return true;
                } else {
                    $this->actionGravarlog('log_sinc_pagamento_' . $model->CNPJ . '.txt', 'Five', $model->errors);
                    return $model->errors;
                }
            } else {
                $model = new \app\models\Condicaopgto();
                $model->attributes = $request->post();
                if ($model->NOME != null && $model->NOME != '') {
                    if ($model->save()) {
                        return true;
                    } else {
                        $this->actionGravarlog('log_sinc_pagamento_' . $model->CNPJ . '.txt', 'Five', $model->errors);
                        return $model->errors;
                    }
                } else {
                    return 'Condição de pagamento excluida.';
                }
            }
        } else {
            return Yii::error();
        }
    }

    public function actionConfig_empresa() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isPost) {
            $model = \app\models\Empresaconfiguracao::findOne(['CNPJ' => $request->post('CNPJ')]);
            if ($model != null) {
                $model->attributes = $request->post();
                if ($model->update()) {
                    return true;
                } else {
                    $this->actionGravarlog('log_sinc_configEmpresa_' . $model->CNPJ . '.txt', 'Five', $model->errors);
                    return $model->errors;
                }
            } else {
                $model = new \app\models\Empresaconfiguracao();
                $model->attributes = $request->post();
                if ($model->save()) {
                    return true;
                } else {
                    $this->actionGravarlog('log_sinc_configEmpresa_' . $model->CNPJ . '.txt', 'Five', $model->errors);
                    return $model->errors;
                }
            }
        } else {
            return Yii::error();
        }
    }

    public function actionFuncionario() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isPost) {
            $model = \app\models\Funcionario::findOne(['CODIGO' => $request->post('CODIGO'), 'CNPJ' => $request->post('CNPJ')]);
            if ($model != null) {
                $model->attributes = $request->post();
                if ($model->update()) {
                    return true;
                } else {
                    $this->actionGravarlog('log_funcionario_' . $model->CNPJ . '.txt', 'Five', $model->errors);
                    return $model->errors;
                }
            } else {
                $model = new \app\models\Funcionario();
                $model->attributes = $request->post();
                if ($model->save()) {
                    return true;
                } else {
                    $this->actionGravarlog('log_funcionario_' . $model->CNPJ . '.txt', 'Five', $model->errors);
                    return $model->errors;
                }
            }
        } else {
            return Yii::error();
        }
    }

    private function actionGravarlog($nome_arquivo, $dispositivo, $mensagem) {
        try {
            date_default_timezone_set('America/Manaus');
            $data_atual = date('d/m/Y H:i:s');
            $erro_mensage = '';
            foreach ($mensagem as $key => $value)
                $erro_mensage .= $key . ':' . $value[0] . PHP_EOL;
            $path = Yii::getAlias('@webroot');
            $path .= '/log/';
            chmod($path, 0777);
            $fp = fopen($path . $nome_arquivo, 'a+');
            $mensagem_gravar = $data_atual . ' ' . 'Dispositivo : ' . $dispositivo
                    . ' | Erros => ' . $erro_mensage;

            fwrite($fp, $mensagem_gravar);
            fclose($fp);
        } catch (Exception $ex) {
            
        }
    }

    private function actionGravarlog_itens_venda($nome_arquivo, $dispositivo, $mensagem) {
        try {
            date_default_timezone_set('America/Manaus');
            $data_atual = date('d/m/Y H:i:s');
            $erro_mensage = '';
            foreach ($mensagem as $key => $value)
                $erro_mensage .= $key . ':' . $value . ' ' . ' ';
            $path = Yii::getAlias('@webroot');
            $path .= '/log/';
            chmod($path, 0777);
            $fp = fopen($path . $nome_arquivo, 'a+');
            $mensagem_gravar = $data_atual . ' ' . 'Dispositivo : ' . $dispositivo
                    . PHP_EOL . ' | Erros => ' . $erro_mensage . PHP_EOL;

            fwrite($fp, $mensagem_gravar);
            fclose($fp);
        } catch (Exception $ex) {
            
        }
    }

    private function actionEventovenda($idvenda, $cnpj) {
        $db = new \SQLite3(Yii::getAlias('@app') . '/web/DB_EVENTO/BASE_EVENTO_FIVE.db');
        /* $stm = $db->prepare('insert into VENDA_APP (IDVENDA,CNPJ) values (?,?)');
          $stm->bindParam(1, $idvenda);
          $stm->bindParam(2, $cnpj);
          $stm->execute(); */
        $db->exec('insert into VENDA_APP (IDVENDA,CNPJ) values (' . $idvenda . ',"' . $cnpj . '")');
        $db->close();
    }

}
