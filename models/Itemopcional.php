<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "item_opcional".
 *
 * @property int $ID
 * @property string $CODOPCIONAL
 * @property string $CODITEM
 * @property int $CONSUMO
 *
 * @property Consumo $cONSUMO
 */
class Itemopcional extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'item_opcional';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['CONSUMO'], 'integer'],
            [['CODOPCIONAL', 'CODITEM'], 'string', 'max' => 6],
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
            'CODOPCIONAL' => 'Codopcional',
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
