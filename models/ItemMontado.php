<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "item_montado".
 *
 * @property int $ID
 * @property string $PRODUTO
 * @property double $PRECO
 * @property int $CONSUMO
 *
 * @property Consumo $CONSUMO
 *  * @property Consumo $CONSUMO
 */
class ItemMontado extends \yii\db\ActiveRecord
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
            [['CODPRODUTO'], 'integer'],
            [['CONSUMO'], 'integer'],
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
            'PRECO' => 'Preco',
            'CODPRODUTO' => 'Produto',
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

        /**
     * @return \yii\db\ActiveQuery
     */
    public function getCODPRODUTO()
    {
        return $this->hasOne(Produto::className(), ['CODIGO' => 'CODPRODUTO']);
    }
}
