var app = angular.module('fotosApp');
  app.factory('alertsService',[
    function () {
    
     var alerts = {
        error :{
            upload:'Ups !! algunos archivos no fueron subidos, Intentalo nuevamente',
            session:'Ups !! Tu sesión ha terminado, Ingresa nuevamente',
            save:'Ups !! No se pudo guardar el registro, Intentalo nuevamente',
            update:'Ups !! No se pudo actualizar el registro, Intentalo nuevamente',
            delete:'Ups !! No se pudo eliminar el registro, Intentalo nuevamente',
            processPedido:'Ups !! No se pudo procesar el pedido, Intentalo nuevamente',
            changeImageDefault:'Ups !! No se pudo cambiar la imagen de vista previa, Intentalo nuevamente'
        },
        ok :{
          upload:'Imagenes subidas correctamente',
          save:'Registro guardado correctamente',
          update:'Registro actualizado correctamente',
          delete:'Registro eliminado correctamente',
          processPedido:'Pedido procesado correctamente',
          changeImageDefault:'Imagen de vista previa cambiada correctamente'
        }
    }

    return ({
      alerts: alerts
    });

    }])