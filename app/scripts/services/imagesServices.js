angular.module('fotosApp').factory('imageServices',['$q', '$timeout', '$http','generalService',
    function ($q, $timeout, $http,generalService) {
    
    return ({
      imageList: imageList
    });

    function imageList(dataSend) {
       return $http.post(generalService.dir() + 'imagesList', dataSend);
    }

    }])