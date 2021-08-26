<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Produto;

/**
 * ProdutoSearch represents the model behind the search form of `app\models\Produto`.
 */
class ProdutoSearch extends Produto
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['CODIGO', 'PRODUTO', 'UNIDADE', 'ADICIONAL', 'CODGRUPO', 'CODSUBGRUPO', 'PRODUTO_MONTADO', 'MOSTRA_KYOSK_APP', 'DT_INICIO_PROMOCAO', 'DT_FIM_PROMOCAO', 'HORA_INICIO_PROMOCAO', 'HORA_FIM_PROMOCAO', 'ACOMPANHAMENTO', 'FOTO'], 'safe'],
            [['PRECOVENDA', 'PRECO_PROMOCAO'], 'number'],
            [['SITUACAO', 'HORARIO_PROMOCAO', 'USA_BALANCA', 'USA_TALHERES', 'USA_PONTO_CARNE', 'USA_COPOS'], 'integer'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = Produto::find();

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        $query->andFilterWhere([
            'PRECOVENDA' => $this->PRECOVENDA,
            'SITUACAO' => $this->SITUACAO,
            'PRECO_PROMOCAO' => $this->PRECO_PROMOCAO,
            'HORARIO_PROMOCAO' => $this->HORARIO_PROMOCAO,
            'USA_BALANCA' => $this->USA_BALANCA,
            'USA_TALHERES' => $this->USA_TALHERES,
            'USA_PONTO_CARNE' => $this->USA_PONTO_CARNE,
            'USA_COPOS' => $this->USA_COPOS,
        ]);

        $query->andFilterWhere(['like', 'CODIGO', $this->CODIGO])
            ->andFilterWhere(['like', 'PRODUTO', $this->PRODUTO])
            ->andFilterWhere(['like', 'UNIDADE', $this->UNIDADE])
            ->andFilterWhere(['like', 'ADICIONAL', $this->ADICIONAL])
            ->andFilterWhere(['like', 'CODGRUPO', $this->CODGRUPO])
            ->andFilterWhere(['like', 'CODSUBGRUPO', $this->CODSUBGRUPO])
            ->andFilterWhere(['like', 'PRODUTO_MONTADO', $this->PRODUTO_MONTADO])
            ->andFilterWhere(['like', 'MOSTRA_KYOSK_APP', $this->MOSTRA_KYOSK_APP])
            ->andFilterWhere(['like', 'DT_INICIO_PROMOCAO', $this->DT_INICIO_PROMOCAO])
            ->andFilterWhere(['like', 'DT_FIM_PROMOCAO', $this->DT_FIM_PROMOCAO])
            ->andFilterWhere(['like', 'HORA_INICIO_PROMOCAO', $this->HORA_INICIO_PROMOCAO])
            ->andFilterWhere(['like', 'HORA_FIM_PROMOCAO', $this->HORA_FIM_PROMOCAO])
            ->andFilterWhere(['like', 'ACOMPANHAMENTO', $this->ACOMPANHAMENTO])
            ->andFilterWhere(['like', 'FOTO', $this->FOTO]);

        return $dataProvider;
    }
}
