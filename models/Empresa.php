<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "empresa".
 *
 * @property string $CODIGO
 * @property string|null $FILIAL
 * @property string|null $FANTASIA
 * @property string|null $ENDERECO
 * @property string|null $NUMERO
 * @property string|null $BAIRRO
 * @property string|null $CIDADE
 * @property string|null $UF
 * @property string|null $CEP
 * @property string|null $CNPJ
 * @property float|null $valor_entrega_gratis
 * @property int|null $cidade_id
 * @property int $aceitando_pedidos
 * @property string|null $telefone
 *
 * @property Mesa[] $mesas
 */
class Empresa extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'empresa';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['CODIGO'], 'required'],
            [['valor_entrega_gratis'], 'number'],
            [['cidade_id', 'aceitando_pedidos'], 'integer'],
            [['CODIGO'], 'string', 'max' => 6],
            [['FILIAL', 'telefone'], 'string', 'max' => 100],
            [['FANTASIA'], 'string', 'max' => 60],
            [['ENDERECO', 'CIDADE'], 'string', 'max' => 50],
            [['NUMERO'], 'string', 'max' => 10],
            [['BAIRRO', 'CEP', 'CNPJ'], 'string', 'max' => 45],
            [['UF'], 'string', 'max' => 3],
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
            'FILIAL' => 'Filial',
            'FANTASIA' => 'Fantasia',
            'ENDERECO' => 'Endereco',
            'NUMERO' => 'Numero',
            'BAIRRO' => 'Bairro',
            'CIDADE' => 'Cidade',
            'UF' => 'Uf',
            'CEP' => 'Cep',
            'CNPJ' => 'Cnpj',
            'valor_entrega_gratis' => 'Valor Entrega Gratis',
            'cidade_id' => 'Cidade ID',
            'aceitando_pedidos' => 'Aceitando Pedidos',
            'whatsapp' => 'Whatsapp',
        ];
    }

    /**
     * Gets query for [[Mesas]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getMesas()
    {
        return $this->hasMany(Mesa::className(), ['EMPRESA' => 'CODIGO']);
    }
}
