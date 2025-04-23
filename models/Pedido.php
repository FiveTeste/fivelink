<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "pedido".
 *
 * @property int $ID
 * @property int $CLIENTE_ID
 * @property float $VALOR
 * @property string $PAGAMENTO
 * @property string $ENTREGA
 * @property float|null $VALOR_TROCO
 * @property int $DESEJA_RECIBO
 * @property string|null $INFO_RECIBO
 * @property string|null $DATA
 * @property string|null $HORA
 * @property int|null $COD_CUPOM
 *
 * @property ConsumoDelivery[] $consumoDeliveries
 * @property Cliente $cLIENTE
 * @property Cupom $cODCUPOM
 * @property float|null $VALOR_ENTREGA
 * @property string|null $STATUS
 */
class Pedido extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'pedido';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['CLIENTE_ID', 'VALOR', 'PAGAMENTO', 'ENTREGA', 'DESEJA_RECIBO'], 'required'],
            [['CLIENTE_ID', 'DESEJA_RECIBO', 'COD_CUPOM'], 'integer'],
            [['VALOR', 'VALOR_TROCO','VALOR_ENTREGA'], 'number'],
            [['PAGAMENTO', 'ENTREGA', 'INFO_RECIBO', 'DATA', 'HORA','STATUS'], 'string', 'max' => 100],
            [['CLIENTE_ID'], 'exist', 'skipOnError' => true, 'targetClass' => Cliente::className(), 'targetAttribute' => ['CLIENTE_ID' => 'id']],
            [['COD_CUPOM'], 'exist', 'skipOnError' => true, 'targetClass' => Cupom::className(), 'targetAttribute' => ['COD_CUPOM' => 'codigo']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'ID' => 'ID',
            'CLIENTE_ID' => 'Cliente  ID',
            'VALOR' => 'Valor',
            'PAGAMENTO' => 'Pagamento',
            'ENTREGA' => 'Entrega',
            'VALOR_TROCO' => 'Valor  Troco',
            'DESEJA_RECIBO' => 'Deseja  Recibo',
            'INFO_RECIBO' => 'Info  Recibo',
            'DATA' => 'Data',
            'HORA' => 'Hora',
            'COD_CUPOM' => 'Cod  Cupom',
            'VALOR_ENTREGA'=> 'Valor da entrega',
            'STATUS'=> 'Status do pedido',
        ];
    }

    /**
     * Gets query for [[ConsumoDeliveries]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getConsumoDeliveries()
    {
        return $this->hasMany(ConsumoDelivery::className(), ['COD_PEDIDO' => 'ID']);
    }

    /**
     * Gets query for [[CLIENTE]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCLIENTE()
    {
        return $this->hasOne(Cliente::className(), ['id' => 'CLIENTE_ID']);
    }

    /**
     * Gets query for [[CODCUPOM]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCODCUPOM()
    {
        return $this->hasOne(Cupom::className(), ['codigo' => 'COD_CUPOM']);
    }
}
