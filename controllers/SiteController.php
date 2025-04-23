<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;
use app\validators\PromotionalValidator;
use yii\db\Query;
use yii\helpers\Json;

class SiteController extends Controller
{

    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
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
    public function actions()
    {
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
    public function actionIndex()
    {
        $current_url = Yii::$app->request->url;
        $current_path = parse_url($current_url, PHP_URL_PATH);

        if (preg_match("/(\/index.php)$/", $current_path)) {
            $newUrl = preg_replace("/(\/index.php)$/", "/", $current_path);

            $params = Yii::$app->request->getQueryParams();
            $paramNames = array_keys($params);

            $paramsUrl = "";
            $separador = "";
            foreach ($paramNames as $paramName) {
                $param = $params[$paramName];
                $paramsUrl .= $separador . "$paramName=$param";
                $separador = "&";
            }

            $newUrl .= "?$paramsUrl";
            return $this->redirect($newUrl);
        }

        $empresa = \app\models\Empresa::find()->one();

        return $this->render("index", [
            'painelUrl' => Yii::$app->params['painelUrl'],
            'empresa' => $empresa
        ]);
    }

    public function actionFoto()
    {
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
                $image_path = '/web/images/produtos/' . $codigo . '.png';
                $uploaded = move_uploaded_file($fileTemp, \Yii::$app->basePath . $image_path);
                if ($uploaded) {
                    $model = \app\models\Produto::findOne(['CODIGO' => $codigo]);
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
                    default:
                        $message = 'Error: arquivo não carregado completamente.';
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
    public function actionLogin()
    {
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
    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }

    /**
     * Displays contact page.
     *
     * @return Response|string
     */
    public function actionContact()
    {
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
    public function actionAbout()
    {
        return $this->render('about');
    }

    /**         FUNCOES DO APLICATIVO           * */
    public function actionGrupo()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $req = Yii::$app->request;

        if ($req->isGet) {
            //$model = \app\models\Grupo::findAll(['APP_DELIVERY' => 1]);
            $model = \app\models\Grupo::findBySql('select * from grupo g where g.APP_DELIVERY = 1 order by g.sequencia,g.GRUPO')->all();
            $grupos = json_decode(Json::encode($model), true);

            $response = array();
            foreach ($grupos as $grupo) {
                $codigo = $grupo["CODIGO"];
                $NAO_MOSTRA_KYOSK = \app\models\Subgrupo::findAll(['CODGRUPO' => $codigo, 'NAO_MOSTRA_KYOSK' => 'N']);

                $grupo["TEM_SUBGRUPO"] = empty($NAO_MOSTRA_KYOSK) === false;
                array_push($response, $grupo);
            }
            return $response;
        } else {
            return [];
        }
    }

    public function actionBairros()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $req = Yii::$app->request;

        if ($req->isAjax) {
            $bairros = \app\models\Bairros::find()->all();

            return $bairros;
        } else {
            return [];
        }
    }

    public function actionCliente()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $req = Yii::$app->request;

        if ($req->isAjax) {
            $telefone = $req->get('telefone');
            $parsedPhone = preg_replace('/\D/', '', $telefone);

            $model = \app\models\Cliente::findOne(['telefone' => $parsedPhone]);
            if ($model == null) {
                return ['error' => 'client not found'];
            }

            $bairro = \app\models\Bairros::findOne(["id_bairro" => $model->bairro_id]);
            if ($bairro != null) {
                $result = json_decode(Json::encode($model), true);
                $result['bairro'] = $bairro;

                return $result;
            }

            return $model;
        } else {
            return [];
        }
    }

    public function actionSavecliente()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $req = Yii::$app->request;

        if ($req->isPost) {
            $cliente = $req->post("cliente");

            $telefone = $cliente["telefone"];
            $telefone = preg_replace('/\D/', '', $telefone);

            $model = new \app\models\Cliente();
            $model->attributes = $cliente;
            $model->telefone = $telefone;


            if (!$model->save()) {
                return ['message' => $model->errors];
            }

            $bairro = \app\models\Bairros::findOne(["id_bairro" => $model->bairro_id]);
            if ($bairro != null) {
                $result = json_decode(Json::encode($model), true);
                $result['bairro'] = $bairro;

                return ['message' => 'sucesso', 'cliente' => $result];
            }

            return ['message' => 'sucesso', 'cliente' => $model];
        } else {
            return [];
        }
    }

