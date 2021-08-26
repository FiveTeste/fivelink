<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;

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
    public function actionIndex($mesa) {
        if (isset($mesa)) {
            return $this->render('index', [
                        'mesa' => $mesa,
            ]);
        }else{
            return $this->render('error');
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

                $path = \Yii::$app->basePath .'/web/images/produtos';
                //return $path ;
                $uploaded = move_uploaded_file($fileTemp, $path.'/'.$codigo.'.png');
                if($uploaded){
                    $model = \app\models\Produto::findOne(['CODIGO'=>$codigo]);
                    $model->FOTO = $codigo.'.png';
                    $model->update();
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
            foreach ($model as $g){               
                $g->NAO_MOSTRA_KYOSK = \app\models\Subgrupo::findAll(['CODGRUPO'=>$g->CODIGO]);
            }
            return $model;
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

    public function actionSalvarpedido() {
        Yii::$app->response->format = Response::FORMAT_JSON;
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

            foreach ($consumo_list as $consumo) {
                $consumo_model = \app\models\Consumo::findOne(['DISPOSITIVO' => $consumo['DISPOSITIVO']]);
                if ($consumo_model == null) {
                    $consumo_model = new \app\models\Consumo();
                    $consumo_model->attributes = $consumo;
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
                }
            }

            return ['message' => 'sucesso'];
        } else {
            return [];
        }
    }

}
