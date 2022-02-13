<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "bairros".
 *
 * @property int $id_bairro
 * @property int $cidade_id
 * @property string $nome
 * @property float $tx_entrega
 * @property int $permite_entrega_gratis
 *
 * @property Cliente[] $clientes
 */
class Bairros extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'bairros';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['cidade_id', 'nome', 'tx_entrega'], 'required'],
            [['cidade_id', 'permite_entrega_gratis'], 'integer'],
            [['tx_entrega'], 'number'],
            [['nome'], 'string', 'max' => 50],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_bairro' => 'Id Bairro',
            'cidade_id' => 'Cidade ID',
            'nome' => 'Nome',
            'tx_entrega' => 'Tx Entrega',
            'permite_entrega_gratis' => 'Permite Entrega Gratis',
        ];
    }

    /**
     * Gets query for [[Clientes]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getClientes()
    {
        return $this->hasMany(Cliente::className(), ['bairro_id' => 'id_bairro']);
    }
}
