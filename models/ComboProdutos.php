<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "combo_produtos".
 *
 * @property int $ID
 * @property int|null $COMBO_ID
 * @property string|null $CODPRODUTO
 * @property float|null $VALOR
 * @property float|null $QTDE
 */
class ComboProdutos extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'combo_produtos';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['COMBO_ID'], 'integer'],
            [['VALOR', 'QTDE'], 'number'],
            [['CODPRODUTO'], 'string', 'max' => 6],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'ID' => 'ID',
            'COMBO_ID' => 'ID do Combo',
            'CODPRODUTO' => 'Código do Produto',
            'VALOR' => 'Valor',
            'QTDE' => 'Quantidade',
        ];
    }

    /**
     * Gets query for the related Combo.
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCombo()
    {
        return $this->hasOne(Combo::className(), ['ID' => 'COMBO_ID']);
    }

    /**
     * Gets query for the related Produto.
     *
     * @return \yii\db\ActiveQuery
     */
    public function getProduto()
    {
        return $this->hasOne(Produto::className(), ['CODIGO' => 'CODPRODUTO']);
    }
}