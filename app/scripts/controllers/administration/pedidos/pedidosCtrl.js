angular.module('fotosApp')
  .controller('pedidosCtrl', function ($rootScope,alertsService,$uibModal,bancosServices,$mdDialog,toastr,$location,$localStorage,$scope,$mdSidenav,pedidosServices,$rootScope) {
    $scope.rolForRoute = 'ADMIN';
    if ($rootScope.user.datos.userType != $scope.rolForRoute) {
      var toast = toastr.error('Acesso denegado', 'Error',{
          closeButton: true,
           timeOut: 2000,
        });
      $location.path('/');
    }
    $scope.getPedidos = function () {
    $scope.loading = true;
	    pedidosServices.pedidosList().then(function(r){
	          if (r.data.respuesta == true) {
	             $scope.loading = false;
	             $scope.pedidosList = r.data.list.data;
	          }else{
	            var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
	            closeButton: true,
	             timeOut: 2000,
	          });
	          $scope.loading = false;
	          }
	        }).catch(function(e){
	          var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
	            closeButton: true,
	             timeOut: 2000,
	          });
	          $scope.loading = false;
	        });
      };

      $scope.viewDetails = function (ev,pedido) {
	    $mdDialog.show({
	        controller: modalDetailsController,
	        templateUrl: 'views/administration/pedidos/modalDetails.html',
	        parent: angular.element(document.body),
	        targetEvent: ev,
	        clickOutsideToClose:true,
	        fullscreen: true,
	        locals:{
	        	pedido:pedido
	        }
	     });
      };

      $scope.getPedidos();

      var modalDetailsController = function(generalService,pedido,$scope,$localStorage,$mdDialog,userService,$location){
	      $scope.pedido = pedido;
	       angular.forEach($scope.pedido.detalles,function(value){
	            value.image = generalService.pathImgProds() + value.image;
           });
	      $scope.cancel = function(){
	        $mdDialog.hide();
	      }
	    } 
	// BANCOS
	$scope.getBancos = function () {
    	$scope.loading = true;
	    bancosServices.bancosList().then(function(r){
          if (r.data.respuesta == true) {
             $scope.loading = false;
             $scope.bancosList = r.data.list;
          }else{
            var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
            closeButton: true,
             timeOut: 2000,
          });
          $scope.loading = false;
          }
        }).catch(function(e){
          var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
            closeButton: true,
             timeOut: 2000,
          });
          $scope.loading = false;
        });
    };

	$scope.addBanco = function (item) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/administration/bancos/modalAddBanco.html',
            controller: 'addBancoCtrl',
            resolve: {
                  item: function () {
                      return item;
                  }
              }
        });
        modalInstance.result.then(function(r) {
          if (r) {
            if (r.respuesta == 'Y') {
              $scope.bancosList = [];
              $scope.getBancos();
            }
          }
        });
    };

    $scope.showDelete = function (item) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/commonModals/modalDelete.html',
            controller: 'commonDeleteCtrl',
            resolve: {
                  item: function () {
                      return item;
                  }
              }
        });
        modalInstance.result.then(function(result) {
          if (result) {
            if (result == 'Y') {
              bancosServices.deleteBanco({id:item.idbancos}).then(function(r) {
                if (r) {
                  if (r.data.respuesta == true) {
                    toastr.success(alertsService.alerts.ok.delete, 'Correcto !',{
                      closeButton: true,
                      timeOut: 2000,
                    });
                    $scope.bancosList = [];
              		$scope.getBancos();
                  }
                }
              }).catch(function(e){
                toastr.error(alertsService.alerts.error.delete, 'Error !',{
                    closeButton: true,
                    timeOut: 2000,
                });
              });
            }
          }
        });
      };

    $scope.showChangeStatus = function(item){
      var modalInstance = $uibModal.open({
            templateUrl: 'views/commonModals/modalOkPedido.html',
            controller: 'commonDeleteCtrl',
            resolve: {
                  item: function () {
                      return item;
                  }
              }
        });
        modalInstance.result.then(function(result) {
          if (result) {
            if (result == 'Y') {
              pedidosServices.procesPedido({id:item.idpedidos}).then(function(r) {
                if (r) {
                  if (r.data.respuesta == true) {
                    toastr.success(alertsService.alerts.ok.processPedido, 'Correcto !',{
                      closeButton: true,
                      timeOut: 2000,
                    });
                    $scope.pedidosList = [];
                    $scope.getPedidos();
                  }
                }
              }).catch(function(e){
                toastr.error(alertsService.alerts.error.processPedido, 'Error !',{
                    closeButton: true,
                    timeOut: 2000,
                });
              });
            }
          }
        });
    }

	// FIN BANCOS
  });