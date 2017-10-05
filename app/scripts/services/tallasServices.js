angular.module('fotosApp').factory('tallasService',['$q', '$timeout', '$http','generalService','$localStorage',
    function ($q, $timeout, $http,generalService,$localStorage) {
    
    return ({
      tallasList: tallasList,
      addTalla:addTalla
    });

    function tallasList(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'tallasList', dataSend);
    }

    function addTalla(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'addTalla', dataSend);
    }

    }])