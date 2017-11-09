angular.module('fotosApp').factory('imageServices',['$q', '$timeout', '$http','generalService','$localStorage',
    function ($q, $timeout, $http,generalService,$localStorage) {
    
    return ({
      imageList: imageList,
      deleteImg:deleteImg,
      imagesListByCat:imagesListByCat,
      deleteImgProd:deleteImgProd,
      setPreviewProdImage:setPreviewProdImage
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

    function imagesListByCat(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'imagesListByCat', dataSend);
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

    function deleteImgProd(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'deleteImgProd', dataSend);
    }

    function setPreviewProdImage(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'setPreviewProdImage', dataSend);
    }

    }])