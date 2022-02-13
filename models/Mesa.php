<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "mesa".
 *
 * @property int $COD_MESA
 * @property string|null $DATA
 * @property string|null $HORA
 * @property string|null $COD_FUNCIONARIO
 * @property int|null $NUM_MESA_ACOMODACAO
 * @property int|null $QUANT_DIVIDIR_CONTA
 * @property float|null $ACRESCIMO
 * @property int|null $SITUACAO
 * @property string|null $EMPRESA
 *
 * @property Consumo[] $consumos
 * @property Empresa $eMPRESA
 */
class Mesa extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'mesa';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['COD_MESA'], 'required'],
            [['COD_MESA', 'NUM_MESA_ACOMODACAO', 'QUANT_DIVIDIR_CONTA', 'SITUACAO'], 'integer'],
            [['ACRESCIMO'], 'number'],
            [['DATA', 'COD_FUNCIONARIO'], 'string', 'max' => 45],
            [['HORA'], 'string', 'max' => 10],
            [['EMPRESA'], 'string', 'max' => 6],
            [['COD_MESA'], 'unique'],
            [['EMPRESA'], 'exist', 'skipOnError' => true, 'targetClass' => Empresa::className(), 'targetAttribute' => ['EMPRESA' => 'CODIGO']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'COD_MESA' => 'Cod  Mesa',
            'DATA' => 'Data',
            'HORA' => 'Hora',
            'COD_FUNCIONARIO' => 'Cod  Funcionario',
            'NUM_MESA_ACOMODACAO' => 'Num  Mesa  Acomodacao',
            'QUANT_DIVIDIR_CONTA' => 'Quant  Dividir  Conta',
            'ACRESCIMO' => 'Acrescimo',
            'SITUACAO' => 'Situacao',
            'EMPRESA' => 'Empresa',
        ];
    }

    /**
     * Gets query for [[Consumos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getConsumos()
    {
        return $this->hasMany(Consumo::className(), ['COD_MESA' => 'COD_MESA']);
    }

    /**
     * Gets query for [[EMPRESA]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getEMPRESA()
    {
        return $this->hasOne(Empresa::className(), ['CODIGO' => 'EMPRESA']);
    }
}
