angular.module('fotosApp')
  .controller('administrationCtrl', function ($location,$localStorage,$scope,$mdSidenav,userService,$rootScope) {
    $scope.menuAdministration = [
    							  {nombre:'Galeria',icon:'fa-picture-o',link:'/administration/images',child:[]},
                    {nombre:'Productos',icon:'fa-shopping-bag',link:'/administration/products',child:[]},
    							  {nombre:'Pedidos',icon:'fa-archive',link:'/administration/pedidos',child:[]}
                    // {nombre:'Slider',icon:'fa-file-image-o',link:'/administration/slider',child:[]}
    							];
    $scope.loading = false;
    if (!$rootScope.user) {
    	$location.path('/');
    }
    $scope.logOut = function(){
      $scope.loading = true;
      userService.salir({token:$rootScope.user.token}).then(function(r){
        if (r.data.respuesta == true) {
          $localStorage.$reset();
          $location.path('/');
          $scope.loading = false;
        }
      }).catch(function(e){
        $scope.saving = false;
        $localStorage.$reset();
        $location.path('/');
        var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
          closeButton: true,
           timeOut: 2000,
        });
      });
    }
  });