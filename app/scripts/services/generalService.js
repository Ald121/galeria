var app = angular.module('fotosApp');
  app.factory('generalService',[
    function () {
    
    return ({
      dir: dir
    });

    function dir () {
        return 'http://localhost/galeriaWS/public/';
    }

    }])