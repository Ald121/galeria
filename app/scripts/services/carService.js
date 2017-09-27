angular.module('fotosApp').factory('carService',['$q', '$timeout', '$http',
	'generalService','$localStorage','toastr','$rootScope','_',
    function ($q, $timeout, $http,generalService,$localStorage,toastr,$rootScope,_) {
    
    return ({
      addToCar: addToCar,
      updateCantidadCar:updateCantidadCar,
      removeItemCar:removeItemCar,
      viewDetails:viewDetails
    });

    function addToCar(itemToAdd) {
      console.log(itemToAdd);
      if ($localStorage.car == undefined) {
      	$localStorage.car = {}
      	$localStorage.car.items = [];
      	$localStorage.car.total = 0.00;
      }

      var proInCar = _.where($localStorage.car.items,{idproductos:itemToAdd.idproductos});
      if (proInCar.length == 0) {
        itemToAdd.cantidadInCar = 1;
        itemToAdd.totalCu = itemToAdd.cantidadInCar * itemToAdd.precio;
        $localStorage.car.items.push(itemToAdd);
      }else{
        var added = false;
        angular.forEach($localStorage.car.items,function(value,key){
          if (value.idproductos == itemToAdd.idproductos) {
            if ($localStorage.car.items[key].cantidadInCar < itemToAdd.stock) {
                added = true;
                itemToAdd.cantidadInCar = parseInt(value.cantidadInCar) + 1;
                itemToAdd.totalCu = parseInt(value.cantidadInCar) * value.precio;
                $localStorage.car.items[key] = itemToAdd;
            }
            return true;
          }
        });
      }
      calTotalInCar($localStorage.car.items);
      $rootScope.carList = $localStorage.car;

      if (added) {
        var toast = toastr.success('Producto Añadido correctamente', null,{
          closeButton: true,
           timeOut: 2000,
        });
      }else{
        var toast = toastr.error('stock no disponible', null,{
          closeButton: true,
           timeOut: 2000,
        });
      }
      
    }

    function updateCantidadCar(index,item){
      if (item.cantidadInCar == null) {
        item.cantidadInCar = 1;
      }
      if (item.cantidadInCar > item.stock) {
        item.cantidadInCar = item.stock;
      }
      $localStorage.car.items[index].totalCu = (parseInt(item.cantidadInCar) * item.precio).toFixed(2);
      calTotalInCar($localStorage.car.items);
      $rootScope.carList = $localStorage.car;
    }

    function removeItemCar(index){
      $localStorage.car.items.splice(index,1);
      calTotalInCar($localStorage.car.items);
      $rootScope.carList = $localStorage.car;
    }

    function calTotalInCar(array){
      var sum = 0;
      angular.forEach(array,function(value){
        sum = sum + value.totalCu;
      });
      $localStorage.car.total = sum.toFixed(2);
    }

    function viewDetails(ev,item,mdDialog){
      mdDialog.show({
        controller: modalDetailsController,
        templateUrl: 'views/commonModals/modalDetails.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: true,
        locals:{
          prod:item
        }
      });
    }

     function modalDetailsController(carService,prod,$scope,$localStorage,$mdDialog,userService,$location){
        console.log(prod);
        $scope.saving = false;
        $scope.prodSelected = prod;
        $scope.images = [];
        angular.forEach($scope.prodSelected.images,function(image,keyImg){
          $scope.prodSelected.images[keyImg].image = generalService.pathImgProds() + $scope.prodSelected.images[keyImg].url;
          var img = {
            thumb:$scope.prodSelected.images[keyImg].image,
            large:$scope.prodSelected.images[keyImg].image,
            medium:$scope.prodSelected.images[keyImg].image
          }
          $scope.images.push(img);
          if ($scope.prodSelected.images[keyImg].default == 1) {
                $scope.prodSelected.picDefault = $scope.prodSelected.images[keyImg].image;
          }
        });

        $scope.zoomOptions1 = {
            defaultImage        : 0,
            style               : 'box',
            boxPos              : 'right-top',
            boxW                : 400,
            boxH                : 400,
            method              : 'lens',
            cursor              : 'crosshair',
            lens                : true,
            zoomLevel           : 3,
            immersiveMode       : '769',
            immersiveModeOptions: {
            },
            prevThumbButton     : '&#9665;',
            nextThumbButton     : '&#9655;',
            thumbsPos           : 'top',
            thumbCol            : 4,
            thumbColPadding     : 4,
            images              : $scope.images
        };

        $scope.cancel = function(){
          $mdDialog.hide();
        }
        $scope.addToCar = function(item){
          carService.addToCar(item);
        }
      }

    }])