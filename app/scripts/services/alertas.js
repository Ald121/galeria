var app = angular.module('fotosApp');
  app.factory('alertsService',[
    function () {
    
     var alerts = {
        error :{
            upload:'Ups !! algunos archivos no fueron subidos, Intentalo nuevamente',
            save:'Ups !! No se pudo guardar el registro, Intentalo nuevamente',
            delete:'Ups !! No se pudo eliminar el registro, Intentalo nuevamente'
        },
        ok :{
          upload:'Imagenes subidas correctamente',
          save:'Registro guardado correctamente',
          delete:'Registro eliminado correctamente'
        }
    }

    return ({
      alerts: alerts
    });

    }])