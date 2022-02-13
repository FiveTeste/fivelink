<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "item_ingrediente".
 *
 * @property int $ID
 * @property string|null $CODIGO
 * @property int|null $CODVENDA
 * @property string|null $CODPRODUTO
 * @property string|null $CODINGREDIENTE
 * @property string|null $CODITEM
 * @property int|null $CANCELADO
 * @property string|null $PAGO
 * @property int|null $CONSUMO
 *
 * @property Consumo $cONSUMO
 */
class Itemingrediente extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'item_ingrediente';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['CODVENDA', 'CANCELADO', 'CONSUMO'], 'integer'],
            [['CODIGO'], 'string', 'max' => 45],
            [['CODPRODUTO', 'CODINGREDIENTE', 'CODITEM'], 'string', 'max' => 6],
            [['PAGO'], 'string', 'max' => 5],
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
            'CODIGO' => 'Codigo',
            'CODVENDA' => 'Codvenda',
            'CODPRODUTO' => 'Codproduto',
            'CODINGREDIENTE' => 'Codingrediente',
            'CODITEM' => 'Coditem',
            'CANCELADO' => 'Cancelado',
            'PAGO' => 'Pago',
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
