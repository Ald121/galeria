angular.module('fotosApp').factory('sliderService',['$q', '$timeout', '$http','generalService','$localStorage',
    function ($q, $timeout, $http,generalService,$localStorage) {
    
    return ({
      sliderList: sliderList,
      sliderProdDestacados:sliderProdDestacados
    });

    function sliderList(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'sliderList', dataSend);
    }

     function sliderProdDestacados(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'sliderProdDestacados', dataSend);
    }

    }])