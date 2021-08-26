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

class AdminController extends Controller {
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
    public function actionClientefive() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isPost) {
            try {
                $model = \app\models\Fivecliente::findOne(['CNPJ' => $request->post('CNPJ')]);
                $cod_uf = $this->getCodestado($request->post('UF'));
                $cidade = \app\models\Cidade::findOne(['NOME' => $request->post('CIDADE'), 'IDESTADO' => $cod_uf]);
                $IDCIDADE = 22;

                if ($cidade) {
                    $IDCIDADE = $cidade->IDCIDADE;
                }

                //return $IDCIDADE;
                if ($model != null) {
                    $model->attributes = $request->post();
                    $model->CIDADE = $IDCIDADE;
                    if ($model->update()) {
                        return true;
                    } else if (count($model->errors) > 0) {
                        $this->actionGravarLog('log_sinc_clienteFive_' . $model->CNPJ . '.txt', 'Five Cliente N° '
                                . $model->CODIGO, $model->errors);
                        return $model->errors;
                    } else {
                        return true;
                    }
                } else {
                    $model = new \app\models\Fivecliente();
                    $model->attributes = $request->post();
                    $model->CIDADE = $IDCIDADE;
                    if ($model->save()) {
                        return true;
                    } else {
                        $this->actionGravarLog('log_sinc_clienteFive_' . $model->CNPJ . '.txt', 'Five Cliente N° '
                                . $model->CODIGO, $model->errors);
                        return $model->errors;
                    }
                }
            } catch (\yii\console\Exception $e) {
                $this->actionGravarLog('log_sinc_clienteFive.txt', 'Five Cliente N° '
                        . $model->CODIGO, $e);
                return $e;
            }
        } else {
            $this->actionGravarlog('log_sinc_clienteFive.txt', 'Five', Yii::error());
            return Yii::error();
        }
    }

    public function actionFiveverificaempresa() {
        $request = Yii::$app->request;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if ($request->isGet) {
            if ($request->get('cnpj')) {
                date_default_timezone_set('America/Manaus');
                $cnpj = $request->get('cnpj');
                $model = \app\models\Fivecliente::findOne(['CNPJ' => $cnpj]);
                if (count($model) > 0) {
                    $dados = array([
                            "bloqueado" => $model->BLOQUEADO,
                            "demonstracao" => $model->DEMONSTRACAO,
                            "liberado_ate" => date('d/m/Y', strtotime($model->LIBERADO_ATE)),
                            "carencia" => $model->CARENCIA,
                            "liberacao_extra" => $model->LIBERACAO_EXTRA,
                            "data_servidor" => date('d/m/Y')
                    ]);
                    return $dados;
                } else {
                    return 'ERROR: EMPRESA NAO CADASTRADA';
                }
            }else{
                return 'ERROR: PARAMETROS INCORRETOS';
            }
        } else {
            $this->actionGravarLog('log_FiveVerificaEmpresa.txt', 'Five ', ['erro' => Yii::error()]);
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

    private function actionEventovenda($idvenda, $cnpj) {
        $db = new \SQLite3(Yii::getAlias('@app') . '/web/DB_EVENTO/BASE_EVENTO_FIVE.db');
        /* $stm = $db->prepare('insert into VENDA_APP (IDVENDA,CNPJ) values (?,?)');
          $stm->bindParam(1, $idvenda);
          $stm->bindParam(2, $cnpj);
          $stm->execute(); */
        $db->exec('insert into VENDA_APP (IDVENDA,CNPJ) values (' . $idvenda . ',"' . $cnpj . '")');
        $db->close();
    }

    private function getCodestado($uf) {
        $ufs = [
            'AC' => 1, 'AL' => 2, 'AP' => 3, 'AM' => 4, 'BA' => 5, 'CE' => 6, 'DF' => 7, 'ES' => 8, 'GO' => 9, 'MA' => 10,
            'MT' => 11, 'MS' => 12, 'MG' => 13, 'PA' => 14, 'PB' => 15, 'PR' => 16, 'PE' => 17, 'PI' => 18, 'RJ' => 19,
            'RN' => 20, 'RS' => 21, 'RO' => 22, 'RR' => 23, 'SC' => 24, 'SP' => 25, 'SE' => 26, 'TO' => 27, 'EX' => 28
        ];

        foreach ($ufs as $key => $value) {
            if ($key == $uf) {
                return $value;
            }
        }
    }

}
