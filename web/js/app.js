
$(window).ready(function () {

    urlBase = $('#root').text() + '/index.php?r=site/';
    codMesa = $('#nummesa').text();
    carregarGrupos();

    lista_grupos = [];

});

/**         VARIAVEIS GLOBAL      **/
var idSubgrupoSelecionado = "";
var lista_produto = [];
var produto = {
    ACOMPANHAMENTO: "", ADICIONAL: null, CODGRUPO: "", CODIGO: "",
    CODSUBGRUPO: "", DT_FIM_PROMOCAO: "", DT_INICIO_PROMOCAO: "",
    FOTO: "", HORARIO_PROMOCAO: 1, HORA_FIM_PROMOCAO: "", HORA_INICIO_PROMOCAO: "",
    MOSTRA_KYOSK_APP: "", PRECOVENDA: 0, PRECO_PROMOCAO: 0, PRODUTO: "", PRODUTO_MONTADO: null,
    SITUACAO: 0, UNIDADE: "UN", USA_BALANCA: 2, USA_COPOS: null, USA_PONTO_CARNE: null, USA_TALHERES: null
};


var lista_telas_opcoes = [];
var lista_prod_opcionais = [];
var lista_prod_opcionais_selecionado = [];
var lista_prod_adicionais = [];
var lista_prod_adicionais_selecionado = [];
var nextPageOption = 0;

var consumo_list = [];
var consumo_lista_itemIngrediente = [];

class ItemIngrediente {
    constructor(CODIGO, CODVENDA, CODPRODUTO, CODINGREDIENTE, CODITEM, CANCELADO, PAGO) {
        this.CODIGO = CODIGO;
        this.CODVENDA = CODVENDA;
        this.CODPRODUTO = CODPRODUTO;
        this.CODINGREDIENTE = CODINGREDIENTE;
        this.CODITEM = CODITEM;
        this.CANCELADO = CANCELADO;
        this.PAGO = PAGO;
    }

}
;
class Consumo {
    constructor(COD_MESA, COD_USUARIO, COD_PRODUTO, PRODUTO, QTDE, UNITARIO, TOTAL, TRANSF_MESA, CANCELADO, COMPLEMENTO, COMPLEMENTO2, IMPRESSO, COD_AGRUP, CODSUBGRUPO,
        COD_TEMP, DISPOSITIVO, LISTA_OPCIONAIS, LISTA_ADICIONAIS, FOTO) {
        var agora = new Date();
        this.COD_MESA = COD_MESA;
        this.COD_USUARIO = COD_USUARIO;
        this.COD_PRODUTO = COD_PRODUTO;
        this.PRODUTO = PRODUTO;
        this.QTDE = QTDE;
        this.UNITARIO = UNITARIO;
        this.TOTAL = TOTAL;
        this.TRANSF_MESA = TRANSF_MESA;
        this.CANCELADO = CANCELADO;
        this.HORA = agora.toLocaleTimeString();
        this.COMPLEMENTO = COMPLEMENTO;
        this.COMPLEMENTO2 = COMPLEMENTO2;
        this.IMPRESSO = IMPRESSO;
        this.COD_AGRUP = COD_AGRUP;
        this.CODSUBGRUPO = CODSUBGRUPO;
        this.ADICIONAL = "N";
        this.ADC_CODITEM = "";
        this.COD_TEMP = COD_TEMP;
        this.NAOSINCRONIZADO = 0;
        this.DATA = agora.toLocaleDateString();
        this.DISPOSITIVO = DISPOSITIVO;
        this.PAGO = "N";
        this.LISTA_OPCIONAIS = LISTA_OPCIONAIS;
        this.LISTA_ADICIONAIS = LISTA_ADICIONAIS;
        this.FOTO = FOTO;
    }
}
;
var consumop;
var produto_opcao_ponto = "";
var produto_opcao_copos = "";
var produto_opcao_talheres = 0;
var obs = "";
var totalAdicionais = 0;




/********************************************************************/

$(window).on('beforeunload', function () {
    return "Tem a certeza que quer sair da pagina?";
});



