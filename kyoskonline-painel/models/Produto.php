<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "produto".
 *
 * @property string $CODIGO
 * @property string $PRODUTO
 * @property string|null $UNIDADE
 * @property float $PRECOVENDA
 * @property int $SITUACAO
 * @property string|null $ADICIONAL
 * @property string|null $CODGRUPO
 * @property string|null $CODSUBGRUPO
 * @property string|null $PRODUTO_MONTADO
 * @property string|null $MOSTRA_KYOSK_APP
 * @property float|null $PRECO_PROMOCAO
 * @property string|null $DT_INICIO_PROMOCAO
 * @property string|null $DT_FIM_PROMOCAO
 * @property string|null $HORA_INICIO_PROMOCAO
 * @property string|null $HORA_FIM_PROMOCAO
 * @property int|null $HORARIO_PROMOCAO
 * @property int|null $USA_BALANCA
 * @property int|null $USA_TALHERES
 * @property int|null $USA_PONTO_CARNE
 * @property int|null $USA_COPOS
 * @property string|null $ACOMPANHAMENTO
 * @property string|null $FOTO
 *
 * @property Consumo[] $consumos
 * @property Grupo $cODGRUPO
 * @property Subgrupo $cODSUBGRUPO
 * @property ProdutoAdicional[] $produtoAdicionals
 * @property ProdutoIngrediente[] $produtoIngredientes
 */
class Produto extends \yii\db\ActiveRecord
{
    /**
     * @var UploadedFile file attribute
     */
    public  $imagen;
    
    
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'produto';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['CODIGO', 'PRODUTO', 'PRECOVENDA', 'SITUACAO'], 'required'],
            [['PRECOVENDA', 'PRECO_PROMOCAO'], 'number'],
            [['SITUACAO', 'HORARIO_PROMOCAO', 'USA_BALANCA', 'USA_TALHERES', 'USA_PONTO_CARNE', 'USA_COPOS'], 'integer'],
            [['CODIGO', 'CODGRUPO', 'CODSUBGRUPO'], 'string', 'max' => 6],
            [['PRODUTO'], 'string', 'max' => 100],
            [['UNIDADE'], 'string', 'max' => 3],
            [['ADICIONAL', 'PRODUTO_MONTADO', 'MOSTRA_KYOSK_APP'], 'string', 'max' => 2],
            [['DT_INICIO_PROMOCAO', 'DT_FIM_PROMOCAO', 'HORA_INICIO_PROMOCAO', 'HORA_FIM_PROMOCAO', 'FOTO'], 'string', 'max' => 45],
            [['ACOMPANHAMENTO'], 'string', 'max' => 200],
            [['CODIGO'], 'unique'],
            [['CODGRUPO'], 'exist', 'skipOnError' => true, 'targetClass' => Grupo::className(), 'targetAttribute' => ['CODGRUPO' => 'CODIGO']],
            [['CODSUBGRUPO'], 'exist', 'skipOnError' => true, 'targetClass' => Subgrupo::className(), 'targetAttribute' => ['CODSUBGRUPO' => 'CODIGO']],
            [['imagen'],'file'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'CODIGO' => 'Codigo',
            'PRODUTO' => 'Produto',
            'UNIDADE' => 'Unidade',
            'PRECOVENDA' => 'Precovenda',
            'SITUACAO' => 'Situacao',
            'ADICIONAL' => 'Adicional',
            'CODGRUPO' => 'Codgrupo',
            'CODSUBGRUPO' => 'Codsubgrupo',
            'PRODUTO_MONTADO' => 'Produto Montado',
            'MOSTRA_KYOSK_APP' => 'Mostra Kyosk App',
            'PRECO_PROMOCAO' => 'Preco Promocao',
            'DT_INICIO_PROMOCAO' => 'Dt Inicio Promocao',
            'DT_FIM_PROMOCAO' => 'Dt Fim Promocao',
            'HORA_INICIO_PROMOCAO' => 'Hora Inicio Promocao',
            'HORA_FIM_PROMOCAO' => 'Hora Fim Promocao',
            'HORARIO_PROMOCAO' => 'Horario Promocao',
            'USA_BALANCA' => 'Usa Balanca',
            'USA_TALHERES' => 'Usa Talheres',
            'USA_PONTO_CARNE' => 'Usa Ponto Carne',
            'USA_COPOS' => 'Usa Copos',
            'ACOMPANHAMENTO' => 'Acompanhamento',
            'FOTO' => 'Foto',
        ];
    }

    /**
     * Gets query for [[Consumos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getConsumos()
    {
        return $this->hasMany(Consumo::className(), ['COD_PRODUTO' => 'CODIGO']);
    }

    /**
     * Gets query for [[CODGRUPO]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCODGRUPO()
    {
        return $this->hasOne(Grupo::className(), ['CODIGO' => 'CODGRUPO']);
    }

    /**
     * Gets query for [[CODSUBGRUPO]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCODSUBGRUPO()
    {
        return $this->hasOne(Subgrupo::className(), ['CODIGO' => 'CODSUBGRUPO']);
    }

    /**
     * Gets query for [[ProdutoAdicionals]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getProdutoAdicionals()
    {
        return $this->hasMany(ProdutoAdicional::className(), ['CODPRODUTO' => 'CODIGO']);
    }

    /**
     * Gets query for [[ProdutoIngredientes]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getProdutoIngredientes()
    {
        return $this->hasMany(ProdutoIngrediente::className(), ['CODPRODUTO' => 'CODIGO']);
    }
}
