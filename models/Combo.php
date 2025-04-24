<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "combo".
 *
 * @property int $ID
 * @property string|null $DESCRICAO
 * @property int|null $QTDE_MAX
 * @property int|null $ORDEM
 * @property string|null $CODPRODUTO
 * @property int|null $OBRIGATORIO
 * @property float|null $VALOR_BASE
 */
class Combo extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'combo';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['ID'], 'required'],
            [['ID', 'QTDE_MAX', 'ORDEM', 'OBRIGATORIO'], 'integer'],
            [['VALOR_BASE'], 'number'],
            [['DESCRICAO'], 'string', 'max' => 100],
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
            'DESCRICAO' => 'Descricao',
            'QTDE_MAX' => 'Qtde  Max',
            'ORDEM' => 'Ordem',
            'CODPRODUTO' => 'Codproduto',
            'OBRIGATORIO' => 'Obrigatorio',
            'VALOR_BASE' => 'Valor  Base',
        ];
    }
    
    public function fields() {
        return [
            // field name is the same as the attribute name
            'ID' ,
            'DESCRICAO',
            'QTDE_MAX',
            'ORDEM' ,
            'CODPRODUTO',
            'OBRIGATORIO' ,
            'VALOR_BASE' ,
            'PRODUTOS_COMBO' => function () {
                return $this->getComboProdutos();
            },
        ];
    }
    
     /**
     * Gets query for combo_produto
     *
     * @return \yii\db\ActiveQuery
     */
    public function getComboProdutos() {
        return ComboProdutos::find()->where(['COMBO_ID' => $this->ID])->all();
    }
}
