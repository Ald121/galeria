angular.module('fotosApp')
  .controller('addBancoCtrl', function (alertsService,$localStorage,$scope,item,$uibModalInstance,toastr,FileUploader,generalService,bancosServices) {

    if (item) {
      $scope.item = item;
    }else{
      $scope.item = {};
      $scope.item.inSlider = 0;
      $scope.item.destacar = 0;
    }
    $scope.loading = false;
    $scope.tipoList = [{nombre:'AHORROS'},{nombre:'CORRIENTE'}];

    $scope.save = function() {
      if (typeof item == 'undefined') {
        $scope.loading = true;
        $scope.item.token = $localStorage.user.token;
        bancosServices.addBanco($scope.item).then(function(r){
          $scope.item = r.data.row;
          toastr.success(alertsService.alerts.ok.save, 'Correcto !',{
              closeButton: true,
              timeOut: 2000,
          });
          var result = {respuesta:'Y',data:$scope.item};
          $uibModalInstance.close(result);
        }).catch(function(e){
          $scope.loading = false;
          toastr.error(alertsService.alerts.error.save, 'Error !',{
              closeButton: true,
              timeOut: 2000,
          });
        });
      }else{
        $scope.loading = true;
        $scope.item.token = $localStorage.user.token;
        bancosServices.updateBanco($scope.item).then(function(r){
          $scope.item = r.data.row;
          toastr.success(alertsService.alerts.ok.update, 'Correcto !',{
              closeButton: true,
              timeOut: 2000,
          });
          var result = {respuesta:'Y',data:$scope.item};
          $uibModalInstance.close(result);
        }).catch(function(e){
          $scope.loading = false;
          toastr.error(alertsService.alerts.error.update, 'Error !',{
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

  