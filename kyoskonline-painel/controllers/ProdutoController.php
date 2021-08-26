<?php

namespace app\controllers;

use Yii;
use app\models\Produto;
use app\models\ProdutoSearch;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

/**
 * ProdutoController implements the CRUD actions for Produto model.
 */
class ProdutoController extends Controller {

    /**
     * {@inheritdoc}
     */
    public function behaviors() {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'delete' => ['POST'],
                ],
            ],
        ];
    }

    /**
     * Lists all Produto models.
     * @return mixed
     */
    public function actionIndex() {
        $searchModel = new ProdutoSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

        return $this->render('index', [
                    'searchModel' => $searchModel,
                    'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single Produto model.
     * @param string $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionView($id) {
        return $this->render('view', [
                    'model' => $this->findModel($id),
        ]);
    }

    /**
     * Creates a new Produto model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate() {
        $model = new Produto();

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->CODIGO]);
        }

        return $this->render('create', [
                    'model' => $model,
        ]);
    }

    /**
     * Updates an existing Produto model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param string $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate($id) {
        $model = $this->findModel($id);

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->CODIGO]);
        }

        return $this->render('update', [
                    'model' => $model,
        ]);
    }

    public function actionFoto() {
        $re = Yii::$app->request;
        if ($re->isAjax) {
            $fileName = $_FILES['file']['name'];
            $fileType = $_FILES['file']['type'];
            $fileError = $_FILES['file']['error'];
            $fileTemp = $_FILES['file']['tmp_name'];
            $baseurl = $re->post('basefoto');
            $fileContent = file_get_contents($_FILES['file']['tmp_name']);
            
            //return $baseurl;
            $base2 = "";
            if ($fileError == UPLOAD_ERR_OK) {
                $base = explode('\\', $baseurl);
                for ($i = 0; $i < count($base) - 1; $i++) {
                    $base2 .= $base[$i].'\\';
                }


                $path = substr($base2, 0, strlen($base2)-1) .'/web/images/produtos';
                //return $path ;
                $uploaded = move_uploaded_file($fileTemp, $path.'/'.$fileName);
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
     * Deletes an existing Produto model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param string $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionDelete($id) {
        $this->findModel($id)->delete();

        return $this->redirect(['index']);
    }

    /**
     * Finds the Produto model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param string $id
     * @return Produto the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id) {
        if (($model = Produto::findOne($id)) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }

}
