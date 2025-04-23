<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "item_ingrediente_delivery".
 *
 * @property int $ID
 * @property string|null $CODIGO
 * @property int|null $CODVENDA
 * @property string|null $CODPRODUTO
 * @property string|null $CODINGREDIENTE
 * @property string|null $CODITEM
 * @property int|null $CANCELADO
 * @property string|null $PAGO
 * @property int|null $CONSUMODELIVERY
 *
 * @property ConsumoDelivery $cONSUMODELIVERY
 */
class Itemingredientedelivery extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'item_ingrediente_delivery';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['CODVENDA', 'CANCELADO', 'CONSUMODELIVERY'], 'integer'],
            [['CODIGO'], 'string', 'max' => 45],
            [['CODPRODUTO', 'CODINGREDIENTE', 'CODITEM'], 'string', 'max' => 6],
            [['PAGO'], 'string', 'max' => 5],
            [['CONSUMODELIVERY'], 'exist', 'skipOnError' => true, 'targetClass' => Consumodelivery::className(), 'targetAttribute' => ['CONSUMODELIVERY' => 'CODIGO']],
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
            'CONSUMODELIVERY' => 'Consumodelivery',
        ];
    }

    /**
     * Gets query for [[CONSUMODELIVERY]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCONSUMODELIVERY()
    {
        return $this->hasOne(Consumodelivery::className(), ['CODIGO' => 'CONSUMODELIVERY']);
    }
}
