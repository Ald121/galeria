angular.module('fotosApp').factory('carService',['$q', '$timeout', '$http',
	'generalService','$localStorage','$mdDialog','toastr','$rootScope','_',
    function ($q, $timeout, $http,generalService,$localStorage,$mdDialog,toastr,$rootScope,_) {
    
    return ({
      addToCar: addToCar,
      updateCantidadCar:updateCantidadCar
    });

    function addToCar(itemToAdd) {
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
        angular.forEach($localStorage.car.items,function(value,key){
          if (value.idproductos == itemToAdd.idproductos) {
            itemToAdd.cantidadInCar = parseInt(value.cantidadInCar) + 1;
            itemToAdd.totalCu = parseInt(value.cantidadInCar) * value.precio;
            $localStorage.car.items[key] = itemToAdd;
          }
        });
      }
      var totalInCar = calTotalInCar($localStorage.car.items);
      $localStorage.car.total = totalInCar;
      $rootScope.carList = $localStorage.car;

      var toast = toastr.success('Producto Añadido correctamente', null,{
        closeButton: true,
         timeOut: 2000,
      });
    }

    function updateCantidadCar(index,item){
      console.log(index);
      console.log(item);
      $localStorage.car.items[index].totalCu = parseInt(item.cantidadInCar) * item.precio;
      $rootScope.carList = $localStorage.car;
    }

    function calTotalInCar(array){
      var sum = 0;
      angular.forEach(array,function(value){
        sum = sum + value.totalCu;
      });
      return sum;
    }

    

     

    }])