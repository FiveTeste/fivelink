<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "item_adicional".
 *
 * @property int $ID
 * @property string $CODADICIONAL
 * @property double $QTDE
 * @property double $PRECO
 * @property string $CODITEM
 * @property int $CONSUMO
 *
 * @property Consumo $cONSUMO
 */
class Itemadicional extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'item_adicional';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['QTDE', 'PRECO'], 'number'],
            [['CONSUMO'], 'integer'],
            [['CODADICIONAL', 'CODITEM'], 'string', 'max' => 6],
            [['CONSUMO'], 'exist', 'skipOnError' => true, 'targetClass' => Consumo::className(), 'targetAttribute' => ['CONSUMO' => 'CODIGO']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'ID' => 'ID',
            'CODADICIONAL' => 'Codadicional',
            'QTDE' => 'Qtde',
            'PRECO' => 'Preco',
            'CODITEM' => 'Coditem',
            'CONSUMO' => 'Consumo',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCONSUMO()
    {
        return $this->hasOne(Consumo::className(), ['CODIGO' => 'CONSUMO']);
    }
}
