<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\assets;

use yii\web\AssetBundle;

/**
 * Main application asset bundle.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/bootstrap.min.css',
        'css/atlantis.min.css',
        'css/fonts.min.css',
        //'css/listview-grid.css',

        'css/meutema.min.css',
        'css/jquery.mobile-1.4.5.min.css',
        'css/jquery-confirm.css',
        'css/site.css',
        'css/jquery.mobile.icons.min.css',
        'css/meu_thema.min.css',

                      
    ];
    public $js = [            
        'js/jquery.js',
        'js/core/bootstrap.min.js',
        //'js/core/popper.min.js',
        //'js/atlantis.min.js',
        //'js/plugin/jquery-ui-1.12.1.custom/jquery-ui.min.js',
       //'js/plugin/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js',
        //'js/plugin/datatables/datatables.min.js',
        
        'js/jquery.mobile-1.4.5.min.js',
        'js/app.js',
        'js/jquery.md5.js',
        'js/jquery-confirm.js',
        'js/input-spinner.js',
        
        
        
    ];
    public $depends = [
        'yii\web\YiiAsset',
      //'yii\bootstrap\BootstrapAsset',
    ];
}
