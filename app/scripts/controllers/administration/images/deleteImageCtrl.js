angular.module('fotosApp')
  .controller('deleteImageCtrl', function ($scope,Lightbox,item,imageServices,$uibModalInstance,toastr,alertsService) {

    $scope.close = function() {
        $uibModalInstance.close();
    }

    $scope.deleteImage = function(){
      imageServices.deleteImg({id:item.idpictures,img:item.src}).then(function(r){
          if (r.data.respuesta == true) {
             $uibModalInstance.close();
          }else{
            var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
            closeButton: true,
             timeOut: 2000,
          });
          $scope.loading = false;
          }
        }).catch(function(e){
          var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
            closeButton: true,
             timeOut: 2000,
          });
          $scope.loading = false;
        });
    }
  });

  