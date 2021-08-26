<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "empresa".
 *
 * @property string $CODIGO
 * @property string $FILIAL
 * @property string $FANTASIA
 * @property string $ENDERECO
 * @property string $NUMERO
 * @property string $BAIRRO
 * @property string $CIDADE
 * @property string $UF
 * @property string $CEP
 * @property string $CNPJ
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
            [['CODIGO'], 'string', 'max' => 6],
            [['FILIAL'], 'string', 'max' => 100],
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
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getMesas()
    {
        return $this->hasMany(Mesa::className(), ['EMPRESA' => 'CODIGO']);
    }
}
