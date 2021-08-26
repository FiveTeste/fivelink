<?php
/* @var $this yii\web\View */

$this->title = 'Kyosk online';
?>

<span id="root" style="display: none;" ><?php echo Yii::$app->request->baseUrl; ?></span>
<span id="nummesa" style="display: none;" ><?php echo $mesa ?></span>


<div data-role="page" id="page1"  id="demo-page" class="my-page" style="background-color: transparent;"  > 

    <div data-role="header" id="cabesa" data-position="fixed" style="padding: 0; height: 60px; position: fixed;">
        <div data-role="main" style="height: 60px" >
            <h3 style="text-align: center; font-weight: bold;">Kyosk Online</h3>
            <!--<img src="images/app/icon.png" alt="" id="imglogo" class="ui-btn-left" style="max-height: 48px; max-width: 48px;" /> -->
        </div>

    </div> 
    <div class="panel-header bg-warning-gradient" style="background-color: #292a2e; height: 160px !important; ">
        <div class="page-inner py-5" style="height: 160px; background-image: url(images/app/banner.PNG); background-repeat: no-repeat; background-size: 100%;">
            <div class="d-flex align-items-left align-items-md-center flex-column flex-md-row">
                <div>
                    <img src="images/logo/logo.png"  style="width: 120px;height: 120px; margin-top: -30px; background-color: #ffffff; border-radius: 60px; "/>
                    <h2 class="text-white pb-2 fw-bold" style="text-align: center; float: right; margin-right: 80px;">Mesa <?= $mesa ?></h2>
                    <!--<h5 class="text-white op-7 mb-2"></h5>-->
                </div>
            </div>
        </div>
    </div> 

    <div data-role="main" class="ui-content" style="min-height: 68vh;" >

        



        <div class="col">
            <div class="row">
                <ul class="nav nav-pills nav-danger  nav-pills-no-bd nav-pills-icons md-3" id="pills-tab" role="tablist" >
                    
                    <li class="nav-item col-md-5" style="background-color: #f37c08;">
                        <a class="nav-link active" id="pills-home-tab-icon" data-toggle="pill" href="#pills-destaques-icon" role="tab" aria-controls="pills-destaques-icon" aria-selected="true">
                            <i class="flaticon-star"></i>
                            <img src="../../web/images/grupos/correios1.png" />
                            Destaques
                        </a>
                    </li>

                  <!--  <li class="nav-item">
                        <a class="nav-link active" id="pills-home-tab-icon" data-toggle="pill" href="#pills-destaques-icon" role="tab" aria-controls="pills-destaques-icon" aria-selected="true">
                            <i class="flaticon-star"></i>
                            <img src="../../web/images/grupos/correios1.png" />
                            Destaques
                        </a>
                    </li>


                    <li class="nav-item">
                        <a class="nav-link " id="pills-home-tab-icon" data-toggle="pill" href="#pills-lanches-icon" role="tab" aria-controls="pills-lanches-icon" aria-selected="true">
                            <i class="fas fa-hamburger"></i>
                            Lanches
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="pills-profile-tab-icon" data-toggle="pill" href="#pills-profile-icon" role="tab" aria-controls="pills-profile-icon" aria-selected="false">
                            <i class="flaticon-paint-palette"></i>
                            Pizzas
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="pills-contact-tab-icon" data-toggle="pill" href="#pills-espetos-icon" role="tab" aria-controls="pills-espetos-icon" aria-selected="false">
                            <i class="fas fa-drumstick-bite"></i>
                            Espetos
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="pills-contact-tab-icon" data-toggle="pill" href="#pills-contact-icon" role="tab" aria-controls="pills-contact-icon" aria-selected="false">
                            <i class="flaticon-coffee-cup"></i>
                            Bebidas
                        </a>
                    </li>
                    -->
                    
                </ul>
            </div>
        </div>

    </div>
    <div data-role="footer" data-position="fixed">
        <div data-role="navbar" >
            <ul>
                <li ><a href="#page1" data-transition="slide" data-direction="reverse" data-icon="home">Inicio</a> </li>
                <li ><a href="#page2" data-transition="slide"  data-icon="shop">Carrinho</a> </li>
            </ul>
        </div>
    </div>
