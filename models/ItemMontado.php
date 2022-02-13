<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "item_montado".
 *
 * @property int $ID
 * @property string|null $CODPRODUTO
 * @property float|null $PRECO
 * @property int|null $CONSUMO
 *
 * @property Consumo $cONSUMO
 * @property Produto $cODPRODUTO
 */
class Itemmontado extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'item_montado';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['PRECO'], 'number'],
            [['CONSUMO'], 'integer'],
            [['CODPRODUTO'], 'string', 'max' => 6],
            [['CONSUMO'], 'exist', 'skipOnError' => true, 'targetClass' => Consumo::className(), 'targetAttribute' => ['CONSUMO' => 'CODIGO']],
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
