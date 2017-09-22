angular.module('fotosApp').factory('carService',['$q', '$timeout', '$http',
	'generalService','$localStorage','$mdDialog','toastr','$rootScope',
    function ($q, $timeout, $http,generalService,$localStorage,$mdDialog,toastr,$rootScope) {
    
    return ({
      addToCar: addToCar
    });

    function addToCar(itemToAdd) {
      if ($localStorage.car == undefined) {
      	$localStorage.car = {}
      	$localStorage.car.items = [];
      	$localStorage.car.total = 0.00;
      	$localStorage.car.items.push(itemToAdd);
      }else{
      	$localStorage.car.items.push(itemToAdd);
      }
      $rootScope.carList = $localStorage.car;
      var toast = toastr.success('Producto Añadido correctamente', null,{
        closeButton: true,
         timeOut: 2000,
      });
    }

    

     

    }])