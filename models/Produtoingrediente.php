<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "produto_ingrediente".
 *
 * @property string $CODIGO
 * @property string $CODPRODUTO
 * @property string $CODINGREDIENTE
 *
 * @property Ingrediente $cODINGREDIENTE
 * @property Produto $cODPRODUTO
 */
class Produtoingrediente extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'produto_ingrediente';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['CODIGO', 'CODPRODUTO'], 'required'],
            [['CODIGO', 'CODPRODUTO', 'CODINGREDIENTE'], 'string', 'max' => 6],
            [['CODIGO'], 'unique'],
            [['CODINGREDIENTE'], 'exist', 'skipOnError' => true, 'targetClass' => Ingrediente::className(), 'targetAttribute' => ['CODINGREDIENTE' => 'CODIGO']],
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
            'CODINGREDIENTE' => 'Codingrediente',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCODINGREDIENTE()
    {
        return $this->hasOne(Ingrediente::className(), ['CODIGO' => 'CODINGREDIENTE']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCODPRODUTO()
    {
        return $this->hasOne(Produto::className(), ['CODIGO' => 'CODPRODUTO']);
    }
}