    public function actionUpdatecliente()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $req = Yii::$app->request;

        if ($req->isPost) {
            $cliente = $req->post("cliente");
            $cliente_id = $req->post("cliente_id");

            $telefone = $cliente["telefone"];
            $telefone = preg_replace('/\D/', '', $telefone);

            $model = \app\models\Cliente::findOne(["id" => $cliente_id]);
            if ($model == null) {
                return ['error' => 'client not found'];
            }

            $model->attributes = $cliente;
            $model->telefone = $telefone;

            if (!$model->save()) {
                return ['message' => $model->errors];
            }

            $bairro = \app\models\Bairros::findOne(["id_bairro" => $model->bairro_id]);
            if ($bairro != null) {
                $result = json_decode(Json::encode($model), true);
                $result['bairro'] = $bairro;

                return ['message' => 'sucesso', 'cliente' => $result];
            }

            return ['message' => 'sucesso', 'cliente' => $model];
        } else {
            return [];
        }
    }

    public function actionCupom()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $req = Yii::$app->request;

        if ($req->isAjax) {
            $cupom = $req->get('cupom');
            $model = \app\models\Cupom::findOne(["cupom" => $cupom]);
            if ($model['quantidade_disponivel'] <= $model['quantidade_usada']) {
                return ['error' => 'expired promotional code'];
            }

            return $model;
        } else {
            return [];
        }
    }

    public function actionSubgrupo()
    {
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

    public function actionGetsubgrupo()
    {
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

    public function actionProduto()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $req = Yii::$app->request;

        if ($req->isAjax) {
            $cod = $req->get('cod');
            $model = \app\models\Produto::findOne(['CODIGO' => $cod]);

            $opcoes = (new Query())
                ->select("ingrediente.*, produto_ingrediente.CODIGO as ISINGREDIENTE_COD, produto_ingrediente.CODPRODUTO as ISINGREDIENTE_CODPRODUTO")
                ->from("ingrediente")
                ->innerJoin("produto_ingrediente", "produto_ingrediente.CODINGREDIENTE = ingrediente.CODIGO")
                ->where(["produto_ingrediente.CODPRODUTO" => $cod])
                ->all();

            $adicionais = (new Query())
                ->select("produto.*, produto_adicional.CODIGO as ISADICIONAL_COD")
                ->from("produto")
                ->innerJoin("produto_adicional", "produto_adicional.PROD_ADICIONAL = produto.CODIGO")
                ->where(["produto_adicional.CODPRODUTO" => $cod])
                ->all();


            $opcionais = (new Query())
                ->select("produto.*, produto_opcional.CODIGO as ISOPCIONAL_COD")
                ->from("produto")
                ->innerJoin("produto_opcional", "produto_opcional.CODOPCIONAL = produto.CODIGO")
                ->where(["produto_opcional.CODPRODUTO" => $cod])
                ->all();

            $adicionaisResponse = array();
            foreach ($adicionais as $adicional) {
                $adicionalValidator = new PromotionalValidator($adicional);

                $adicionalResult = json_decode(Json::encode($adicional), true);
                $adicionalResult['isPromotional'] = $adicionalValidator->isPromotional();
                array_push($adicionaisResponse, $adicionalResult);
            }

            $opcionaisResponse = array();
            foreach ($opcionais as $opcional) {
                $opcionalValidator = new PromotionalValidator($opcional);

                $opcionalResult = json_decode(Json::encode($opcional), true);
                $opcionalResult['isPromotional'] = $opcionalValidator->isPromotional();
                array_push($opcionaisResponse, $opcionalResult);
            }

            $combos = \app\models\Combo::find()
            ->where(['CODPRODUTO' => $cod])
            ->orderBy(['ORDEM' => SORT_ASC])
            ->all();

            $response = [];
            foreach ($combos as $combo) {
                $produtosCombo = \app\models\ComboProdutos::find()
                ->With('produto')
                ->where(['COMBO_ID' => $combo->ID])
                ->all();

            $produtos = [];
            foreach ($produtosCombo as $produtoCombo) {
                $produtoDetalhes = \app\models\Produto::findOne(['CODIGO' => $produtoCombo->CODPRODUTO]);
                if ($produtoDetalhes) {
                    $produtos[] = [
                        'ID' => $produtoCombo->ID,
                        'COMBO_ID' => $produtoCombo->COMBO_ID,
                        'CODPRODUTO' => $produtoCombo->CODPRODUTO,
                        'VALOR' => $produtoCombo->VALOR,
                        'QTDE' => $produtoCombo->QTDE,
                    ];
                }
            }

            $response[] = [
                'combo' => [
                    'ID' => $combo->ID,
                    'DESCRICAO' => $combo->DESCRICAO,
                    'QTDE_MAX' => $combo->QTDE_MAX,
                    'ORDEM' => $combo->ORDEM,
                    'CODPRODUTO' => $combo->CODPRODUTO,
                    'OBRIGATORIO' => $combo->OBRIGATORIO,
                    'VALOR_BASE' => $combo->VALOR_BASE,
                ],
                'produtos' => $produtos,
            ];
            }

            $validator = new PromotionalValidator($model);

            $result = json_decode(Json::encode($model), true);
            $result['opcoes'] = $opcoes;
            $result['adicionais'] = $adicionaisResponse;
            $result['opcionais'] = $opcionaisResponse;
            $result['combos'] = $response;
            $result['isPromotional'] = $validator->isPromotional();

            return $result;
        } else {
            return [];
        }
    }

    public function actionDestaques()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $req = Yii::$app->request;

        if ($req->isAjax) {
            $destaques = \app\models\Produto::findAll(["DESTAQUE" => "S", "SITUACAO" => 0, "APP_DELIVERY" => 1]);

            $response = array();
            foreach ($destaques as $produto) {
                $validator = new PromotionalValidator($produto);

                $result = json_decode(Json::encode($produto), true);
                $result['isPromotional'] = $validator->isPromotional();

                array_push($response, $result);
            }

            return $response;
        } else {
            return [];
        }
    }

    public function actionProdutobygrupo()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $req = Yii::$app->request;

        if ($req->isGet) {
            $grupo = $req->get('codgrupo');
            //$model = \app\models\Produto::findAll(['APP_DELIVERY' => 1, 'CODGRUPO' => $grupo, 'SITUACAO' => 0]);
            $model = \app\models\Produto::findBySql("select * from produto p where p.SITUACAO = 0 and p.APP_DELIVERY = 1 and p.CODGRUPO = '" . $grupo . "' order by p.PRODUTO")->all();

            $response = array();
            foreach ($model as $produto) {
                $validator = new PromotionalValidator($produto);

                $result = json_decode(Json::encode($produto), true);
                $result['isPromotional'] = $validator->isPromotional();

                array_push($response, $result);
            }
            return $response;
        } else {
            return [];
        }
    }

    public function actionProdutobysubgrupo()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $req = Yii::$app->request;

        if ($req->isAjax) {
            $subgrupo = $req->get('cod');
            $model = \app\models\Produto::findAll(['APP_DELIVERY' => 1, 'CODSUBGRUPO' => $subgrupo, 'SITUACAO' => 0]);

            $response = array();
            foreach ($model as $produto) {
                $validator = new PromotionalValidator($produto);

                $result = json_decode(Json::encode($produto), true);
                $result['isPromotional'] = $validator->isPromotional();

                $codproduto = $produto['CODIGO'];

                $opcoes = (new Query())
                    ->select("ingrediente.*, produto_ingrediente.CODIGO as ISINGREDIENTE_COD, produto_ingrediente.CODINGREDIENTE as ISINGREDIENTE_CODINGREDIENTE")
                    ->from("ingrediente")
                    ->innerJoin("produto_ingrediente", "produto_ingrediente.CODINGREDIENTE = ingrediente.CODIGO")
                    ->where(["produto_ingrediente.CODPRODUTO" => $codproduto])
                    ->all();

                $adicionais = (new Query())
                    ->select("produto.*, produto_adicional.CODIGO as ISADICIONAL_COD")
                    ->from("produto")
                    ->innerJoin("produto_adicional", "produto_adicional.PROD_ADICIONAL = produto.CODIGO")
                    ->where(["produto_adicional.CODPRODUTO" => $codproduto])
                    ->all();


                $opcionais = (new Query())
                    ->select("produto.*, produto_opcional.CODIGO as ISOPCIONAL_COD")
                    ->from("produto")
                    ->innerJoin("produto_opcional", "produto_opcional.CODOPCIONAL = produto.CODIGO")
                    ->where(["produto_opcional.CODPRODUTO" => $codproduto])
                    ->all();

                $adicionaisResponse = array();
                foreach ($adicionais as $adicional) {
                    $adicionalValidator = new PromotionalValidator($adicional);

                    $adicionalResult = json_decode(Json::encode($adicional), true);
                    $adicionalResult['isPromotional'] = $adicionalValidator->isPromotional();
                    array_push($adicionaisResponse, $adicionalResult);
                }

                $opcionaisResponse = array();
                foreach ($opcionais as $opcional) {
                    $opcionalValidator = new PromotionalValidator($opcional);

                    $opcionalResult = json_decode(Json::encode($opcional), true);
                    $opcionalResult['isPromotional'] = $opcionalValidator->isPromotional();
                    array_push($opcionaisResponse, $opcionalResult);
                }


                $result['opcoes'] = $opcoes;
                $result['adicionais'] = $adicionaisResponse;
                $result['opcionais'] = $opcionaisResponse;

                array_push($response, $result);
            }

            return $response;
        } else {
            return [];
        }
    }

    public function actionOpcionalbyproduto()
    {
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

    public function actionAdicionalbyproduto()
    {
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

    public function actionSalvarpedido()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $req = Yii::$app->request;

        if ($req->isPost) {
            $pedido = $req->post('pedido');
            $consumo_list = $req->post('items');

            if ($consumo_list == null || count($consumo_list) <= 0) {
                return [];
            }

            $model_pedido = new \app\models\Pedido();
            $model_pedido->attributes = $pedido;
            $model_pedido->STATUS = "GRAVANDO";
            $model_pedido->save();

            foreach ($consumo_list as $consumo) {
                $consumo_model = \app\models\Consumodelivery::findOne(['DISPOSITIVO' => $consumo['DISPOSITIVO']]);
                if ($consumo_model == null) {
                    $consumo_model = new \app\models\ConsumoDelivery();
                    $consumo_model->attributes = $consumo;
                    $consumo_model["COD_PEDIDO"] = $model_pedido["ID"];

                    if (!$consumo_model->save()) {
                        return ['message' => $consumo_model->errors];
                    }

                    // inserir adicionais  
                    if (isset($consumo['LISTA_ADICIONAIS'])) {
                        $adicionais = $consumo['LISTA_ADICIONAIS'];
                        foreach ($adicionais as $ad) {
                            $adicional = new \app\models\Itemadicionaldelivery();
                            $adicional->attributes = $ad;
                            $adicional->CONSUMODELIVERY = $consumo_model->CODIGO;
                            $adicional->save();
                        }
                    }

                    // inserir opcionais  
                    if (isset($consumo['LISTA_OPCIONAIS'])) {
                        $opcionais = $consumo['LISTA_OPCIONAIS'];
                        //return $opcionais;
                        foreach ($opcionais as $opc) {
                            $opcional = new \app\models\Itemopcionaldelivery();
                            $opcional->attributes = $opc;
                            $opcional->CONSUMODELIVERY = $consumo_model->CODIGO;
                            $opcional->save();
                        }
                    }

                    // inserir opcoes
                    if (isset($consumo['LISTA_OPCOES'])) {
                        $opcoes = $consumo['LISTA_OPCOES'];
                        foreach ($opcoes as $op) {
                            $opcao = new \app\models\Itemingredientedelivery();
                            $opcao->attributes = $op;
                            $opcao->CONSUMODELIVERY = $consumo_model->CODIGO;
                            $opcao->save();
                        }
                    }

                    // inserir montagem
                    if (isset($consumo['LISTA_MONTAGEM'])) {
                        $montagem = $consumo['LISTA_MONTAGEM'];
                        foreach ($montagem as $item) {
                            $montado = new \app\models\Itemmontadodelivery();
                            $montado->attributes = $item;
                            $montado->CONSUMODELIVERY = $consumo_model->CODIGO;
                            $montado->save();
                        }
                    }
                }
            }

            if ($model_pedido["COD_CUPOM"] != null) {
                $model_cupom = \app\models\Cupom::findOne(['codigo' => $model_pedido["COD_CUPOM"]]);
                $qtde_utilizado = $model_cupom['quantidade_usada'];
                $model_cupom->quantidade_usada = $qtde_utilizado + 1;

                $model_cupom->save();
            }

            $model_pedido->STATUS = "PENDENTE";
            $model_pedido->update();

            return ['message' => 'sucesso', 'numPedido' => $model_pedido['ID']];
        } else {
            return [];
        }
    }
}
