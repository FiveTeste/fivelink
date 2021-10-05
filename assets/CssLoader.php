<?php

namespace app\assets;

class CssLoader {
  static function loadCss($path) {
    $result  = file_get_contents("../web/css/$path");

    return "<style>$result</style>";
  }
}