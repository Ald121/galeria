angular.module('fotosApp').factory('locationService',['$q', '$timeout', '$http','generalService','$localStorage',
    function ($q, $timeout, $http,generalService,$localStorage) {
    
    return ({
      ciudadesList:ciudadesList,
      provinciasList:provinciasList,
      paisesList:paisesList
    });

    function paisesList(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'getPaises', dataSend);
    }

    function provinciasList(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'getProvincias', dataSend);
    }

    function ciudadesList(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'getCiudades', dataSend);
    }

    }])