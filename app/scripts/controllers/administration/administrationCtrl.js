angular.module('fotosApp')
  .controller('administrationCtrl', function (toastr,$location,$localStorage,$scope,$mdSidenav,userService,$rootScope) {
    if (!$rootScope.user) {
      $location.path('/');
    }
    $scope.rolForRoute = ['ADMIN','CLIENTE'];
    var access = $scope.rolForRoute.indexOf($rootScope.user.datos.userType);
    if (access == -1) {
      var toast = toastr.error('Acesso denegado', 'Error',{
          closeButton: true,
           timeOut: 2000,
        });
      $location.path('/');
    }

    $scope.menuAdministration = [
                    {rol:'ADMIN',nombre:'Galeria',icon:'fa-picture-o',link:'/administration/images',child:[]},
    							  {rol:'ADMIN',nombre:'videos',icon:'fa-video-camera',link:'/administration/videos',child:[]},
                    {rol:'ADMIN',nombre:'Productos',icon:'fa-shopping-bag',link:'/administration/products',child:[]},
                    {rol:'ADMIN',nombre:'Pedidos',icon:'fa-archive',link:'/administration/pedidos',child:[]},
                    {rol:'CLIENTE',nombre:'Mis Pedidos',icon:'fa-archive',link:'/client/pedidos',child:[]}
                    // {rol:'ADMIN',nombre:'Slider',icon:'fa-file-image-o',link:'/administration/slider',child:[]}
    							];
    $scope.loading = false;
    $scope.logOut = function(){
      $scope.loading = true;
      userService.salir({token:$rootScope.user.token}).then(function(r){
        if (r.data.respuesta == true) {
          $localStorage.$reset();
          $location.path('/');
          $scope.loading = false;
        }
      }).catch(function(e){
        userService.catchError(e);
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