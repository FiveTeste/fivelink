<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "item_opcional_delivery".
 *
 * @property int $ID
 * @property string|null $CODOPCIONAL
 * @property string|null $CODITEM
 * @property int|null $CONSUMODELIVERY
 * @property float|null $QTDE
 *
 * @property ConsumoDelivery $cONSUMODELIVERY
 */
class Itemopcionaldelivery extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'item_opcional_delivery';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['QTDE'], 'number'],
            [['CONSUMODELIVERY'], 'integer'],
            [['CODOPCIONAL', 'CODITEM'], 'string', 'max' => 6],
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
            'CODOPCIONAL' => 'Codopcional',
            'CODITEM' => 'Coditem',
            'CONSUMODELIVERY' => 'Consumodelivery',
            'QTDE' => 'Qtde',
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