</div>



<div data-role="page" id="page2" class="carrinho" style="background-color: transparent;" >
    <div data-role="header" data-position="fixed" >
        <a href="./" data-shadow="false" data-iconshadow="false" data-icon="carat-l" data-iconpos="notext" data-rel="back" data-ajax="false">Back</a>
        <h3>Meu carrinho</h3>
    </div>

    <div data-role="main" class="ui-content">

        <div style="height: 120px;">
            <h5 style=" color: #f7931e;font-weight: bolder; font-size: 16px; " id="total_pedido">Total R$ 0,00</h5>
            <br/>
            <button style="width: 200px; margin: auto; " type="button" class="btn btn-success " onclick="enviarPedido();">Enviar pedido</button>
        </div>

        <p id="itens">ITENS</p>
        
        <div class="col">
            <div class="row">
                <ul class="nav nav-pills nav-danger  nav-pills-no-bd nav-pills-icons md-3" style="width: 100%;" id="lst-carr" data-filter="true" role="tablist" data-input="#filterable-input">                    

                     <!--<li class="nav-item1" style="margin-left: 0!important;" > 
                         <a class="nav-link " id="pills-home-tab-icon" data-toggle="pill" href="#" data-transition="slide" data-direction="reverse" 
                            role="tab" aria-controls="pills-destaques-icon" aria-selected="true" style="padding: 0;">
                             <img src="images/grupos/correios1.png" class=" float-left rounded-circle" />
                             <p >  asdfasdfasd  asdfasdfadsfasd asdfasd asdfasdf asdfasd asdfasdfasdf asd</p>   
                             <h4 >   </h4>  
                             <i class="bi bi-trash lixeira" ></i>
                             <div>
                             <span class="qtde">Qtde. 2</span>
                             <h5 >Total 0,00</h5>
                             </div>
                             
                         </a>             
                     </li> -->


                </ul>
            </div>
        </div>
         

    </div>
    <div data-role="footer" data-position="fixed">
        <div data-role="navbar">
            <ul>
                <li ><a href="#page1" data-transition="slide" data-direction="reverse" data-icon="home">Home</a> </li>
                <li ><a href="#page2" data-transition="slide"  data-icon="shop">Carrinho</a> </li>
            </ul>
        </div>
    </div>
</div>



<div data-role="page" id="produtos" data-theme="a" style="background-color: transparent;">
    <div data-role="header" data-position="fixed" >       
        <a href="./" data-shadow="false" data-iconshadow="false" data-icon="carat-l" data-iconpos="notext" data-rel="back" data-ajax="false">Back</a>
        <h1>Opções</h1>
    </div>

    <div data-role="main" class="ui-content">       

        <form class="ui-filterable">
            <input id="filterable-input" data-type="search" placeholder="Pesquisa de produtos...">
        </form>

        <div class="col">
            <div class="row">
                <ul class="nav nav-pills nav-danger  nav-pills-no-bd nav-pills-icons md-3" style="width: 100%;" id="lst-prod" data-filter="true" role="tablist" data-input="#filterable-input">                    

                    <!-- <li class="nav-item1" style="margin-left: 0!important;" onclick="prodSelecionado(this.id)" > 
                         <a class="nav-link " id="pills-home-tab-icon" data-toggle="pill" href="#" data-transition="slide" data-direction="reverse" 
                            role="tab" aria-controls="pills-destaques-icon" aria-selected="true" style="padding: 0;">
                             <img src="images/grupos/correios1.png" class=" float-left rounded-circle" />
                             <p >  asdfasdfasd  asdfasdfadsfasd asdfasd asdfasdf asdfasd asdfasdfasdf asd</p>   
                             <h4 >  asdfasdfasd  asdfasdfadsfasd asdfasdf asdfasdfa sdfasd </h4>  
                             <h5 >R$ 15,25</h5>
                         </a>             
                     </li> -->


                </ul>
            </div>
        </div>



    </div>
    <div data-role="footer" data-position="fixed" >
        <div data-role="navbar">
            <ul>
                <li ><a href="#page1" data-transition="slide" data-direction="reverse" data-icon="home">Home</a> </li>
                <li ><a href="#page2" data-transition="slide"  data-icon="shop">Carrinho</a> </li>
            </ul>
        </div>
    </div>
