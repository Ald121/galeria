angular.module('fotosApp')
  .controller('pedidosCtrl', function ($mdDialog,toastr,$location,$localStorage,$scope,$mdSidenav,pedidosServices,$rootScope) {
    console.log('pedidos');
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
	        	console.log(e);
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

  });