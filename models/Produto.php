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
 * @property string|null $OPCIONAL
 * @property int|null $QTDE_MAX_OPCIONAL
 * @property int|null $QTDE_MAX_OPCOES
 * @property string|null $DESTAQUE
 * @property string|null $PROMO_DIAS_SEMANA
 * @property int $PROMO_DELIVERY
 * @property int $PROMO_MESA
 * @property int $PROMO_DOBRO
 * @property int $APP_CARDAPIO
 * @property int $APP_DELIVERY
 * @property int|null $QTDE_MAX_ADICIONAL
 * @property int $PRODUTO_COMBO
 *
 * @property Consumo[] $consumos
 * @property ConsumoDelivery[] $consumoDeliveries
 * @property ItemMontado[] $itemMontados
 * @property ItemMontadoDelivery[] $itemMontadoDeliveries
 * @property Grupo $cODGRUPO
 * @property ProdutoAdicional[] $produtoAdicionals
 * @property ProdutoIngrediente[] $produtoIngredientes
 * @property ProdutoOpcional[] $produtoOpcionals
 */
class Produto extends \yii\db\ActiveRecord {

    /**
     * {@inheritdoc}
     */
    public static function tableName() {
        return 'produto';
    }

    /**
     * {@inheritdoc}
     */
    public function rules() {
        return [
            [['CODIGO', 'PRODUTO', 'PRECOVENDA', 'SITUACAO', 'PROMO_DELIVERY', 'PROMO_MESA', 'APP_CARDAPIO', 'APP_DELIVERY'], 'required'],
            [['PRECOVENDA', 'PRECO_PROMOCAO'], 'number'],
            [['SITUACAO', 'HORARIO_PROMOCAO', 'USA_BALANCA', 'USA_TALHERES', 'USA_PONTO_CARNE', 'USA_COPOS', 'QTDE_MAX_OPCIONAL', 'QTDE_MAX_OPCOES', 'PROMO_DELIVERY', 'PROMO_MESA', 'APP_CARDAPIO', 'APP_DELIVERY', 'PROMO_DOBRO', 'QTDE_MAX_ADICIONAL', 'PRODUTO_COMBO'], 'integer'],
            [['CODIGO', 'CODGRUPO', 'CODSUBGRUPO'], 'string', 'max' => 6],
            [['PRODUTO'], 'string', 'max' => 100],
            [['UNIDADE'], 'string', 'max' => 3],
            [['ADICIONAL', 'PRODUTO_MONTADO', 'MOSTRA_KYOSK_APP', 'OPCIONAL', 'DESTAQUE'], 'string', 'max' => 2],
            [['DT_INICIO_PROMOCAO', 'DT_FIM_PROMOCAO', 'HORA_INICIO_PROMOCAO', 'HORA_FIM_PROMOCAO', 'PROMO_DIAS_SEMANA'], 'string', 'max' => 45],
            [['ACOMPANHAMENTO', 'FOTO'], 'string', 'max' => 200],
            [['CODIGO'], 'unique'],
            [['CODGRUPO'], 'exist', 'skipOnError' => true, 'targetClass' => Grupo::className(), 'targetAttribute' => ['CODGRUPO' => 'CODIGO']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels() {
        return [
            'CODIGO' => 'Codigo',
            'PRODUTO' => 'Produto',
            'UNIDADE' => 'Unidade',
            'PRECOVENDA' => 'Precovenda',
            'SITUACAO' => 'Situacao',
            'ADICIONAL' => 'Adicional',
            'CODGRUPO' => 'Codgrupo',
            'CODSUBGRUPO' => 'Codsubgrupo',
            'PRODUTO_MONTADO' => 'Produto  Montado',
            'MOSTRA_KYOSK_APP' => 'Mostra  Kyosk  App',
            'PRECO_PROMOCAO' => 'Preco  Promocao',
            'DT_INICIO_PROMOCAO' => 'Dt  Inicio  Promocao',
            'DT_FIM_PROMOCAO' => 'Dt  Fim  Promocao',
            'HORA_INICIO_PROMOCAO' => 'Hora  Inicio  Promocao',
            'HORA_FIM_PROMOCAO' => 'Hora  Fim  Promocao',
            'HORARIO_PROMOCAO' => 'Horario  Promocao',
            'USA_BALANCA' => 'Usa  Balanca',
            'USA_TALHERES' => 'Usa  Talheres',
            'USA_PONTO_CARNE' => 'Usa  Ponto  Carne',
            'USA_COPOS' => 'Usa  Copos',
            'ACOMPANHAMENTO' => 'Acompanhamento',
            'FOTO' => 'Foto',
            'OPCIONAL' => 'Opcional',
            'QTDE_MAX_OPCIONAL' => 'Qtde  Max  Opcional',
            'QTDE_MAX_OPCOES' => 'Qtde  Max  Opcoes',
            'DESTAQUE' => 'Destaque',
            'PROMO_DIAS_SEMANA' => 'Promo  Dias  Semana',
            'PROMO_DELIVERY' => 'Promo  Delivery',
            'PROMO_MESA' => 'Promo  Mesa',
            'APP_CARDAPIO' => 'App  Cardapio',
            'APP_DELIVERY' => 'App  Delivery',
            'PROMO_DOBRO' => 'Promocão em dobro',
            'QTDE_MAX_ADICIONAL' => 'Qtde Max Adicional',
            'PRODUTO_COMBO' => 'Produto combo',
        ];
    }

    public function fields() {
        return [
        'CODIGO',
        'PRODUTO'  ,
        'UNIDADE' ,
        'PRECOVENDA' ,
        'SITUACAO',
        'ADICIONAL' ,
        'CODGRUPO',
        'CODSUBGRUPO' ,
        'PRODUTO_MONTADO' ,
        'MOSTRA_KYOSK_APP',
        'PRECO_PROMOCAO' ,
        'DT_INICIO_PROMOCAO' ,
        'DT_FIM_PROMOCAO' ,
        'HORA_INICIO_PROMOCAO' ,
        'HORA_FIM_PROMOCAO' ,
        'HORARIO_PROMOCAO' ,
        'USA_BALANCA' ,
        'USA_TALHERES' ,
        'USA_PONTO_CARNE' ,
        'USA_COPOS' ,
        'ACOMPANHAMENTO' ,
        'FOTO',
        'OPCIONAL' ,
        'QTDE_MAX_OPCIONAL' ,
        'QTDE_MAX_OPCOES' ,
        'DESTAQUE' ,
        'PROMO_DIAS_SEMANA' ,
        'PROMO_DELIVERY' ,
        'PROMO_MESA' ,
        'APP_CARDAPIO' ,
        'APP_DELIVERY' ,
        'PROMO_DOBRO' ,
        'QTDE_MAX_ADICIONAL' ,
        'PRODUTO_COMBO' ,
        'COMBOS' => function(){
                return  $this->PRODUTO_COMBO == 1 ? $this->getCombos() : [];
            },
        ];
    }

    /**
     * Gets query for [[Consumos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getConsumos() {
        return $this->hasMany(Consumo::className(), ['COD_PRODUTO' => 'CODIGO']);
    }

    /**
     * Gets query for [[ConsumoDeliveries]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getConsumoDeliveries() {
        return $this->hasMany(ConsumoDelivery::className(), ['COD_PRODUTO' => 'CODIGO']);
    }

    /**
     * Gets query for [[ItemMontados]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getItemMontados() {
        return $this->hasMany(ItemMontado::className(), ['CODPRODUTO' => 'CODIGO']);
    }

    /**
     * Gets query for [[ItemMontadoDeliveries]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getItemMontadoDeliveries() {
        return $this->hasMany(ItemMontadoDelivery::className(), ['CODPRODUTO' => 'CODIGO']);
    }

    /**
     * Gets query for [[CODGRUPO]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCODGRUPO() {
        return $this->hasOne(Grupo::className(), ['CODIGO' => 'CODGRUPO']);
    }

    /**
     * Gets query for [[ProdutoAdicionals]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getProdutoAdicionals() {
        return $this->hasMany(ProdutoAdicional::className(), ['CODPRODUTO' => 'CODIGO']);
    }

    /**
     * Gets query for [[ProdutoIngredientes]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getProdutoIngredientes() {
        return $this->hasMany(ProdutoIngrediente::className(), ['CODPRODUTO' => 'CODIGO']);
    }

    /**
     * Gets query for [[ProdutoOpcionals]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getProdutoOpcionals() {
        return $this->hasMany(ProdutoOpcional::className(), ['CODPRODUTO' => 'CODIGO']);
    }

    public function getCombos() {
        return Combo::find()->where(['CODPRODUTO' => $this->CODIGO])->orderBy('ORDEM')->all();
    }
}
