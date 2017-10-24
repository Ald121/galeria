angular.module('fotosApp')
  .controller('prodsCtrl', function (userService,categoriaService,$rootScope,tallasService,colorService,alertsService,$scope,productsServices,generalService,toastr,$uibModal) {
    $scope.rolForRoute = 'ADMIN';
    if ($rootScope.user.datos.userType != $scope.rolForRoute) {
      var toast = toastr.error('Acesso denegado', 'Error',{
          closeButton: true,
           timeOut: 2000,
        });
      $location.path('/');
    }
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
          userService.catchError(e);
          // var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
          //   closeButton: true,
          //    timeOut: 2000,
          // });
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
              productsServices.deleteProd({item:item}).then(function(r) {
                if (r) {
                  if (r.data.respuesta == true) {
                    toastr.success(alertsService.alerts.ok.delete, 'Correcto !',{
                      closeButton: true,
                      timeOut: 2000,
                    });
                    $scope.productsList = [];
                    $scope.getProds();
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
          }else{
            $scope.productsList = [];
            $scope.getProds();
          }
        });
      };

      $scope.showAddImages = function (item) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/administration/products/modalAddImageProd.html',
            controller: 'addImageProdCtrl',
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
      // Colores
      $scope.getColors = function () {
        $scope.loading = true;
        colorService.colorList().then(function(r){
          $scope.colorList = r.data.list;
          $scope.loading = false;
        }).catch(function(e){
          userService.catchError(e);
          $scope.loading = false;
        });
      };
      // $scope.getColors();

      $scope.getCategorias = function () {
        $scope.loading = true;
        categoriaService.categoriasList().then(function(r){
          $scope.categoriasList = r.data.list;
          $scope.loading = false;
        }).catch(function(e){
          userService.catchError(e);
          $scope.loading = false;
        });
      };
      // $scope.getCategorias();

      $scope.showDeleteColor = function (item) {
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
              productsServices.deleteProd({item:item}).then(function(r) {
                if (r) {
                  if (r.data.respuesta == true) {
                    toastr.success(alertsService.alerts.ok.delete, 'Correcto !',{
                      closeButton: true,
                      timeOut: 2000,
                    });
                    $scope.productsList = [];
                    $scope.getProds();
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

      $scope.showAddColor = function (item) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/administration/colors/modalAddColor.html',
            controller: 'addColorCtrl',
            resolve: {
                  item: function () {
                      return item;
                  }
              }
        });
        modalInstance.result.then(function(r) {
          if (r) {
            if (r.respuesta == 'Y') {
              $scope.getColors();
            }
          }
        });
      };

       $scope.showAddCategoria = function (item) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/administration/categorias/modalAddCategoria.html',
            controller: 'addCategoriaCtrl',
            resolve: {
                  item: function () {
                      return item;
                  }
              }
        });
        modalInstance.result.then(function(r) {
          if (r) {
            if (r.respuesta == 'Y') {
              $scope.getCategorias();
            }
          }
        });
      };

      $scope.showDeleteCategoria = function (item) {
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
              categoriaService.deleteCategoria({id:item.idcategorias}).then(function(r) {
                if (r) {
                  if (r.data.respuesta == true) {
                    toastr.success(alertsService.alerts.ok.delete, 'Correcto !',{
                      closeButton: true,
                      timeOut: 2000,
                    });
                    $scope.categoriasList = [];
                    $scope.getCategorias();
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

      $scope.showDeleteTalla = function (item) {
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
              productsServices.deleteProd({item:item}).then(function(r) {
                if (r) {
                  if (r.data.respuesta == true) {
                    toastr.success(alertsService.alerts.ok.delete, 'Correcto !',{
                      closeButton: true,
                      timeOut: 2000,
                    });
                    $scope.productsList = [];
                    $scope.getProds();
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

      // Tallas
      $scope.getTallas = function () {
        $scope.loading = true;
        tallasService.tallasList().then(function(r){
          $scope.tallasList = r.data.list;
          $scope.loading = false;
        }).catch(function(e){
          userService.catchError(e);
          $scope.loading = false;
        });
      };
      // $scope.getTallas();

      $scope.showAddTalla = function (item) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/administration/tallas/modalAddTalla.html',
            controller: 'addTallaCtrl',
            resolve: {
                  item: function () {
                      return item;
                  }
              }
        });
        modalInstance.result.then(function(r) {
          if (r) {
            if (r.respuesta == 'Y') {
              $scope.getTallas();
            }
          }
        });
      };
      
  });