angular.module('fotosApp')
  .controller('addColorCtrl', function (userService,$rootScope,alertsService,$localStorage,$scope,item,$uibModalInstance,toastr,FileUploader,generalService,colorService) {

    $scope.rolForRoute = 'ADMIN';
    if ($rootScope.user.datos.userType != $scope.rolForRoute) {
      var toast = toastr.error('Acesso denegado', 'Error',{
          closeButton: true,
           timeOut: 2000,
        });
      $location.path('/');
    }
    
    if (item) {
      $scope.item = item;
    }else{
      $scope.item = {};
      $scope.item.inSlider = 0;
      $scope.item.destacar = 0;
    }
    $scope.loading = false;

    $scope.save = function() {
      if (typeof item == 'undefined') {
        $scope.loading = true;
        $scope.item.token = $localStorage.user.token;
        colorService.addColor($scope.item).then(function(r){
          $scope.item = r.data.row;
          toastr.success(alertsService.alerts.ok.save, 'Correcto !',{
              closeButton: true,
              timeOut: 2000,
          });
          var result = {respuesta:'Y',data:$scope.item};
          $uibModalInstance.close(result);
        }).catch(function(e){
          userService.catchError(e);
          $scope.loading = false;
          toastr.error(alertsService.alerts.error.save, 'Error !',{
              closeButton: true,
              timeOut: 2000,
          });
        });
      }
      
    }

    $scope.close = function() {
        $uibModalInstance.close();
    }

  });

  