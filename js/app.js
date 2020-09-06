$(document).ready(function()
{

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
}
)