var carregarGrupos = function () {
    $.ajax({
        url: urlBase + "grupo",
        type: 'GET',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            lista_grupos = data;
            var i = 0;
            $('#pills-tab').html('');
            while (data[i]) {
                $('#pills-tab').append(
                    ' <li class="nav-item " id="' + data[i]['CODIGO'] + '" onClick="carregarProdutos(this.id)" style="margin-left: 3px!important; "> ' +
                    ' <a class="nav-link" id="pills-home-tab-icon" data-toggle="pill" href="#produtos" data-transition="slide" data-direction="reverse" ' +
                    'role="tab" aria-controls="pills-destaques-icon" aria-selected="true" style="height: 80px;display: block;vertical-align: middle;">' +
                    '     <i class=""><!-- <img src="images/grupos/correios1.png" class="img-item-grupo" /> --></i>' +
                    '' +
                    '    ' + data[i]['GRUPO'] + '      ' +
                    ' </a>              ' +
                    ' </li>             '
                );
                i++;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
};

function getListasubgrupo(codigo) {
    for (var i = 0; i < lista_grupos.length; i++) {
        if (lista_grupos[i]['CODIGO'] == codigo)
            return lista_grupos[i]['NAO_MOSTRA_KYOSK'];
    }
}

var carregarProdutos = function (codigo) {
    $.mobile.navigate("#produtos", { info: "info about the #foo hash" });
    $.mobile.defaultPageTransition = "slide";
    var dados = {
        'codgrupo': codigo
    };

    var subgrupos = getListasubgrupo(codigo);
    console.log(subgrupos.length);
    if (subgrupos.length == 0) {
        $.ajax({
            url: urlBase + "produtobygrupo",
            type: 'GET',
            data: dados,
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {
                lista_produto = data;
                var i = 0;
                $('#lst-prod').html('');
                while (data[i]) {
                    var acompanhamento = '';
                    if (data[i]['ACOMPANHAMENTO'] != null)
                        acompanhamento = data[i]['ACOMPANHAMENTO'].toString().toLowerCase();
                    var preco = parseFloat(data[i]['PRECOVENDA']).toFixed(2);
                    var foto = data[i]['FOTO'];
                    var codigo = data[i]['CODIGO'];
                    var imagem = "default.png";
                    if (foto !== null && foto !== '') {
                        foto = foto.toString().substring(foto.length - 3, foto.length);
                        imagem = codigo + ".png";
                    }

                    $('#lst-prod').append(
                        '<li class="nav-item1" style="margin-left: 0!important;" id="' + i + '_id" onclick="prodSelecionado(this.id,0)" >  ' +
                        '<a class="nav-link " id="pills-home-tab-icon" data-toggle="pill" href="#" data-transition="slide" data-direction="reverse" ' +
                        'role="tab" aria-controls="pills-destaques-icon" aria-selected="true" style="padding: 0;">' +
                        '<img src="images/produtos/' + imagem + '" class=" float-left rounded-circle" />' +
                        '<p >  ' + data[i]['PRODUTO'] + '</p>   ' +
                        '<h4 >  ' + acompanhamento + ' </h4>  ' +
                        '<h5  >R$ ' + preco + '</h5>' +
                        '</a>             ' +
                        '</li>          '
                    );
                    i++;
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    } else {
        var i = 0;
        $('#lst-prod').html('');
        while (subgrupos[i]) {
            var acompanhamento = '';
            var preco = 0;
            var foto = '';
            var codigo = subgrupos[i]['CODIGO'];
            var imagem = "default.png";

            $('#lst-prod').append(
                '<li class="nav-item1" style="margin-left: 0!important;" id="' + codigo + '" onclick="prodSelecionado(this.id,1)" >  ' +
                '<a class="nav-link " id="pills-home-tab-icon" data-toggle="pill" href="#" data-transition="slide" data-direction="reverse" ' +
                'role="tab" aria-controls="pills-destaques-icon" aria-selected="true" style="padding: 0;">' +
                '<img src="images/produtos/' + imagem + '" class=" float-left rounded-circle" />' +
                '<p >  </p>   ' +
                '<p >  ' + subgrupos[i]['SUBGRUPO'] + ' </p>  ' +
                '<h5  ></h5>' +
                '</a>             ' +
                '</li>          '
            );
            i++;
        }
    }
};


var prodSelecionado = function (_id, tipo) {
    nextPageOption = 0;
    lista_telas_opcoes = [];
    lista_prod_adicionais = [];
    lista_prod_opcionais = [];
    totalAdicionais = 0;
    produto_opcao_ponto = "";
    produto_opcao_copos = "";
    produto_opcao_talheres = 0;
    obs = "";

    $.mobile.changePage("#myDialog", { role: "page", transition: 'slideup' });

    /**
     * tipo = 0  produto
     * tipo = 1  subgrupo
     * */
    if (tipo === 0) {
        var pos = _id.toString().split('_')[0];
        produto = lista_produto[pos];

        $('#prod_sele_nome').text(produto.PRODUTO);
        $('#prod_sele_acompanhamento').text(produto.ACOMPANHAMENTO);
        $('#prod_sele_preco').text('Subtotal R$ ' + produto.PRECOVENDA.toFixed(2));

        var foto = produto.FOTO;
        var codigo = produto.CODIGO;
        var imagem = "default.png";
        if (foto !== null && foto !== '') {
            foto = foto.toString().substring(foto.length - 3, foto.length);
            imagem = codigo + ".png";
        }
        $('#prod_sele_img').attr('src', 'images/produtos/' + imagem);


        getOpcionais(produto.CODIGO);
        // lista_prod_opcionais = ['adicional'];
        getAdicionais(produto.CODIGO);
        //lista_prod_adicionais = ['opcional'];

        if (produto.USA_PONTO_CARNE !== null && produto.USA_PONTO_CARNE === 1)
            lista_telas_opcoes.push('page_option_ponto');
        if (lista_prod_opcionais.length > 0)
            lista_telas_opcoes.push('page_option_opcionais');
        if (lista_prod_adicionais.length > 0)
            lista_telas_opcoes.push('page_option_adicionais');
        if (produto.USA_COPOS !== null && produto.USA_COPOS > 0)
            lista_telas_opcoes.push('page_option_copos');
        if (produto.USA_TALHERES !== null && produto.USA_TALHERES === 1)
            lista_telas_opcoes.push('page_option_pratos_talheres');


        consumop = new Consumo(codMesa, "000001", produto.CODIGO, produto.PRODUTO, 1, produto.PRECOVENDA, produto.PRECOVENDA, 0, 0, "", "", 0, "", "", "", "", "", "", imagem);
    } else {
        idSubgrupoSelecionado = _id;
        var subgrupo = getDados(idSubgrupoSelecionado, "getsubgrupo");
        //console.log(subgrupo);
        $('#prod_sele_nome').text(subgrupo['SUBGRUPO']);
        $('#prod_sele_acompanhamento').text("");
        $('#prod_sele_preco').text('Subtotal R$ 0,00');

        lista_telas_opcoes.push('page_option_opcoes'); //sabores       
    }

    lista_telas_opcoes.push('page_option_observacao');
    lista_telas_opcoes.push('page_option_quantidade');

    navnext();

};

// Handler for navigating to the next page
function navnext() {
    $("div.input-group").remove();
    $("input[type='number']").re;
    $('#telas').html($('#' + lista_telas_opcoes[nextPageOption]).html());

    $("input[type='number']").inputSpinner();

    if (lista_telas_opcoes[nextPageOption] === 'page_option_opcoes') {
        var lista_opcoes = getDados(idSubgrupoSelecionado, 'produtobysubgrupo');
        console.log(idSubgrupoSelecionado);
        var i = 0;
        $('#lst-prod-opcoes').html('');
        while (lista_opcoes[i]) {
            var acompanhamento = '';
            if (lista_opcoes[i]['ACOMPANHAMENTO'] != null)
                acompanhamento = lista_opcoes[i]['ACOMPANHAMENTO'].toString().toLowerCase();
            var preco = parseFloat(lista_opcoes[i]['PRECOVENDA']).toFixed(2);
            var foto = lista_opcoes[i]['FOTO'];
            var codigo = lista_opcoes[i]['CODIGO'];
            var imagem = "default.png";
            if (foto !== null && foto !== '') {
                foto = foto.toString().substring(foto.length - 3, foto.length);
                imagem = codigo + ".png";
            }
            //parei aqui ver opcção de selecionar os produtos divisiveis para adicionar ao consumo (montado)
            $('#lst-prod-opcoes').append(
                '<li class="nav-item1" style="margin-left: 0!important;" id="' + i + '_id" onclick="prodSelecionado(this.id,0)" >  ' +
                '<a class="nav-link " id="pills-home-tab-icon" data-toggle="pill" href="#" data-transition="slide" data-direction="reverse" ' +
                'role="tab" aria-controls="pills-destaques-icon" aria-selected="true" style="padding: 0;">' +
                '<img src="images/produtos/' + imagem + '" class=" float-left rounded-circle" />' +
                '<p >  ' + lista_opcoes[i]['PRODUTO'] + '</p>   ' +
                '<h4 >  ' + acompanhamento + ' </h4>  ' +
                '<h5  >R$ ' + preco + '</h5>' +
                '</br>' +
                '<input style="position: absolute; right: 10px;" class="form-check-input me-1" type="checkbox" value="">' +
                '</a>             ' +
                '</li>          '
            );
            i++;
        }
    }

    if (lista_telas_opcoes[nextPageOption] === 'page_option_opcionais') {
        var i = 0;
        $('#lista-opcionais').html('');
        while (lista_prod_opcionais[i]) {
            $('#lista-opcionais').append(
                '<label class="list-group-item">' +
                lista_prod_opcionais[i]['NOME'] +
                '<input style="position: absolute; right: 10px;" class="form-check-input me-1 ckbopcionais" type="checkbox" value="' + lista_prod_opcionais[i]['CODIGO'] + '">' +
                '</label> '
            );
            i++;
        }
    }

    if (lista_telas_opcoes[nextPageOption] === 'page_option_adicionais') {
        var i = 0;
        $('#lista-adicionais').html('');
        while (lista_prod_adicionais[i]) {
            $('#lista-adicionais').append(
                '<label class="list-group-item">' +
                lista_prod_adicionais[i]['PRODUTO'] +
                '<input id="' + i + '" style="position: absolute; right: 10px;" class="form-check-input me-1 ckbadicionais" type="checkbox" value="' + lista_prod_adicionais[i]['CODIGO'] + '" onclick="actionAdicionais();">' +
                '</label> '
            );
            i++;
        }
    }

    nextPageOption++;

    var $changedInput = $("input#quantidade");
    $changedInput.on("change", function (event) {
        //alert("teste");
        //alert($(event.target).val());
        consumop.QTDE = $(event.target).val();
        atualizaConsumo();
    });

}

var actionPontoCarne = function () {
    $("input[name*=radio_pontocarne]:checked").each(function () {
        produto_opcao_ponto = $(this).val();
    });

    navnext();
};

var actionOpcionais = function () {
    var i = 0;
    lista_prod_opcionais_selecionado = [];

    $("input.ckbopcionais:checked").each(function () {
        i++;
        itemIngrediente = new ItemIngrediente(i, codMesa, produto.CODIGO, $(this).val(), i, 0, 'N');
        lista_prod_opcionais_selecionado.push(itemIngrediente);
    });

    //console.log(lista_prod_opcionais_selecionado);
    navnext();
};

var actionAdicionais = function () {
    var i = 0;
    lista_prod_adicionais_selecionado = [];
    totalAdicionais = 0;

    $("input.ckbadicionais:checked").each(function () {
        i++;
        var pos = $(this).prop('id');
        var preco = lista_prod_adicionais[pos]['PRECOVENDA'];
        var adicional = { CODADICIONAL: $(this).val(), QTDE: 1, PRECO: preco, CODITEM: i, CONSUMO: 0 };
        lista_prod_adicionais_selecionado.push(adicional);
        totalAdicionais += preco;
    });
    atualizaConsumo();
};

var observacaoPedido = function () {
    obs = $("input#textarea-obs").val();
    navnext();
};

var actionCopos = function () {
    var copo_s = $("#copo-simples").val();
    var copo_comgelo = $("#copo-com-gelo").val();
    var copo_comgelo_limao = $("#copo-com-gelo-limao").val();

    if (copo_s > 0)
        produto_opcao_copos = "Copo: " + copo_s + ",";
    if (copo_comgelo > 0)
        produto_opcao_copos += "Copo com gelo: " + copo_comgelo + ",";
    if (copo_comgelo_limao > 0)
        produto_opcao_copos += "Copo com gelo e limão: " + copo_comgelo_limao;

    navnext();
};

var actionPratosTalheres = function () {
    var pratos_talheres = $("input#pratos-talheres").val();
    if (pratos_talheres > 0)
        produto_opcao_talheres = "Talheres/Pratos: " + pratos_talheres;

    navnext();
};

var actionQuantidade = function () {
    var qtde = $("input#quantidade").val();
    if (qtde > 0) {
        produto_opcao_talheres = "Talheres/Pratos: " + qtde;

        consumop.QTDE = qtde;
        consumop.LISTA_ADICIONAIS = lista_prod_adicionais_selecionado;
        consumop.LISTA_OPCIONAIS = lista_prod_opcionais_selecionado;
        consumop.COMPLEMENTO = obs;
        consumop.COMPLEMENTO2 = produto_opcao_ponto + " " + produto_opcao_copos + " " + produto_opcao_talheres;
        atualizaConsumo();
        var hash = $.md5(new Date().toLocaleString() + consumop.TOTAL + consumop.QTDE + codMesa);
        consumop.DISPOSITIVO = hash.toString().toUpperCase();
        //console.log(consumop);
        consumo_list.push(consumop);

        $('#fecha-produto').click();

    }
};

$(document).on("pageshow", "#page2", function () { // When entering pagetwo
    carregarItensCarrinho();
});

var deleteConsumoLista = function (id) {
    var pos = id.replace(/[^0-9]/g, '');
    consumo_list.splice(pos, 1);

    if (consumo_list.length > 0) {
        carregarItensCarrinho();
    } else {
        parent.history.back();
        return false;
    }
};

var carregarItensCarrinho = function () {
    var i = 0;
    var soma_pedido = 0;
    var preco = 0;
    $('#lst-carr').html('');
    while (consumo_list[i]) {
        var acompanhamento = '.';
        //if (consumo_list[i]['ACOMPANHAMENTO'] != null)
        //   acompanhamento = data[i]['ACOMPANHAMENTO'].toString().toLowerCase();
        preco = parseFloat(consumo_list[i]['TOTAL']).toFixed(2);
        soma_pedido = parseFloat(soma_pedido) + parseFloat(preco);

        var foto = consumo_list[i]['FOTO'];
        var imagem = "default.png";
        if (foto !== null && foto !== '') {
            imagem = foto;
        }

        $('#lst-carr').append(
            '<li class="nav-item1" style="margin-left: 0!important;" id="' + i + '_id" >  ' +
            '<a class="nav-link " id="pills-home-tab-icon" data-toggle="pill" href="#" data-transition="slide" data-direction="reverse" ' +
            'role="tab" aria-controls="pills-destaques-icon" aria-selected="true" style="padding: 0;">' +
            '<img src="images/produtos/' + imagem + '" class=" float-left rounded-circle" />' +
            '<p >  ' + consumo_list[i]['PRODUTO'] + '</p>   ' +
            '<h4 >  ' + acompanhamento + ' </h4>  ' +
            '<i class="bi bi-trash lixeira" id="' + i + '_cid" onclick="deleteConsumoLista(this.id);" ></i> ' +
            ' <div> <p class="qtde">Qtde. ' + consumo_list[i]['QTDE'] + '</p>' +
            '<h5  >Total R$ ' + preco + '</h5> </div>' +
            '</a>             ' +
            '</li>          '
        );
        i++;

    }

    $('#total_pedido').text("Total R$ " + parseFloat(soma_pedido).toFixed(2));
};

var getDados = function (codigo, funcao) {
    var retorno = "";
    var dados = {
        cod: codigo
    };
    $.ajax({
        url: urlBase + funcao,
        async: false,
        type: 'GET',
        data: dados,
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {
            retorno = data;
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
    return retorno;
};

var getOpcionais = function (codproduto) {
    var dados = {
        codproduto: codproduto
    };
    $.ajax({
        url: urlBase + "opcionalbyproduto",
        async: false,
        type: 'GET',
        data: dados,
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {
            lista_prod_opcionais = data;
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
};

var getAdicionais = function (codproduto) {
    var dados = {
        codproduto: codproduto
    };
    $.ajax({
        url: urlBase + "adicionalbyproduto",
        async: false,
        type: 'GET',
        data: dados,
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {
            lista_prod_adicionais = data;
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
};

var atualizaConsumo = function () {
    consumop.TOTAL = consumop.QTDE * (produto.PRECOVENDA + totalAdicionais);
    $("#prod_sele_preco").text("Subtotal R$ " + consumop.TOTAL.toFixed(2));
};

var enviarPedido = function () {
    if (consumo_list.length > 0) {
        var d = new Date();
        var dados = {
            mesa: {
                COD_MESA: codMesa,
                DATA: d.toLocaleDateString(),
                HORA: d.toLocaleTimeString(),
                COD_FUNCIONARIO: '000001',
                NUM_MESA_ACOMODACAO: 0,
                ACRESCIMO: 0,
                SITUACAO: 0,
                EMPRESA: '000001'
            },
            pedido: consumo_list
        };
        console.log(dados);

        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get("token");

        $.ajax({
            url: urlBase + "salvarpedido&token=" + token,
            async: false,
            type: 'POST',
            data: dados,
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {
                if (data['message'] === "sucesso") {
                    $.confirm({
                        theme: 'modern',
                        title: 'Pedido enviado com sucesso',
                        content: 'Seu pedido será entregue em instantes. Obrigado !',
                        buttons: {
                            Obrigado: function () {
                                consumo_list = [];
                                $('#lst-carr').html('');
                                window.history.back();
                            }
                        }
                    });
                } else {
                    $.confirm({
                        theme: 'modern',
                        title: 'Erro!',
                        content: 'Seu pedido não pode ser enviado, tente novamente !',
                        buttons: {
                            Ok: function () {

                            }
                        }
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    } else {
        alert('Não há pedidos para enviar!');
    }
};


