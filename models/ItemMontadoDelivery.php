<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "item_montado_delivery".
 *
 * @property int $ID
 * @property string|null $CODPRODUTO
 * @property float|null $PRECO
 * @property int|null $CONSUMODELIVERY
 *
 * @property ConsumoDelivery $cONSUMODELIVERY
 * @property Produto $cODPRODUTO
 */
class ItemMontadoDelivery extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'item_montado_delivery';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['PRECO'], 'number'],
            [['CONSUMODELIVERY'], 'integer'],
            [['CODPRODUTO'], 'string', 'max' => 6],
            [['CONSUMODELIVERY'], 'exist', 'skipOnError' => true, 'targetClass' => ConsumoDelivery::className(), 'targetAttribute' => ['CONSUMODELIVERY' => 'CODIGO']],
            [['CODPRODUTO'], 'exist', 'skipOnError' => true, 'targetClass' => Produto::className(), 'targetAttribute' => ['CODPRODUTO' => 'CODIGO']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'ID' => 'ID',
            'CODPRODUTO' => 'Codproduto',
            'PRECO' => 'Preco',
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

    /**
     * Gets query for [[CODPRODUTO]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCODPRODUTO()
    {
        return $this->hasOne(Produto::className(), ['CODIGO' => 'CODPRODUTO']);
    }
}
