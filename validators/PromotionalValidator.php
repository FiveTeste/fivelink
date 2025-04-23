<?php

namespace app\validators;

use DateTime;
use Yii;

use Exception;

class PromotionalValidator {
  
  private $product;

  public function __construct($product) {
    $this->product = $product;
  }

  private function getDateInstance(string $dateStr) {
    $dateArray = explode("/", $dateStr);
    $year = $dateArray[0];
    $month = $dateArray[1];
    $day = $dateArray[2];

    $ISOdateStr = "$year-$month-$day";

    return new DateTime($ISOdateStr);
  }

  public function isPromotionalDay() {
    try {
      $currentDate = time();
      
      $weekDays = json_decode($this->product['PROMO_DIAS_SEMANA']);
      if (is_array($weekDays) && sizeof($weekDays) > 0) {
        //return in_array(date("w"), $weekDays);
		return in_array(intval(date("w")) + 1, $weekDays);
      }
      
      if ($this->product['DT_INICIO_PROMOCAO'] == null) return false;
      if ($this->product['DT_FIM_PROMOCAO'] == null) return false;
      
      $startDate = $this->getDateInstance($this->product['DT_INICIO_PROMOCAO']);
      $startDate->setTime(0, 0, 0);
      
      $endDate = $this->getDateInstance($this->product['DT_FIM_PROMOCAO']);
      $endDate->setTime(23, 59, 59);
      
      $afterStart = $startDate->getTimestamp() <= $currentDate;
      $beforeEnd = $endDate->getTimestamp() >= $currentDate;
      
      return $afterStart && $beforeEnd;
    } catch (Exception $e) {
      return false;
    }
  }

  public function isPromotionalTime() {
    try {

      if ($this->product['HORA_INICIO_PROMOCAO'] == null) return false;
      if ($this->product['HORA_FIM_PROMOCAO'] == null) return false;
      
      $currentDate = time();
      
      $timeStartArr = explode(":", $this->product['HORA_INICIO_PROMOCAO']);
      $timeEndArr = explode(":", $this->product['HORA_FIM_PROMOCAO']);
      
      $timeStart = new DateTime();
      $timeStart->setTime($timeStartArr[0], $timeStartArr[1], $timeStartArr[2]);
      
      $timeEnd = new DateTime();
      $timeEnd->setTime($timeEndArr[0], $timeEndArr[1], $timeEndArr[2]);
      
      $afterStart = $timeStart->getTimestamp() <= $currentDate;
      $beforeEnd = $timeEnd->getTimestamp() >= $currentDate;
      
      return $afterStart && $beforeEnd;
    } catch (Exception $e) {
      return false;
    }
  }

  public function isPromotional() {
    try {
      if ($this->product['PROMO_DELIVERY'] == null || $this->product['PROMO_DELIVERY'] == 0) {
          return false;
      }
    } catch (Exception $e) {}

    //if (!$this->isPromotionalDay()) return false;

    //return $this->isPromotionalTime();
	  if ($this->isPromotionalDay()) {
            if ($this->product['HORARIO_PROMOCAO'] == 1) {
                return $this->isPromotionalTime();
            }else{
                return true;
            }
        } else {
            return false;
        }
  }
}