<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;
use DateTime;
use Exception;
use Ramsey\Uuid\Uuid;
use ReallySimpleJWT\Token;
use yii\db\Query;
use yii\helpers\Json;

class SiteController extends Controller {

    /**
     * {@inheritdoc}
     */
    public function behaviors() {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout'],
                'rules' => [
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function actions() {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    /**
     * Displays homepage.
     *
     * @return string
     */
    public function actionIndex() {
        $mesa = Yii::$app->getRequest()->getQueryParam("mesa");

        if (isset($mesa)) {
            return $this->render('index', [
                'mesa' => $mesa
            ]);
        } else {
            return $this->render('error');
        }
    }

    public function actionGeneratetoken() {
        $req = Yii::$app->request;
        if ($req->isPut) {
            Yii::$app->response->format = Response::FORMAT_JSON;

            $mesa = $req->getBodyParam('mesa');
            $token = $req->getBodyParam('token', null);
    
            if (isset($token) && !Token::validate($token, "Hello&MikeFooBar123")) {
                Yii::$app->response->statusCode = 400;
                return ['message' => 'invalid token'];
            }
    
            $uuid = Uuid::uuid4();
            $payload = [
                'iat' => time(),
                'uid' => $mesa,
                'req_uid' => $uuid->toString(),
            ];
            $newToken = Token::customPayload($payload, "Hello&MikeFooBar123");

            return ['token' => $newToken];
        } else {
            return [];
        }
    }

    
        public function actionFoto() {
        $re = Yii::$app->request;
        if ($re->isAjax) {
            $fileName = $_FILES['file']['name'];
            $fileType = $_FILES['file']['type'];
            $fileError = $_FILES['file']['error'];
            $fileTemp = $_FILES['file']['tmp_name'];
            $fileExt = pathinfo($fileName, PATHINFO_EXTENSION);
            $fileContent = file_get_contents($_FILES['file']['tmp_name']);
            $codigo = $re->post("produto");
            
            if ($fileError == UPLOAD_ERR_OK) {                
                $image_path = '/web/images/produtos/'.$codigo.'.png';
                $uploaded = move_uploaded_file($fileTemp, \Yii::$app->basePath.$image_path);
                if($uploaded){
                    $model = \app\models\Produto::findOne(['CODIGO'=>$codigo]);
                    $model->FOTO = $image_path;
                    $model->save();

                }
                return $uploaded;
            } else {
                switch ($fileError) {
                    case UPLOAD_ERR_INI_SIZE:
                        $message = 'Error ao tentar subir um arquivo que excede o tamanho permitido.';
                        break;
                    case UPLOAD_ERR_FORM_SIZE:
                        $message = 'Error ao tentar subir um arquivo que excede o tamanho permitido.';
                        break;
                    case UPLOAD_ERR_PARTIAL:
                        $message = 'Error: não terminou o upload do arquivo.';
                        break;
                    case UPLOAD_ERR_NO_FILE:
                        $message = 'Error: nenhum arquivo foi selecionado.';
                        break;
                    case UPLOAD_ERR_NO_TMP_DIR:
                        $message = 'Error: servidor não configurado para carga de arquivos.';
                        break;
                    case UPLOAD_ERR_CANT_WRITE:
                        $message = 'Error: possivel falha ao gravar o arquivo.';
                        break;
                    case UPLOAD_ERR_EXTENSION:
                        $message = 'Error: arquivo não carregado completamente.';
                        break;
                    default: $message = 'Error: arquivo não carregado completamente.';
                        break;
                }
                echo json_encode(array(
                    'error' => true,
                    'message' => $message
                ));
            }
        } else {
            return $this->redirect(['404', 'id' => '404']);
        }
    }
    /**
     * Login action.
     *
     * @return Response|string
     */
    public function actionLogin() {
        if (!Yii::$app->user->isGuest) {
            return $this->goHome();
        }

        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post()) && $model->login()) {
            return $this->goBack();
        }

        $model->password = '';
        return $this->render('login', [
                    'model' => $model,
        ]);
    }

    /**
     * Logout action.
     *
     * @return Response
     */
    public function actionLogout() {
        Yii::$app->user->logout();

        return $this->goHome();
    }

    /**
     * Displays contact page.
     *
     * @return Response|string
     */
    public function actionContact() {
        $model = new ContactForm();
        if ($model->load(Yii::$app->request->post()) && $model->contact(Yii::$app->params['adminEmail'])) {
            Yii::$app->session->setFlash('contactFormSubmitted');

            return $this->refresh();
        }
        return $this->render('contact', [
                    'model' => $model,
        ]);
    }

    /**
     * Displays about page.
     *
     * @return string
     */
    public function actionAbout() {
        return $this->render('about');
    }

    
    /**         FUNCOES DO APLICATIVO           **/
    public function actionGrupo() {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $req = Yii::$app->request;

        if ($req->isGet) {
            $model = \app\models\Grupo::findAll(['NAO_MOSTRA_KYOSK' => 'N']);
            $grupos = json_decode(Json::encode($model), true);
            
            $response = array();
            foreach ($grupos as $grupo) {
                $codigo = $grupo["CODIGO"];
                $NAO_MOSTRA_KYOSK = \app\models\Subgrupo::findAll(['CODGRUPO'=>$codigo, 'NAO_MOSTRA_KYOSK' => 'N']);

                $grupo["TEM_SUBGRUPO"] = empty($NAO_MOSTRA_KYOSK) === false;
                array_push($response, $grupo);
            }
            return $response;
        } else {
            return [];
        }
    }

    public function actionSubgrupo() {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $req = Yii::$app->request;

        if ($req->isAjax) {
            $grupo = $req->get('codgrupo');
            $model = \app\models\Subgrupo::findAll(['CODGRUPO' => $grupo, 'NAO_MOSTRA_KYOSK' => 'N']);
            return $model;
        } else {
            return [];
        }
    }
    
    public function actionGetsubgrupo() {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $req = Yii::$app->request;

        if ($req->isAjax) {
            $cod = $req->get('cod');
            $model = \app\models\Subgrupo::findOne(['CODIGO' => $cod]);
            return $model;
        } else {
            return [];
        }
    }

    public function actionProduto() {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $req = Yii::$app->request;

        if ($req->isAjax) {
            $cod = $req->get('cod');
            $model = \app\models\Produto::findOne(['CODIGO' => $cod]);
            return $model;
        } else {
            return [];
        }
    }

    public function actionProdutobygrupo() {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $req = Yii::$app->request;

         if ($req->isAjax) {
            $grupo = $req->get('codgrupo');
            $model = \app\models\Produto::findAll(['MOSTRA_KYOSK_APP' => 1, 'CODGRUPO' => $grupo, 'SITUACAO' => 0]);
            return $model;
         } else {
             return [];
         }
    }

    public function actionProdutobysubgrupo() {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $req = Yii::$app->request;

        if ($req->isAjax) {
            $subgrupo = $req->get('cod');
            $model = \app\models\Produto::findAll(['MOSTRA_KYOSK_APP' => 1, 'CODSUBGRUPO' => $subgrupo, 'SITUACAO' => 0]);
            return $model;
        } else {
            return [];
        }
    }

    public function actionOpcionalbyproduto() {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $req = Yii::$app->request;

        if ($req->isAjax) {
            $codproduto = $req->get('codproduto');
            $model = \app\models\Ingrediente::find()
                    ->innerJoin("produto_ingrediente", "produto_ingrediente.CODINGREDIENTE = ingrediente.CODIGO ")
                    ->andWhere(["produto_ingrediente.CODPRODUTO" => $codproduto])
                    ->all();
            return $model;
        } else {
            return [];
        }
    }

    public function actionAdicionalbyproduto() {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $req = Yii::$app->request;

        if ($req->isAjax) {
            $codproduto = $req->get('codproduto');
            $model = \app\models\Produto::find()
                    ->innerJoin("produto_adicional", "produto_adicional.PROD_ADICIONAL = produto.CODIGO ")
                    ->andWhere(["produto_adicional.CODPRODUTO" => $codproduto])
                    ->all();
            return $model;
        } else {
            return [];
        }
    }

    public function actionSalvarpedido($token) {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $payload = Token::getPayload($token, "Hello&MikeFooBar123");
        $uid = $payload["req_uid"];

        $existentToken = \app\models\Token::findOne(['uuid' => $uid]);
        if ($existentToken != null) {
            Yii::$app->response->statusCode = 400;
            return ['message' => 'invalid token'];
        }

        $req = Yii::$app->request;
        if ($req->isPost) {
            $mesa = $req->post('mesa');
            $consumo_list = $req->post('pedido');

            $model_mesa = \app\models\Mesa::findOne(['COD_MESA' => $mesa['COD_MESA']]);
            if ($model_mesa != null) {
                $model_mesa->attributes = $mesa;
                $model_mesa->update();
            } else {
                $model_mesa = new \app\models\Mesa();
                $model_mesa->attributes = $mesa;
                $model_mesa->save();
            }

            $model_comanda = \app\models\Comanda::find()
                ->where('COD_MESA = :mesa AND SITUACAO <> :situacao', ['mesa' => $mesa['COD_MESA'], "situacao" => 2])
                ->one();
                
            if (!isset($model_comanda)) {
                $now = new DateTime();

                $model_comanda = new \app\models\Comanda();
                $model_comanda->COD_MESA = $model_mesa["COD_MESA"];
                $model_comanda->SITUACAO = 0;
                $model_comanda->DATA_CRIACAO = $now->format('Y-m-d H:i:s');
                $model_comanda->save();
            }
            if ($model_comanda["SITUACAO"] == 1) {
                Yii::$app->response->statusCode = 400;
                return ['message' => 'order closed'];
            }
            
            foreach ($consumo_list as $consumo) {
                $consumo_model = \app\models\Consumo::findOne(['DISPOSITIVO' => $consumo['DISPOSITIVO']]);
                if ($consumo_model == null) {
                    $consumo_model = new \app\models\Consumo();
                    $consumo_model->attributes = $consumo;
                    $consumo_model->COD_COMANDA = $model_comanda["CODIGO"];
                    
                    if (!$consumo_model->save()) {
                        return ['message' => $consumo_model->errors];
                    }

                    // inserir adicionais  
                    if (isset($consumo['LISTA_ADICIONAIS'])) {
                        $adicionais = $consumo['LISTA_ADICIONAIS'];
                        foreach ($adicionais as $ad) {
                            $adicional = new \app\models\Itemadicional();
                            $adicional->attributes = $ad;
                            $adicional->CONSUMO = $consumo_model->CODIGO;
                            $adicional->save();
                        }
                    }

                    // inserir opcionais
                    if (isset($consumo['LISTA_OPCIONAIS'])) {
                        $opcionais = $consumo['LISTA_OPCIONAIS'];
                        foreach ($opcionais as $op) {
                            $opcional = new \app\models\Itemingrediente();
                            $opcional->attributes = $op;
                            $opcional->CONSUMO = $consumo_model->CODIGO;
                            $opcional->save();
                        }
                    }

                    // inserir montagem
                    if (isset($consumo['LISTA_MONTAGEM'])) {
                        $montagem = $consumo['LISTA_MONTAGEM'];
                        foreach ($montagem as $item) {
                            $montado = new \app\models\ItemMontado();
                            $montado->attributes = $item;
                            $montado->CONSUMO = $consumo_model->CODIGO;
                            $montado->save();
                        }
                    }
                }
            }

            $tokenreg = new \app\models\Token();
            $tokenreg->uuid = $uid;
            $tokenreg->save();

            return ['message' => 'sucesso'];
        } else {
            return [];
        }
    }

    public function actionComanda() {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $req = Yii::$app->request;

        if ($req->isAjax) {
            $mesa = $req->get('codmesa');

            $model_comanda = \app\models\Comanda::find()
                ->where('COD_MESA = :mesa AND SITUACAO  <> :situacao', ['mesa' => $mesa, "situacao" => 2])
                ->one();

           

            $consumos = \app\models\Consumo::find()
                ->with("itemMontados")
                ->where(["consumo.COD_COMANDA" => $model_comanda["CODIGO"]])
                ->all();
            
            $consumos_ids = [];
            $consumo_map = [];
            foreach ($consumos as $consumo) {
                array_push($consumos_ids, $consumo["CODIGO"]);
                $consumo_map[$consumo["CODIGO"]] = json_decode(Json::encode($consumo), true);
            }

            $query = new Query();
            $command = $query
                ->select("
                    item_montado.PRECO, 
                    item_montado.CONSUMO, 
                    produto.CODIGO as PRODUTO_CODIGO,
                    produto.PRODUTO as PRODUTO_NOME
                ")
                ->from("item_montado")
                ->innerJoin("produto", "item_montado.CODPRODUTO = produto.CODIGO")
                ->where(['IN', 'CONSUMO', $consumos_ids])
                ->createCommand();

            $montados = $command->queryAll();

            foreach ($montados as $montado) {
                $item = $consumo_map[$montado["CONSUMO"]];

                if (isset($item["MONTADO"])) {
                    array_push($item["MONTADO"], $montado);
                } else {
                    $item["MONTADO"] = [$montado];
                }

                $consumo_map[$montado["CONSUMO"]] = $item;
            }

            return array_values($consumo_map);
        } else {
            return [];
        }
    }

    public function actionInfocomanda() {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $req = Yii::$app->request;

        if ($req->isAjax) {
            $mesa = $req->get('codmesa');

            $model_comanda = \app\models\Comanda::find()
                ->where('COD_MESA = :mesa AND SITUACAO <> :situacao', ['mesa' => $mesa, "situacao" => 2])
                ->one();

            return $model_comanda;
        } else {
            return [];
        }
    }

    public function actionFecharcomanda() {
        Yii::$app->response->format = Response::FORMAT_JSON;
        
        $req = Yii::$app->request;
        if ($req->isPost) {
            $token = $req->post('token');

            $payload = Token::getPayload($token, "Hello&MikeFooBar123");
            $uid = $payload["req_uid"];
            $mesa = $payload["uid"];

            $existentToken = \app\models\Token::findOne(['uuid' => $uid]);
            if ($existentToken != null) {
                Yii::$app->response->statusCode = 400;
                return ['message' => 'invalid token'];
            }

            $model_comanda = \app\models\Comanda::findOne(["COD_MESA" => $mesa, "SITUACAO" => 0]);
            $model_comanda->SITUACAO = 1;
            $model_comanda->update();

            $tokenreg = new \app\models\Token();
            $tokenreg->uuid = $uid;
            $tokenreg->save();

            return ['message' => 'sucesso'];
        } else {
            return [];
        }
    }

}
