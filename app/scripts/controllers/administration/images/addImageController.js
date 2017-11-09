angular.module('fotosApp')
  .controller('addImageCtrl', function ($rootScope,$localStorage,$scope,generalService,Lightbox,$uibModalInstance,FileUploader,toastr,alertsService) {
    $scope.uploading = false;
    $scope.rolForRoute = 'ADMIN';
    if ($rootScope.user.datos.userType != $scope.rolForRoute) {
      var toast = toastr.error('Acesso denegado', 'Error',{
          closeButton: true,
           timeOut: 2000,
        });
      $location.path('/');
    }
    $scope.close = function() {
        $uibModalInstance.close();
    }
    $scope.selected = {};
    $scope.categorias = [
                        {nombre:'Corporativas',link:'/fotografia/Corporativas',icon:'fa-picture-o',child:[]},
                        {nombre:'Bodas',link:'/fotografia/Bodas',icon:'fa-picture-o',child:[]},
                        {nombre:'Retratos',link:'/fotografia/Retratos',icon:'fa-picture-o',child:[]},
                        {nombre:'Fashion',link:'/fotografia/Fashion',icon:'fa-picture-o',child:[]},
                        {nombre:'Editorial',link:'/fotografia/Editorial',icon:'fa-picture-o',child:[]}
                        ];
    $scope.uploader = new FileUploader({
        url: generalService.dir() + 'uploadFiles'
    });

    $scope.uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    $scope.uploader.onBeforeUploadItem = function(item) {
        formData = [{
            token: $localStorage.user.token,
            cat:$scope.selected.category.nombre
        }];
        Array.prototype.push.apply(item.formData, formData);
    };

    $scope.uploader.onCompleteAll = function() {
        var allCompleted = true;
        angular.forEach($scope.uploader.queue,function(value,key){
            if (value.progress == 0) {
                allCompleted = false;
            }
        });
        if (allCompleted) {
            toastr.success(alertsService.alerts.ok.upload, 'Correcto !',{
              closeButton: true,
              timeOut: 2000,
            });
            $uibModalInstance.close();
        }else{
            toastr.error(alertsService.alerts.error.upload, 'Error !',{
              closeButton: true,
              timeOut: 2000,
            });
        }
    };

    $scope.uploadImage = function(){
        $scope.uploading = true;
       $scope.uploader.uploadAll()
    }
  });

  