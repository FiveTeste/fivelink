<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "cliente".
 *
 * @property int $id
 * @property string $nome
 * @property string $telefone
 * @property int|null $bairro_id
 * @property string|null $endereco
 * @property string|null $numero
 * @property string|null $complemento
 *
 * @property Bairros $bairro
 * @property Pedido[] $pedidos
 */
class Cliente extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'cliente';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['nome', 'telefone'], 'required'],
            [['bairro_id'], 'integer'],
            [['nome', 'telefone', 'endereco', 'numero', 'complemento'], 'string', 'max' => 100],
            [['bairro_id'], 'exist', 'skipOnError' => true, 'targetClass' => Bairros::className(), 'targetAttribute' => ['bairro_id' => 'id_bairro']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'nome' => 'Nome',
            'telefone' => 'Telefone',
            'bairro_id' => 'Bairro ID',
            'endereco' => 'Endereco',
            'numero' => 'Numero',
            'complemento' => 'Complemento',
        ];
    }

    /**
     * Gets query for [[Bairro]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getBairro()
    {
        return $this->hasOne(Bairros::className(), ['id_bairro' => 'bairro_id']);
    }

    /**
     * Gets query for [[Pedidos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getPedidos()
    {
        return $this->hasMany(Pedido::className(), ['CLIENTE_ID' => 'id']);
    }
}
