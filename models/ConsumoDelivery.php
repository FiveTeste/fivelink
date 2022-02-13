<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "consumo_delivery".
 *
 * @property int $CODIGO
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
 * @property int $COD_PEDIDO
 *
 * @property Pedido $cODPEDIDO
 * @property Produto $cODPRODUTO
 * @property ItemAdicionalDelivery[] $itemAdicionalDeliveries
 * @property ItemIngredienteDelivery[] $itemIngredienteDeliveries
 * @property ItemMontadoDelivery[] $itemMontadoDeliveries
 * @property ItemOpcionalDelivery[] $itemOpcionalDeliveries
 */
class ConsumoDelivery extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'consumo_delivery';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['QTDE', 'UNITARIO', 'TOTAL'], 'number'],
            [['TRANSF_MESA', 'CANCELADO', 'IMPRESSO', 'NAOSINCRONIZADO', 'COD_PEDIDO'], 'integer'],
            [['COD_PEDIDO'], 'required'],
            [['COD_USUARIO', 'COD_PRODUTO', 'CODSUBGRUPO'], 'string', 'max' => 6],
            [['PRODUTO', 'COMPLEMENTO'], 'string', 'max' => 100],
            [['HORA', 'COD_AGRUP', 'ADC_CODITEM'], 'string', 'max' => 10],
            [['COMPLEMENTO2'], 'string', 'max' => 200],
            [['ADICIONAL'], 'string', 'max' => 2],
            [['COD_TEMP', 'DATA'], 'string', 'max' => 45],
            [['DISPOSITIVO'], 'string', 'max' => 60],
            [['PAGO'], 'string', 'max' => 5],
            [['COD_PEDIDO'], 'exist', 'skipOnError' => true, 'targetClass' => Pedido::className(), 'targetAttribute' => ['COD_PEDIDO' => 'ID']],
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
            'COD_PEDIDO' => 'Cod  Pedido',
        ];
    }

    /**
     * Gets query for [[CODPEDIDO]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCODPEDIDO()
    {
        return $this->hasOne(Pedido::className(), ['ID' => 'COD_PEDIDO']);
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
     * Gets query for [[ItemAdicionalDeliveries]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getItemAdicionalDeliveries()
    {
        return $this->hasMany(ItemAdicionalDelivery::className(), ['CONSUMODELIVERY' => 'CODIGO']);
    }

    /**
     * Gets query for [[ItemIngredienteDeliveries]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getItemIngredienteDeliveries()
    {
        return $this->hasMany(ItemIngredienteDelivery::className(), ['CONSUMODELIVERY' => 'CODIGO']);
    }

    /**
     * Gets query for [[ItemMontadoDeliveries]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getItemMontadoDeliveries()
    {
        return $this->hasMany(ItemMontadoDelivery::className(), ['CONSUMODELIVERY' => 'CODIGO']);
    }

    /**
     * Gets query for [[ItemOpcionalDeliveries]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getItemOpcionalDeliveries()
    {
        return $this->hasMany(ItemOpcionalDelivery::className(), ['CONSUMODELIVERY' => 'CODIGO']);
    }
}
