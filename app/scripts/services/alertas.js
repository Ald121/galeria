var app = angular.module('fotosApp');
  app.factory('alertsService',[
    function () {
    
     var alerts = {
        error :{
            upload:'Ups ! algunos archivos no fueron subidos, Intentalo nuevamente'
        },
        ok :{
          upload:'Imagenes subidas correctamente'
        }
    }

    return ({
      alerts: alerts
    });

    }])