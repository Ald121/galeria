angular.module('fotosApp').factory('categoriaService',['$q', '$timeout', '$http','generalService','$localStorage',
    function ($q, $timeout, $http,generalService,$localStorage) {
    
    return ({
      categoriasList: categoriasList,
      deleteCategoria:deleteCategoria,
      addCategoria:addCategoria,
      updateCategoria:updateCategoria
    });

    function categoriasList(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'categoriasList', dataSend);
    }

    function addCategoria(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
        dataSend.user = $localStorage.user.datos.id;
      }
       return $http.post(generalService.dir() + 'addCategoria', dataSend);
    }

    function updateCategoria(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
        dataSend.user = $localStorage.user.datos.id;
      }
       return $http.post(generalService.dir() + 'updateCategoria', dataSend);
    }

    function deleteCategoria(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'deleteCategoria', dataSend);
    }
    }])