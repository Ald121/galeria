var app = angular.module('fotosApp');
  app.factory('userService',['$q', '$timeout', '$http','generalService',
    function ($q, $timeout, $http,generalService) {
    
    return ({
      ingresar: ingresar
    });

    function ingresar(dataSend) {
       return $http.post(generalService.dir() + 'acceso', dataSend);
    }

    }])