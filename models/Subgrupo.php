<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "subgrupo".
 *
 * @property string $CODIGO
 * @property string $CODGRUPO
 * @property string $SUBGRUPO
 * @property int $QTDE_MAX_KYOSK
 * @property string $NAO_MOSTRA_KYOSK
 * @property string $DESTAQUE
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
            [['SUBGRUPO', 'TITULO_SELETOR'], 'string', 'max' => 50],
            [['NAO_MOSTRA_KYOSK', 'DESTAQUE'], 'string', 'max' => 2],
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
            'TITULO_SELETOR' => 'Titulo do Seletor',
            'QTDE_MAX_KYOSK' => 'Qtde Max Kyosk',
            'NAO_MOSTRA_KYOSK' => 'Nao Mostra Kyosk',
            'DESTAQUE' => 'Destaque'
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getProdutos()
    {
        return $this->hasMany(Produto::className(), ['CODSUBGRUPO' => 'CODIGO']);
    }
}
