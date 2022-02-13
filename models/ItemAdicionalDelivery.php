<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "item_adicional_delivery".
 *
 * @property int $ID
 * @property string|null $CODADICIONAL
 * @property float|null $QTDE
 * @property float|null $PRECO
 * @property string|null $CODITEM
 * @property int|null $CONSUMODELIVERY
 *
 * @property ConsumoDelivery $cONSUMODELIVERY
 */
class ItemAdicionalDelivery extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'item_adicional_delivery';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['QTDE', 'PRECO'], 'number'],
            [['CONSUMODELIVERY'], 'integer'],
            [['CODADICIONAL', 'CODITEM'], 'string', 'max' => 6],
            [['CONSUMODELIVERY'], 'exist', 'skipOnError' => true, 'targetClass' => ConsumoDelivery::className(), 'targetAttribute' => ['CONSUMODELIVERY' => 'CODIGO']],
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
        return $this->hasOne(ConsumoDelivery::className(), ['CODIGO' => 'CONSUMODELIVERY']);
    }
}
