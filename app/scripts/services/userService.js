var app = angular.module('fotosApp');
  app.factory('userService',['$q', '$timeout', '$http','generalService',
    function ($q, $timeout, $http,generalService) {
    
    return ({
      ingresar: ingresar,
      registrar:registrar,
      activar:activar
    });

    function ingresar(dataSend) {
       return $http.post(generalService.dir() + 'acceso', dataSend);
    }

    function registrar(dataSend) {
       return $http.post(generalService.dir() + 'registrar', dataSend);
    }

    function activar(dataSend) {
       return $http.post(generalService.dir() + 'activar', dataSend);
    }

    }])