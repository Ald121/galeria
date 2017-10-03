angular.module('fotosApp')
  .controller('pedidosCtrl', function (toastr,$location,$localStorage,$scope,$mdSidenav,pedidosServices,$rootScope) {
    console.log('pedidos');
    $scope.getPedidos = function () {
    $scope.loading = true;
	    pedidosServices.pedidosList().then(function(r){
	          if (r.data.respuesta == true) {
	             $scope.loading = false;
	             $scope.pedidosList = r.data.data;
	             angular.forEach($scope.pedidosList,function(value,key){
	              	angular.forEach($scope.pedidosList[key].images,function(image,keyImg){
		              $scope.pedidosList[key].images[keyImg].image = generalService.pathImgProds() + $scope.pedidosList[key].images[keyImg].url;
	                if ($scope.pedidosList[key].images[keyImg].default == 1) {
		            		$scope.pedidosList[key].picDefault = $scope.pedidosList[key].images[keyImg].image;
		            	}
		            });
	             });
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

      $scope.getPedidos();
  });