</div>


<div data-role="dialog" id="myDialog" data-theme="a"  >
    <div data-role="header" data-position="fixed" style="height: 40px;" >
        <a id="fecha-produto" href="./" data-shadow="false" data-iconshadow="false" data-icon="carat-l" data-iconpos="notext" data-rel="back" data-ajax="false">Back</a>
        <h1></h1>
    </div>

    <div data-role="main" class="ui-content" >   

        <div>
            <img id="prod_sele_img" src="" style="width: 100%;height: 200px" />
            <p id="prod_sele_nome">Nome do produto</p>
            <p id="prod_sele_acompanhamento">Acompanhamento do produto</p>
            <p id="prod_sele_preco">R$ 0,00</p>
        </div>

        <div id="telas" style="width: 100%; height: 500px;">

            <div id="trivia-city" class="trivia ui-content" data-role="popup"  data-tolerance="50,30,30,30" data-theme="a">
                <a href="#" data-rel="back" class="ui-btn ui-btn-right ui-btn-b ui-btn-icon-notext ui-icon-delete ui-corner-all">Close</a>
                <p>Here some text.</p>
            </div><!-- /popup -->


        </div>



    </div>

</div>









<!--  telas de opçoes -->

<div data-role="page" id="page_option_opcoes" data-theme="a"  >
    <div data-role="header" data-position="fixed" style="height: 40px;" >
        <h3>Opções</h3>
    </div>

    <div data-role="main" class="ui-content" style="height: 35vh; overflow-y: auto;">   

        <div class="col">
            <div class="row">
                <ul class="nav nav-pills nav-danger  nav-pills-no-bd nav-pills-icons md-3" style="width: 100%;" id="lst-prod-opcoes" role="tablist" >                    

                    <!-- <li class="nav-item1" style="margin-left: 0!important;" onclick="prodSelecionado(this.id)" > 
                         <a class="nav-link " id="pills-home-tab-icon" data-toggle="pill" href="#" data-transition="slide" data-direction="reverse" 
                            role="tab" aria-controls="pills-destaques-icon" aria-selected="true" style="padding: 0;">
                             <img src="images/grupos/correios1.png" class=" float-left rounded-circle" />
                             <p >  asdfasdfasd  asdfasdfadsfasd asdfasd asdfasdf asdfasd asdfasdfasdf asd</p>   
                             <h4 >  asdfasdfasd  asdfasdfadsfasd asdfasdf asdfasdfa sdfasd </h4>  
                             <h5 >R$ 15,25</h5>
                         </a>             
                     </li> -->


                </ul>
            </div>
        </div>


    </div>
    <button style="position: absolute;  right: 30px;" type="button" class="btn btn-success " onclick="navnext();">Proximo</button>

</div>

<div data-role="page" id="page_option_ponto" data-theme="a"  >
    <div data-role="header" data-position="fixed" style="height: 40px;" >
        <h3>Ponto da carne</h3>
    </div>

    <div data-role="main" class="ui-content" style="min-height: 30vh;">   

        <div>
            <div class="form-check" >
                <input class="form-check-input" type="radio" name="radio_pontocarne" value="Mal passado" id="flexRadioDefault1" checked>
                <label style="display: inline !important;" class="form-check-label" for="flexRadioDefault1">
                    Mal passado
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="radio_pontocarne" value="Ao ponto" id="flexRadioDefault2" >
                <label style="display: inline !important;" class="form-check-label" for="flexRadioDefault2">
                    Ao ponto
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="radio_pontocarne" value="Bem passado" id="flexRadioDefault3" >
                <label style="display: inline !important;" class="form-check-label" for="flexRadioDefault3">
                    Bem passado
                </label>
            </div>
        </div>




    </div>
    <button style="position: absolute;  right: 30px;" type="button" class="btn btn-success " onclick="actionPontoCarne();">Proximo</button>

</div>

