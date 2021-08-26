<?php

namespace app\modules\api\controllers;

use Yii;
use yii\web\Controller;
use app\models\User;
use yii\web\Response;
use yii\filters\AccessControl;
use PDO;

/**
 * Default controller for the `api` module
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Authorization");
//header("Accept:application/json");
header("Content-type: application/json; charset=utf-8");

class SincController extends Controller {

    /**
     * Renders the index view for the module
     * @return string
     */
    public function actionIndex() {

        return $this->render('index');
    }




}
