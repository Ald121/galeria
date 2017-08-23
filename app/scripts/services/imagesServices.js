angular.module('fotosApp').factory('imageServices',['$q', '$timeout', '$http','generalService',
    function ($q, $timeout, $http,generalService) {
    
    return ({
      imageList: imageList,
      deleteImg:deleteImg
    });

    function imageList(dataSend) {
       return $http.post(generalService.dir() + 'imagesList', dataSend);
    }

    function deleteImg(dataSend) {
       return $http.post(generalService.dir() + 'deleteImg', dataSend);
    }

    }])