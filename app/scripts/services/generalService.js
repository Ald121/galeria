var app = angular.module('fotosApp');
  app.factory('generalService',[
    function () {
    
    return ({
      dir: dir,
      pathImgProds:pathImgProds,
      pathImgGaleria:pathImgGaleria
    });

    function dir () {
        return 'http://localhost/galeriaWs/public/';
    }


    function pathImgProds () {
        return dir() + 'products/';
    }

    function pathImgGaleria () {
        return dir() + 'galeria/';
    }

    }])