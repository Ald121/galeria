var app = angular.module('fotosApp');
  app.factory('userService',['$q', '$timeout', '$http','generalService','$localStorage',
    function ($q, $timeout, $http,generalService,$localStorage) {
    
    return ({
      ingresar: ingresar,
      registrar:registrar,
      activar:activar,
      salir:salir,
      checkSession:checkSession
    });
    function ingresar(dataSend) {
       if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'acceso', dataSend);
    }

    function registrar(dataSend) {
       if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'registrar', dataSend);
    }

    function activar(dataSend) {
       if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'activar', dataSend);
    }

    function salir(dataSend) {
       if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'salir', dataSend);
    }

    function checkSession(dataSend){
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
      return $http.post(generalService.dir() + 'checkSession', dataSend);
    }

    }])