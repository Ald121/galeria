angular.module('fotosApp')
  .controller('prodsCtrl', function ($scope,productsServices,generalService,toastr,$uibModal) {

   $scope.getProds = function () {
    $scope.loading = true;
    productsServices.productsList().then(function(r){
          if (r.data.respuesta == true) {
             $scope.loading = false;
             $scope.productsList = r.data.list;
             angular.forEach($scope.productsList,function(value,key){
              	angular.forEach($scope.productsList[key].images,function(image,keyImg){
	              $scope.productsList[key].images[keyImg].image = generalService.pathImgProds() + $scope.productsList[key].images[keyImg].url;
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
              $scope.productsList = [];
              $scope.getProds();
            }
          }
        });
      };

      $scope.showAdd = function (item) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/administration/products/modalAddProd.html',
            controller: 'addProdCtrl',
            resolve: {
                  item: function () {
                      return item;
                  }
              }
        });
        modalInstance.result.then(function(r) {
          if (r) {
            if (r.respuesta == 'Y') {
              $scope.productsList = [];
              $scope.getProds();
            }
          }
        });
      };
  });