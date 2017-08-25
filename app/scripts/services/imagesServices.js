angular.module('fotosApp').factory('imageServices',['$q', '$timeout', '$http','generalService','$localStorage',
    function ($q, $timeout, $http,generalService,$localStorage) {
    
    return ({
      imageList: imageList,
      deleteImg:deleteImg
    });

    function imageList(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'imagesList', dataSend);
    }

    function deleteImg(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'deleteImg', dataSend);
    }

    }])