<div data-role="page" id="page_option_adicionais" data-theme="a"  >
    <div data-role="header" data-position="fixed" style="height: 40px;" >
        <h3>Adicionais</h3>
    </div>

    <div data-role="main" class="ui-content" style="height: 35vh; overflow-y: auto;">   

        <div class="list-group" id="lista-adicionais">
           
           <!-- <label class="list-group-item">
                First checkbox
                <input style="position: absolute; right: 10px;" class="form-check-input me-1" type="checkbox" value="">
            </label> -->

        </div>


    </div>
    <button style="position: absolute;  right: 30px;" type="button" class="btn btn-success " onclick="navnext();">Proximo</button>

</div>

<div data-role="page" id="page_option_opcionais" data-theme="a"  >
    <div data-role="header" data-position="fixed" style="height: 40px;" >
        <h3>Opcionais</h3>
    </div>

    <div data-role="main" class="ui-content" style="min-height: 35vh;">   

        <div class="list-group" id="lista-opcionais">
            
           <!-- <label class="list-group-item">
                First checkbox
                <input style="position: absolute; right: 10px;" class="form-check-input me-1" type="checkbox" value="">
            </label> -->
            
        </div>



    </div>
    <button style="position: absolute;  right: 30px;" type="button" class="btn btn-success " onclick="actionOpcionais();">Proximo</button>

</div>
<div data-role="page" id="page_option_pratos_talheres" data-theme="a"  >
    <div data-role="header" data-position="fixed" style="height: 40px;" >
        <h3>Pratos e talheres</h3>
    </div>

    <div data-role="main" class="ui-content" style="min-height: 30vh;">   


        <input id="pratos-talheres" type="number" value="1" min="1" max="1000" step="1"/>


    </div>
    <button style="position: absolute;  right: 30px;" type="button" class="btn btn-success " onclick="actionPratosTalheres();">Proximo</button>



</div>
<div data-role="page" id="page_option_copos" data-theme="a"  >
    <div data-role="header" data-position="fixed" style="height: 40px;" >
        <h3>Copos</h3>
    </div>

    <div data-role="main" class="ui-content" style="min-height: 30vh;">   


        <div style="display: flex; align-items: center;">
            <label class="col-md-7" for="copo-simples">Copo</label>  
            <div >
                <input class="col-md-12"  id="copo-simples" type="number" value="0" min="0" max="100" step="1"/>
            </div>
        </div>

        <br/>

        <div style="display: flex; align-items: center;">
            <label class="col-md-7" for="copo-com-gelo">Copo com gelo</label> 
            <div >
                <input class="col-md-12" id="copo-com-gelo" type="number" value="0" min="0" max="100" step="1"/>
            </div>
        </div>

        <br/>

        <div style="display: flex; align-items: center; ">
            <label class="col-md-7" for="copo-com-gelo-limao">Copo com gelo e limão</label> 
            <div >
                <input class="col-md-12" id="copo-com-gelo-limao" type="number" value="0" min="0" max="100" step="1"/>
            </div>
        </div>                                                                 

    </div>
    <button style="position: absolute; right: 30px;" type="button" class="btn btn-success " onclick="actionCopos();">Proximo</button>

</div>

<div data-role="page" id="page_option_observacao" data-theme="a"  >
    <div data-role="header" data-position="fixed" style="height: 40px;" >
        <h3>Observação</h3>
    </div>

    <div data-role="main" class="ui-content" style="min-height: 30vh; ">   


         <label for="textarea-enhanced">Alguma observação no seu pedido?</label>
            <textarea name="textarea-enhanced" id="textarea-obs" data-enhanced="true" wrap="hard" class="ui-input-text ui-shadow-inset ui-body-inherit ui-corner-all"
                      maxlength="100"></textarea> 



    </div>

    <button style="position: absolute;  right: 30px;" type="button" class="btn btn-success " onclick="observacaoPedido();">Proximo</button>

</div>
<div data-role="page" id="page_option_quantidade" data-theme="a"  >
    <div data-role="header" data-position="fixed" style="height: 40px;" >
        <h3>Quantidade</h3>
    </div>

    <div data-role="main" class="ui-content" style="min-height: 30vh;">   


        <input id="quantidade" type="number" value="1" min="1" max="1000" step="1" />


    </div>
    <button style="position: absolute; right: 30px;" type="button" class="btn btn-success" onclick="actionQuantidade();" >Adicionar ao carrinho</button>


</div>


