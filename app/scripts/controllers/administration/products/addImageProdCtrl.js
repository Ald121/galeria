angular.module('fotosApp')
  .controller('addImageProdCtrl', function (imageServices,$rootScope,alertsService,$localStorage,$scope,item,$uibModalInstance,toastr,FileUploader,generalService) {
    $scope.rolForRoute = 'ADMIN';
    if ($rootScope.user.datos.userType != $scope.rolForRoute) {
      var toast = toastr.error('Acesso denegado', 'Error',{
          closeButton: true,
           timeOut: 2000,
        });
      $location.path('/');
    }

    if (item) {
      $scope.itemBackUp = angular.copy(item);
      $scope.item = item;
      angular.forEach($scope.item.images,function(image,keyImg){
          $scope.item.images[keyImg].image = generalService.pathImgProds() + $scope.item.images[keyImg].url;
        });
    }

    $scope.loading = false;
    $scope.uploader = new FileUploader({
        url: generalService.dir() + 'addImgProduct'
    });

    $scope.uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    $scope.deleteArray = [];
    $scope.deleteArrayToSend = [];
    $scope.removeImage = function(index,item){
      $scope.deleting = true;
      imageServices.deleteImg({img:item.url,idImage:item.idproductos_imagenes}).then(function(r){
        if (r.data.respuesta) {
            $scope.item.images.splice(index,1);
            toastr.success(alertsService.alerts.ok.delete, 'Correcto !',{
            closeButton: true,
            timeOut: 2000,
          });
            $scope.deleting = false;
        }else{
          toastr.success(alertsService.alerts.error.delete, 'Correcto !',{
            closeButton: true,
            timeOut: 2000,
          });
          $scope.deleting = false;
        }
      }).catch(function(e){
        toastr.success(alertsService.alerts.error.delete, 'Correcto !',{
          closeButton: true,
          timeOut: 2000,
        });
        $scope.deleting = false;
      });
    }

    $scope.uploader.onBeforeUploadItem = function(item) {
        formData = [{
            token: $localStorage.user.token,
            idProd: $scope.item.idproductos,
            default: item.default
        }];
        Array.prototype.push.apply(item.formData, formData);
    };

    $scope.uploader.onAfterAddingFile = function(item) {
          item.default = 0;
    };

    $scope.uploader.onCompleteAll = function() {
        var allCompleted = true;
        angular.forEach($scope.uploader.queue,function(value,key){
            if (value.progress == 0) {
                allCompleted = false;
            }
        });
        if (allCompleted) {
            toastr.success(alertsService.alerts.ok.save, 'Correcto !',{
              closeButton: true,
              timeOut: 2000,
            });
            var result = {respuesta:'Y'};
            $uibModalInstance.close(result);
            $scope.loading = false;
        }else{
             $scope.loading = false;
            toastr.error(alertsService.alerts.error.upload, 'Error !',{
              closeButton: true,
              timeOut: 2000,
            });
        }
    };

    $scope.save = function() {
      $scope.uploading = true;
      $scope.uploader.uploadAll();
    }

    $scope.close = function() {
        $uibModalInstance.close();
    }

    $scope.setDefault = function (index) {
        angular.forEach($scope.uploader.queue,function(value,key){
          if (key == index) {
            $scope.uploader.queue[index].default = 1;
          }else{
            $scope.uploader.queue[key].default = 0;
          }
        });
    };

  });

  