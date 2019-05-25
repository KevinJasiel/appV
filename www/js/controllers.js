angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };

  $(document).ready(function(){
  
var checkArray = []; // para verificar si las dos cartas con click son el mismo personaje
var idArray = []; //array para guardar los ids de las cartas que tienen click 
var contador = 0;
var fin = 0; 
var fields = document.querySelectorAll(".atras");


var images = [
"http://download.seaicons.com/icons/bingxueling/fruit-vegetables/256/apple-green-icon.png",
"http://download.seaicons.com/icons/bingxueling/fruit-vegetables/256/apple-green-icon.png",
"https://image.flaticon.com/icons/png/512/415/415767.png",
"https://image.flaticon.com/icons/png/512/415/415767.png",
"https://img.icons8.com/cotton/420/grape.png",
"https://img.icons8.com/cotton/420/grape.png",
"https://images.vexels.com/media/users/3/143081/isolated/preview/3774968d85982132a3c5acb552bd8efd-icono-plano-de-color-zanahoria-by-vexels.png",
"https://images.vexels.com/media/users/3/143081/isolated/preview/3774968d85982132a3c5acb552bd8efd-icono-plano-de-color-zanahoria-by-vexels.png",
"https://images.vexels.com/media/users/3/143051/isolated/preview/7c640e541176de78cabefc799ad3efac-apple-color-stroke-icon-by-vexels.png",
"https://images.vexels.com/media/users/3/143051/isolated/preview/7c640e541176de78cabefc799ad3efac-apple-color-stroke-icon-by-vexels.png",
"https://cdn.pixabay.com/photo/2017/01/31/21/56/food-2027563_960_720.png",
"https://cdn.pixabay.com/photo/2017/01/31/21/56/food-2027563_960_720.png",
"https://png.pngtree.com/element_our/md/20180428/md_5ae40bb0675f8.png",
"https://png.pngtree.com/element_our/md/20180428/md_5ae40bb0675f8.png",
"https://s3.amazonaws.com/peoplepng/wp-content/uploads/2018/06/05092405/Clipart-banana-png-image-1024x660.png",
"https://s3.amazonaws.com/peoplepng/wp-content/uploads/2018/06/05092405/Clipart-banana-png-image-1024x660.png",
"http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c19b.png",
"http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c19b.png"
];
// verificacion de los clicks
function clicked() { 
  if ($(this).find(".inner-wrap").hasClass("flipped")) {
    return;
  }
  $(this).find(".inner-wrap").toggleClass("flipped");
  checkArray.push($(this).find("img").attr("src"));
  idArray.push($(this).attr("id"));
  check();
}

$(".carta").on("click", clicked);
  
//reiniciar el juego
function reiniciar() {
  $(".atras").find("img").remove(); //quitar todas las imagenes actuales
  $(".carta .inner-wrap").removeClass("flipped"); // quitar la classe flipped para volver a su estado inicial
  checkArray = []; 
  idArray = [];
  contador = 0; 
  fin = 0;
  iniciarJuego();
}
//para verificar el fin del juego
function verificarFin() {
  if (fin === 18) { //si todas las cartas estan volteadas
    alert("Juego finalizado, lo has logrado en " + contador + " intentos");
    reiniciar();
  }
}
//para random de las imagenes 
function shuffleArray(array) { 
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function iniciarJuego() {

  

  var arr = shuffleArray(images); //array con las imagenes de forma aleatoria
 // append de las imagenes a la clase para la parte de atras de las cartas
  for (var i = 0; i < fields.length; i++) {
    var img = document.createElement("img");
    img.src = arr[i];
    fields[i].appendChild(img);
  }


}

function check() {
  //si los fields se  han hecho dos clicks 
  if (checkArray.length === 2) {
    $(".carta").off("click", clicked); 
    setTimeout(function(){
      //si no hay match
      if (checkArray[0] !== checkArray[1]) { 
        //voltear las dos cartas seleccionadas
        $("#" + idArray[0]).find(".inner-wrap").removeClass("flipped"); 
        $("#" + idArray[1]).find(".inner-wrap").removeClass("flipped"); 
        contador++;
        //vaciar los arrays para la siguiente eleccion
        checkArray = []; 
        idArray = []; 
        //habilitar el click de nuevo
        $(".carta").on("click", clicked);
      } else {

        contador++;
        
        fin += 2; // contador para el final del juego, se agregan dos para el contador de fin
        //vaciar los dos arrays
        checkArray = []; 
        idArray = []; 
        verificarFin(); 
        $(".carta").on("click", clicked); 
      }
      document.querySelector(".counter").innerHTML = contador;
    }, 800);  
  }
}



iniciarJuego();

});
  
});
