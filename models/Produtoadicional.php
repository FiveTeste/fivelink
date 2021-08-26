<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "produto_adicional".
 *
 * @property string $CODIGO
 * @property string $CODPRODUTO
 * @property string $PROD_ADICIONAL
 *
 * @property Produto $cODPRODUTO
 */
class Produtoadicional extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'produto_adicional';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['CODIGO', 'CODPRODUTO', 'PROD_ADICIONAL'], 'required'],
            [['CODIGO', 'CODPRODUTO', 'PROD_ADICIONAL'], 'string', 'max' => 6],
            [['CODIGO'], 'unique'],
            [['CODPRODUTO'], 'exist', 'skipOnError' => true, 'targetClass' => Produto::className(), 'targetAttribute' => ['CODPRODUTO' => 'CODIGO']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'CODIGO' => 'Codigo',
            'CODPRODUTO' => 'Codproduto',
            'PROD_ADICIONAL' => 'Prod Adicional',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCODPRODUTO()
    {
        return $this->hasOne(Produto::className(), ['CODIGO' => 'CODPRODUTO']);
    }
}
