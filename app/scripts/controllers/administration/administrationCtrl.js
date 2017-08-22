angular.module('fotosApp')
  .controller('administrationCtrl', function ($scope,$mdSidenav) {
    $scope.menuAdministration = [
    							  {nombre:'Galeria',icon:'fa-picture-o',link:'/imageList'
    							  ,child:[
    							  {nombre:'Subir Imagenes',icon:'fa-plus',link:'/addImage'
    							  ,child:[]},
    							  {nombre:'Imagenes Actuales',icon:'fa-camera-retro',link:'/addImage'
    							  ,child:[]}
    							  ]}
    							];
  });