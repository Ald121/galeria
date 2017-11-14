angular.module('fotosApp').factory('imageServices',['$q', '$timeout', '$http','generalService','$localStorage',
    function ($q, $timeout, $http,generalService,$localStorage) {
    
    return ({
      imageList: imageList,
      deleteImg:deleteImg,
      imagesListByCat:imagesListByCat,
      deleteImgProd:deleteImgProd,
      setPreviewProdImage:setPreviewProdImage,
      videoList:videoList,
      saveVideo:saveVideo
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

    function videoList(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'videoList', dataSend);
    }

    function saveVideo(dataSend) {
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'addVideo', dataSend);
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