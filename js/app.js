$(document).ready(function(){
  //declaro variables
  var columnas=0;
  var filas=0;
  var verificar;
  var puntuacion=0;
  var movimientos=0;
  var val=0;
  var valtmp=0;
  var tiempo=0;
  var llenartablero=0;
  var na2=[6];
  var na3=[6];
  //var matriz= new Array(6);
  var matriz2= new Array();
  var stopd=0;
  var ev=[];
  
/*-----------------------------
// cambio entre dos colores indefinidamente
------------------------------*/
  th1();

  function th1(){
    $('.main-titulo').animate({color: '#DCFF0E'}, 1000, function(){
      $('.main-titulo').animate({color: '#989494'}, 1000, function(){
        th1();
      });
    });
  }

/*---------------------------
//iniciar el juego
----------------------------*/
  $(".btn-reinicio").on("click", function(){
    clearInterval(tiempo);
    clearInterval(llenartablero);
  $(".panel-score").css("width","25%");
  $(".panel-tablero").show();
  $(".time").show();
    $(this).html("Reiniciar");
    $("#score-text").html(val);
    borrar_contenido(); 
    iniciar_juego();
  })//cierre inicio juego

/*-----------------------------------------------------
                      FUNCIONES
------------------------------------------------------*/

/*------------------------------------------------------
                 borrar contenido anterior              
--------------------------------------------------------*/
  function borrar_contenido(){
    minutos=2;
    segundos=59;
    puntuacion=0;
    movimientos=0;
    columnas=0;
    filas=0;
    val=0;
    valtmp=0;
    clearInterval(tiempo);
    clearInterval(llenartablero);
    $("#score-text").html("0");
    $("#movimientos-text").html("0");
    for(m=1; m<=7; m++){
      $(".col-"+m+"").empty();
    }//cierre for m
  }//cierre función borrar contenido

/*------------------------------------------------------
                   Función Temporizador                 
--------------------------------------------------------*/
  function temporizador(){
    if(minutos!=0){
      if(segundos!=0){
        if(segundos<10){
          $("#timer").html("0"+(minutos-1)+":0"+segundos);
        }else{
          $("#timer").html("0"+(minutos-1)+":"+segundos);
        }
        segundos=segundos-1;
      }else{
        if(segundos<10){
          $("#timer").html("0"+(minutos-1)+":0"+segundos);
        }else{
        $("#timer").html("0"+(minutos-1)+":"+segundos);
        } 
        minutos=minutos-1;
        segundos=59;
      }
    }else{
        clearInterval(tiempo);
        $( ".panel-tablero" ).hide(1000,function(){ 
          terminado(); 
        });
        $( ".time" ).hide();
    }
  }

/*----------------------------------------------------------
   Función tiempo terminado
------------------------------------------------------------*/
  function terminado()
  {
    $( ".panel-score" ).animate({
      width:'100%'
    },2000);
  }

/*--------------------------------------------
        Función Generar Número Aleatorio
----------------------------------------------*/
  function numero_aleatorio(){
    na = (Math.random()*4+1);
    na = (Math.floor(na));
  }//cierre función número aleatorio

/*--------------------------------------------
        Función Iniciar Juego
-----------------------------------------------*/
  function iniciar_juego(){
    tiempo=setInterval(function(){
      temporizador()
    },1000);//valor 1000
    console.log("iniciar juego");
    llenartablero=setInterval(function(){
      llenar_tablero()
    },500)
  }//cierre función iniciar_juego

/*-------------------------------------------------
          Función Llenar Tablero
----------------------------------------------------*/
  function llenar_tablero(){
    if(columnas<=6){
      for(var filas=0;filas<=6;filas++){
        numero_aleatorio();
        $(".col-"+(filas+1)).prepend("<img src='image/"+na+".png' class='elemento'/>").css("justify-content","flex-start");
      }//cierre for filas
    }//cierre if columnas <=6
    if(columnas>6){
      clearInterval(llenartablero);
      verificar();
    }//cierre columnas >6
    columnas++;
  }//cierre función llenar_tablero

/*---------------------------------------------------
        Función verificar
----------------------------------------------------*/
  function verificar(){
    crear_matriz();
    verificar_coincidencias();
    $("#score-text").html(val);
    $("div[class^='col']").css("justify-content","flex-end");

  }

/*------------------------------------------------------
        Función Matriz Columnas
---------------------------------------------------------*/
  function crear_matriz(){
    matriz=[];
    for(i=0; i<=6; i++){
      for(j=0; j<=6; j++){
        na2[j]=$(".col-"+(i+1)).children("img:nth-last-child("+(j+1)+")").attr("src");
      }//cierre for j
    matriz[i]=na2;
    na2=[];
    }//cierre for i
  }// cierre función crear_matriz

/*----------------------------------------------------
        Verificar coincidencias en las filas
-----------------------------------------------------*/
  function verificar_coincidencias(){
    verificar_columnas();
    verificar_filas();
    coincidir();
    
    if(l==1){
        espacios_vacios();
        habilitar_movimientos();
    }else{
        habilitar_movimientos();
    }
    
  }//cierre verificar coincidencias

  function verificar_columnas(){
    for(i=0; i<=6; i++){
      for(j=0; j<=4; j++){
        f1=$(".col-"+(i+1)).children("img:nth-last-child("+(j+1)+")").attr("src");
        f2=$(".col-"+(i+1)).children("img:nth-last-child("+(j+2)+")").attr("src");
        f3=$(".col-"+(i+1)).children("img:nth-last-child("+(j+3)+")").attr("src");
        if(f1==f2){
          if(f1==f3){
            $(".col-"+(i+1)).children("img:nth-last-child("+(j+1)+")").attr("class","elemento repetido");
            $(".col-"+(i+1)).children("img:nth-last-child("+(j+2)+")").attr("class","elemento repetido");
            $(".col-"+(i+1)).children("img:nth-last-child("+(j+3)+")").attr("class","elemento repetido");
            //console.log("columnas si");
          }
        }
      }
    }
  }//cierre verificar columnas

  function verificar_filas(){
    for(i=0; i<=4; i++){
      for(j=0; j<=6; j++){
        f1=$(".col-"+(i+1)).children("img:nth-last-child("+(j+1)+")").attr("src");
        f2=$(".col-"+(i+2)).children("img:nth-last-child("+(j+1)+")").attr("src");
        f3=$(".col-"+(i+3)).children("img:nth-last-child("+(j+1)+")").attr("src");
        if(f1==f2){
          if(f1==f3){
            $(".col-"+(i+1)).children("img:nth-last-child("+(j+1)+")").attr("class","elemento repetido");
            $(".col-"+(i+2)).children("img:nth-last-child("+(j+1)+")").attr("class","elemento repetido");
            $(".col-"+(i+3)).children("img:nth-last-child("+(j+1)+")").attr("class","elemento repetido");
            //console.log("filas si");
          }
        }
          
      }
    }
    
  }//cierre verificar filas

  function coincidir(){
    l=0;
    var p=0;
    for(i=0; i<=6; i++){
      for(j=0; j<=6; j++){
        if($(".col-"+(i+1)).children("img:nth-last-child("+(j+1)+")").attr("class")=="elemento repetido"){
          l=1;
          p++;
          $(".repetido").hide("pulsate",1000,function(){
            valtmp=$(".repetido").length;
            $(".repetido").remove("img");
            val=val+valtmp;
            $("#score-text").html(val)
          })           
        }
      }//cierre for j
      na3[i]=p;
      p=0;
    }//cierre for i
  }//cierre función coincidir


/*-----------------------------------------------
        Función verificar espacios vacios
---------------------------------------------------*/
  function espacios_vacios(){
    var evl=0;
    var e_v=0;
  for(i=0; i<=6; i++){
    for(j=0; j<=6; j++){
      if($(".col-"+(i+1)).children("img:nth-last-child("+(j+1)+")").attr("class")=="elemento repetido"){
        //console.log("espacios vacios");
        evl=evl+1;
        e_v=1;
      }  
      ev[i]=evl;
    }
    evl=0;
  }
  console.log("ev=");
  console.log(e_v);
  if(e_v==0){
      habilitar_movimientos();
    }else{
      stop();
    }


  }


/*----------------------------------------------------
  Función delay
-------------------------------------------------------*/
  function stop(){
    stopd=setInterval(function(){completar_dulces()},1900);
    
  }

/*---------------------------------------------------
      Función llenar espacios vacios
------------------------------------------------------*/

  function completar_dulces(){
    var naf1=0;
    clearInterval(stopd);
    for(i=0; i<=6; i++){
      naf1=7-ev[i];
      for(j=naf1; j<7; j++){
        numero_aleatorio();
        $(".col-"+(i+1)).prepend("<img src='image/"+na+".png' class='elemento'/>").css("justify-content","flex-end");
      }//cierre for j
    }//cierre for i
    verificar_coincidencias();
  }//cierre función completar dulces


/*----------------------------------------------------------------------
     Función habilitar movimientos
----------------------------------------------------------------------*/
  function habilitar_movimientos(){
    console.log("habilitar_movimientos");

    $(".elemento").draggable({
      disabled: false,
      containment: ".panel-tablero",
      revert: true,
      revertDuration: 0,
      start: function(event, ui){
        movimientos=movimientos+1;
        $("#movimientos-text").html(movimientos)
      }
    });

    $(".elemento").droppable({
      drop: function (e, ui) {
        var seleccion = ui.draggable;
        var elemento2 = this;
        //console.log("seleccion=");
        //console.log(seleccion);
        //console.log("elemento2=");
        //console.log(elemento2);
        interc=seleccion.swap($(elemento2));
        
      }
    })
    verificar2();
  }

/*-------------------------------------------------
            Funcion intercambio de dulces
---------------------------------------------------*/
  jQuery.fn.swap = function(elemento2){
    elemento2 = jQuery(elemento2)[0];
    var elemento1 = this[0];
    console.log("elemento1=");
    console.log(elemento1);
    var temporal = elemento1.parentNode.insertBefore(document.createTextNode(''), elemento1);
    elemento2.parentNode.insertBefore(elemento1, elemento2);
    temporal.parentNode.insertBefore(elemento2, temporal);
    temporal.parentNode.removeChild(temporal);
    return this;
  };


  function verificar2(){
    console.log("verificar2");
  }




})//cierre general