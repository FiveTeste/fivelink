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
            [['QTDE_MAX', 'ORDEM', 'OBRIGATORIO'], 'integer'],
            [['VALOR_BASE'], 'number'],
            [['DESCRICAO'], 'string', 'max' => 100],
            [['CODPRODUTO'], 'string', 'max' => 6],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'ID' => 'ID',
            'DESCRICAO' => 'Descrição',
            'QTDE_MAX' => 'Quantidade Máxima',
            'ORDEM' => 'Ordem',
            'CODPRODUTO' => 'Código do Produto',
            'OBRIGATORIO' => 'Obrigatório',
            'VALOR_BASE' => 'Valor Base',           
        ];
    }

    /**
     * Gets related ComboProdutos.
     * @return \yii\db\ActiveQuery
     */
    public function getComboProdutos()
    {
        return $this->hasMany(ComboProdutos::class, ['combo_id' => 'ID']);
    }

    /**
     * Busca os combos e seus produtos relacionados com base no código do produto.
     *
     * @param string $codigoProduto Código do produto.
     * @return array Lista de combos e seus produtos relacionados.
     */
    public static function getCombosByCodigoProduto($codigoProduto)
    {
        $combos = self::find()->where(['CODPRODUTO' => $codigoProduto])->all();

        $result = [];
        foreach ($combos as $combo) {
            $comboProdutos = ComboProdutos::find()->where(['COMBO_ID' => $combo->ID])->all();
            $result[] = [
                'combo' => $combo,
                'produtos' => $comboProdutos
            ];
        }

        return $result;
    }
}