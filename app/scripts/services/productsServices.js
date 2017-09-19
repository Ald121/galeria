angular.module('fotosApp').factory('productsServices',['$q', '$timeout', '$http','generalService','$localStorage',
    function ($q, $timeout, $http,generalService,$localStorage) {
    
    return ({
      productsList: productsList,
      deleteProd:deleteProd,
      addProd:addProd,
      prodDetails:prodDetails
    });

    function productsList(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'productsList', dataSend);
    }

    function addProd(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'addProduct', dataSend);
    }

    function deleteProd(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'deleteProd', dataSend);
    }

    function prodDetails(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'prodDetails', dataSend);
    }

    }])