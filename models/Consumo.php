<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "consumo".
 *
 * @property int $CODIGO
 * @property int $COD_MESA
 * @property string|null $COD_USUARIO
 * @property string|null $COD_PRODUTO
 * @property string|null $PRODUTO
 * @property float|null $QTDE
 * @property float|null $UNITARIO
 * @property float|null $TOTAL
 * @property int|null $TRANSF_MESA
 * @property int|null $CANCELADO
 * @property string|null $HORA
 * @property string|null $COMPLEMENTO
 * @property string|null $COMPLEMENTO2
 * @property int|null $IMPRESSO
 * @property string|null $COD_AGRUP
 * @property string|null $CODSUBGRUPO
 * @property string|null $ADICIONAL
 * @property string|null $ADC_CODITEM
 * @property string|null $COD_TEMP
 * @property int|null $NAOSINCRONIZADO
 * @property string|null $DATA
 * @property string|null $DISPOSITIVO
 * @property string|null $PAGO
 *
 * @property Mesa $cODMESA
 * @property Produto $cODPRODUTO
 * @property ItemAdicional[] $itemAdicionals
 * @property ItemIngrediente[] $itemIngredientes
 * @property ItemMontado[] $itemMontados
 * @property ItemOpcional[] $itemOpcionals
 */
class Consumo extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'consumo';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['COD_MESA'], 'required'],
            [['COD_MESA', 'TRANSF_MESA', 'CANCELADO', 'IMPRESSO', 'NAOSINCRONIZADO'], 'integer'],
            [['QTDE', 'UNITARIO', 'TOTAL'], 'number'],
            [['COD_USUARIO', 'COD_PRODUTO', 'CODSUBGRUPO'], 'string', 'max' => 6],
            [['PRODUTO', 'COMPLEMENTO'], 'string', 'max' => 100],
            [['HORA', 'COD_AGRUP', 'ADC_CODITEM'], 'string', 'max' => 10],
            [['COMPLEMENTO2'], 'string', 'max' => 200],
            [['ADICIONAL'], 'string', 'max' => 2],
            [['COD_TEMP', 'DATA'], 'string', 'max' => 45],
            [['DISPOSITIVO'], 'string', 'max' => 60],
            [['PAGO'], 'string', 'max' => 5],
            [['COD_MESA'], 'exist', 'skipOnError' => true, 'targetClass' => Mesa::className(), 'targetAttribute' => ['COD_MESA' => 'COD_MESA']],
            [['COD_PRODUTO'], 'exist', 'skipOnError' => true, 'targetClass' => Produto::className(), 'targetAttribute' => ['COD_PRODUTO' => 'CODIGO']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'CODIGO' => 'Codigo',
            'COD_MESA' => 'Cod  Mesa',
            'COD_USUARIO' => 'Cod  Usuario',
            'COD_PRODUTO' => 'Cod  Produto',
            'PRODUTO' => 'Produto',
            'QTDE' => 'Qtde',
            'UNITARIO' => 'Unitario',
            'TOTAL' => 'Total',
            'TRANSF_MESA' => 'Transf  Mesa',
            'CANCELADO' => 'Cancelado',
            'HORA' => 'Hora',
            'COMPLEMENTO' => 'Complemento',
            'COMPLEMENTO2' => 'Complemento2',
            'IMPRESSO' => 'Impresso',
            'COD_AGRUP' => 'Cod  Agrup',
            'CODSUBGRUPO' => 'Codsubgrupo',
            'ADICIONAL' => 'Adicional',
            'ADC_CODITEM' => 'Adc  Coditem',
            'COD_TEMP' => 'Cod  Temp',
            'NAOSINCRONIZADO' => 'Naosincronizado',
            'DATA' => 'Data',
            'DISPOSITIVO' => 'Dispositivo',
            'PAGO' => 'Pago',
        ];
    }

    /**
     * Gets query for [[CODMESA]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCODMESA()
    {
        return $this->hasOne(Mesa::className(), ['COD_MESA' => 'COD_MESA']);
    }

    /**
     * Gets query for [[CODPRODUTO]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCODPRODUTO()
    {
        return $this->hasOne(Produto::className(), ['CODIGO' => 'COD_PRODUTO']);
    }

    /**
     * Gets query for [[ItemAdicionals]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getItemAdicionals()
    {
        return $this->hasMany(ItemAdicional::className(), ['CONSUMO' => 'CODIGO']);
    }

    /**
     * Gets query for [[ItemIngredientes]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getItemIngredientes()
    {
        return $this->hasMany(ItemIngrediente::className(), ['CONSUMO' => 'CODIGO']);
    }

    /**
     * Gets query for [[ItemMontados]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getItemMontados()
    {
        return $this->hasMany(ItemMontado::className(), ['CONSUMO' => 'CODIGO']);
    }

    /**
     * Gets query for [[ItemOpcionals]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getItemOpcionals()
    {
        return $this->hasMany(ItemOpcional::className(), ['CONSUMO' => 'CODIGO']);
    }
}
