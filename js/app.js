$(document).ready(function()
{
//declaro variables
var i= [6];
var j= [6];
var matriz= new Array(6);

/*-----------------------------
// cambio entre dos colores indefinidamente
------------------------------*/
th1();

function th1()
{
  $('.main-titulo').animate({color: '#DCFF0E'}, 1000, function()
  {
    $('.main-titulo').animate({color: '#989494'}, 1000, function()
    {
      th1();
    });
  });
}

/*---------------------------
//iniciar el juego
----------------------------*/
$(".btn-reinicio").on("click", function(){

borrar_contenido();	
llenar_juego();

//borrar contenido anterior
function borrar_contenido(){
for(m=1; m<=7; m++){
$(".col-"+m+"").empty();
}//cierre for m
}//cierre función borrar contenido

function llenar_juego(){
//llenar columnas
for(col=0; col<=6;col++){

numero_aleatorio();

//llenar filas
for(fil=0; fil<=6;fil++){
$(".col-"+(col+1)+"").append("<table><tr><td><img src='image/"+i[fil]+".png' width='75%'></td></tr></table>");
}//cierre for fil

matriz[col]=i;
i=[];

}//cierre for col

//alert(matriz[2][2]); //--ok

}//cierre función

})

/*----------------------------
// Función número aleatorio
------------------------------*/
function numero_aleatorio(){
for(n=0; n<=6;n++){
i[n] = (Math.random()*4+1);
i[n] = (Math.floor(i[n]));
}//cierre for n
}//cierre función número aleatorio

})