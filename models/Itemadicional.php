<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "item_adicional".
 *
 * @property int $ID
 * @property string|null $CODADICIONAL
 * @property float|null $QTDE
 * @property float|null $PRECO
 * @property string|null $CODITEM
 * @property int|null $CONSUMO
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
     * Gets query for [[CONSUMO]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCONSUMO()
    {
        return $this->hasOne(Consumo::className(), ['CODIGO' => 'CONSUMO']);
    }
}
