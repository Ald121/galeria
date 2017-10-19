angular.module('fotosApp')
  .controller('clientAdministrationCtrl', function ($rootScope,alertsService,$uibModal,bancosServices,$mdDialog,toastr,$location,$localStorage,$scope,$mdSidenav,pedidosServices,$rootScope) {
    $scope.rolForRoute = 'CLIENTE';
    if (!$rootScope.user) {
      var toast = toastr.error(alertsService.alerts.error.session, 'Error',{
          closeButton: true,
           timeOut: 2000,
        });
      $location.path('/');
    }
    if ($rootScope.user.datos.userType != $scope.rolForRoute) {
      var toast = toastr.error('Acesso denegado', 'Error',{
          closeButton: true,
           timeOut: 2000,
        });
      $location.path('/');
    }

    $scope.menuAdministration = [
                    {rol:'CLIENTE',nombre:'Mis Pedidos',icon:'fa-archive',link:'/client/pedidos',child:[]}
                  ];
    
  });