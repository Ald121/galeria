angular.module('fotosApp')
  .controller('prodsCtrl', function ($scope,productsServices,generalService,toastr) {

   $scope.getProds = function () {
    $scope.loading = true;
    productsServices.productsList().then(function(r){
          if (r.data.respuesta == true) {
             $scope.loading = false;
             $scope.productsList = r.data.list;
             angular.forEach($scope.productsList,function(value,key){
              	angular.forEach($scope.productsList[key].images,function(image,keyImg){
	              $scope.productsList[key].images[keyImg].image = generalService.pathImgProds() + $scope.productsList[key].images[keyImg].image;
	            	if ($scope.productsList[key].images[keyImg].default == 1) {
	            		$scope.productsList[key].picDefault = $scope.productsList[key].images[keyImg].image;
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

      $scope.getProds();
  });