<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "taxa_entrega".
 *
 * @property string $CODIGO
 * @property string $SERVICO
 * @property float $VALOR
 * @property int $ATIVO
 */
class Taxaentrega extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'taxa_entrega';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['CODIGO', 'SERVICO', 'VALOR', 'ATIVO'], 'required'],
            [['VALOR'], 'number'],
            [['ATIVO'], 'integer'],
            [['CODIGO'], 'string', 'max' => 6],
            [['SERVICO'], 'string', 'max' => 50],
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
            'SERVICO' => 'Servico',
            'VALOR' => 'Valor',
            'ATIVO' => 'Ativo',
        ];
    }
}
