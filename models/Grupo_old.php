<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "grupo".
 *
 * @property string $CODIGO
 * @property string $GRUPO
 * @property string|null $NAO_MOSTRA_KYOSK
 * @property string|null $FOTO
 * @property int $APP_CARDAPIO
 * @property int $APP_DELIVERY
 *
 * @property Produto[] $produtos
 */
class Grupo extends \yii\db\ActiveRecord
{
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
            [['CODIGO', 'GRUPO', 'APP_CARDAPIO', 'APP_DELIVERY'], 'required'],
            [['FOTO'], 'string'],
            [['APP_CARDAPIO', 'APP_DELIVERY'], 'integer'],
            [['CODIGO'], 'string', 'max' => 6],
            [['GRUPO'], 'string', 'max' => 60],
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
            'GRUPO' => 'Grupo',
            'NAO_MOSTRA_KYOSK' => 'Nao  Mostra  Kyosk',
            'FOTO' => 'Foto',
            'APP_CARDAPIO' => 'App  Cardapio',
            'APP_DELIVERY' => 'App  Delivery',
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
