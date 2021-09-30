<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "comanda".
 *
 * @property int $CODIGO
 * @property int $COD_MESA
 * @property int $SITUACAO
 * @property string $DATA_CRIACAO
 * @property string|null $DATA_FECHAMENTO
 *
 * @property Mesa $cODMESA
 * @property Consumo[] $consumos
 */
class Comanda extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'comanda';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['COD_MESA'], 'required'],
            [['COD_MESA', 'SITUACAO'], 'integer'],
            [['DATA_CRIACAO', 'DATA_FECHAMENTO'], 'safe'],
            [['COD_MESA'], 'exist', 'skipOnError' => true, 'targetClass' => Mesa::className(), 'targetAttribute' => ['COD_MESA' => 'COD_MESA']],
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
            'SITUACAO' => 'Situacao',
            'DATA_CRIACAO' => 'Data  Criacao',
            'DATA_FECHAMENTO' => 'Data  Fechamento',
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
     * Gets query for [[Consumos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getConsumos()
    {
        return $this->hasMany(Consumo::className(), ['COD_COMANDA' => 'CODIGO']);
    }
}
