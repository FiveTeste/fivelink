<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "combo_produtos".
 *
 * @property int $ID
 * @property int|null $COMBO_ID
 * @property string|null $CODPRODUTO
 * @property float|null $VALOR
 * @property float|null $QTDE
 */
class Comboprodutos extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'combo_produtos';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['ID'], 'required'],
            [['ID', 'COMBO_ID'], 'integer'],
            [['VALOR', 'QTDE'], 'number'],
            [['CODPRODUTO'], 'string', 'max' => 6],
            [['ID'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'ID' => 'ID',
            'COMBO_ID' => 'Combo  ID',
            'CODPRODUTO' => 'Codproduto',
            'VALOR' => 'Valor',
            'QTDE' => 'Qtde',
        ];
    }

    public function fields() {
        return [
            // field name is the same as the attribute name
            'ID',
            'COMBO_ID',
            'CODPRODUTO',
            'VALOR',
            'QTDE' ,
            'PRODUTO' => function () {
                return $this->getNomeProduto();
            },
            'FOTO' => function () {
                return $this->getFotoProduto();
            },
        ];
    }

    
    public function getNomeProduto() {
        $query = new \yii\db\Query();
        $query->select('PRODUTO')->from('produto')->where(['CODIGO'=> $this->CODPRODUTO]);
        $comand = $query->createCommand();
        $nome = $comand->query()->readColumn(0);;
        
        return $nome;
    }
    
    public function getFotoProduto() {
        $query = new \yii\db\Query();
        $query->select('FOTO')->from('produto')->where(['CODIGO'=> $this->CODPRODUTO]);
        $comand = $query->createCommand();
        $foto = $comand->query()->readColumn(0);;
        return $foto;
    }
}
