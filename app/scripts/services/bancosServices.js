angular.module('fotosApp').factory('bancosServices',['$q', '$timeout', '$http','generalService','$localStorage',
    function ($q, $timeout, $http,generalService,$localStorage) {
    
    return ({
      bancosList: bancosList,
      deleteBanco:deleteBanco,
      addBanco:addBanco,
      updateBanco:updateBanco
    });

    function bancosList(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'bancosList', dataSend);
    }

    function addBanco(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
        dataSend.user = $localStorage.user.datos.id;
      }
       return $http.post(generalService.dir() + 'addBanco', dataSend);
    }

    function updateBanco(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
        dataSend.user = $localStorage.user.datos.id;
      }
       return $http.post(generalService.dir() + 'updateBanco', dataSend);
    }

    function deleteBanco(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'deleteBanco', dataSend);
    }
    }])