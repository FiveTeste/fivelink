<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "ingrediente".
 *
 * @property string $CODIGO
 * @property string $NOME
 *
 * @property ProdutoIngrediente[] $produtoIngredientes
 */
class Ingrediente extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'ingrediente';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['CODIGO', 'NOME'], 'required'],
            [['CODIGO'], 'string', 'max' => 6],
            [['NOME'], 'string', 'max' => 50],
            [['CODIGO'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'CODIGO' => 'Codigo',
            'NOME' => 'Nome',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getProdutoIngredientes()
    {
        return $this->hasMany(ProdutoIngrediente::className(), ['CODINGREDIENTE' => 'CODIGO']);
    }
}
