<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "cupom".
 *
 * @property int $codigo
 * @property string $cupom
 * @property int|null $quantidade_disponivel
 * @property int|null $quantidade_usada
 * @property float $valor
 * @property int $porcentagem
 * @property string $datahora_inicial
 * @property string $datahora_final
 * @property float $valor_minimo
 */
class Cupom extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'cupom';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['cupom', 'valor', 'porcentagem', 'datahora_inicial', 'datahora_final', 'valor_minimo'], 'required'],
            [['quantidade_disponivel', 'quantidade_usada', 'porcentagem'], 'integer'],
            [['valor', 'valor_minimo'], 'number'],
            [['datahora_inicial', 'datahora_final'], 'safe'],
            [['cupom'], 'string', 'max' => 50],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'codigo' => 'Codigo',
            'cupom' => 'Cupom',
            'quantidade_disponivel' => 'Quantidade Disponivel',
            'quantidade_usada' => 'Quantidade Usada',
            'valor' => 'Valor',
            'porcentagem' => 'Porcentagem',
            'datahora_inicial' => 'Datahora Inicial',
            'datahora_final' => 'Datahora Final',
            'valor_minimo' => 'Valor Minimo',
        ];
    }
}
