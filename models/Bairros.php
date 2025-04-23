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
 * @property string $codtaxa_entrega
 *
 * @property Cliente[] $clientes
 */
class Bairros extends \yii\db\ActiveRecord {

    /**
     * {@inheritdoc}
     */
    public static function tableName() {
        return 'bairros';
    }

    /**
     * {@inheritdoc}
     */
    public function rules() {
        return [
            [['cidade_id', 'nome', 'tx_entrega'], 'required'],
            [['cidade_id', 'permite_entrega_gratis'], 'integer'],
            [['tx_entrega'], 'number'],
            [['codtaxa_entrega'], 'string', 'max' => 6],
            [['nome'], 'string', 'max' => 50],
        ];
    }

    public function fields() {
        return [
            'id_bairro',
            'cidade_id',
            'nome',
            //'tx_entrega',
            'permite_entrega_gratis',
            'codtaxa_entrega',
            'tx_entrega' => function ($model) {
                return $this->getTaxaentrega($this->codtaxa_entrega);
            }
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels() {
        return [
            'id_bairro' => 'Id Bairro',
            'cidade_id' => 'Cidade ID',
            'nome' => 'Nome',
            'tx_entrega' => 'Tx Entrega',
            'permite_entrega_gratis' => 'Permite Entrega Gratis',
            'codtaxa_entrega' => 'Código da taxa de entrega',
        ];
    }

    /**
     * Gets query for [[Clientes]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getClientes() {
        return $this->hasMany(Cliente::className(), ['bairro_id' => 'id_bairro']);
    }
    
    public function getTaxaentrega($codtaxa){ 
        return Taxaentrega::findOne(['CODIGO'=>$codtaxa])->VALOR;
    }

}
