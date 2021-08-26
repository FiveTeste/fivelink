<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "grupo".
 *
 * @property string $CODIGO
 * @property string $GRUPO
 * @property string $NAO_MOSTRA_KYOSK
 * @property string $subgrupos
 *
 * @property Produto[] $produtos
 */
class Grupo extends \yii\db\ActiveRecord
{
    public $subgrupos;
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'grupo';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['CODIGO', 'GRUPO', 'NAO_MOSTRA_KYOSK'], 'required'],
            [['CODIGO'], 'string', 'max' => 6],
            [['GRUPO'], 'string', 'max' => 60],
            [['NAO_MOSTRA_KYOSK'], 'string', 'max' => 2],
            [['subgrupos'], 'string'],
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
            'GRUPO' => 'Grupo',
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
        return $this->hasMany(Produto::className(), ['CODGRUPO' => 'CODIGO']);
    }
}
