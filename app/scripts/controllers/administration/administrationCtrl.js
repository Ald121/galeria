angular.module('fotosApp')
  .controller('administrationCtrl', function ($scope,$mdSidenav) {
    $scope.menuAdministration = [
    							  {nombre:'Galeria',icon:'fa-picture-o',link:'/administration/images'
    							  ,child:[]}
    							];
  });