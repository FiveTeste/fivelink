<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "subgrupo".
 *
 * @property string $CODIGO
 * @property string $CODGRUPO
 * @property string $SUBGRUPO
 * @property int|null $QTDE_MAX_KYOSK
 * @property string|null $NAO_MOSTRA_KYOSK
 *
 * @property Produto[] $produtos
 */
class Subgrupo extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'subgrupo';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['CODIGO', 'CODGRUPO', 'SUBGRUPO'], 'required'],
            [['QTDE_MAX_KYOSK'], 'integer'],
            [['CODIGO', 'CODGRUPO'], 'string', 'max' => 6],
            [['SUBGRUPO'], 'string', 'max' => 50],
            [['NAO_MOSTRA_KYOSK'], 'string', 'max' => 2],
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
            'CODGRUPO' => 'Codgrupo',
            'SUBGRUPO' => 'Subgrupo',
            'QTDE_MAX_KYOSK' => 'Qtde Max Kyosk',
            'NAO_MOSTRA_KYOSK' => 'Nao Mostra Kyosk',
        ];
    }

    /**
     * Gets query for [[Produtos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getProdutos()
    {
        return $this->hasMany(Produto::className(), ['CODSUBGRUPO' => 'CODIGO']);
    }
}
