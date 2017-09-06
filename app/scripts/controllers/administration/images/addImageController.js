angular.module('fotosApp')
  .controller('addImageCtrl', function ($scope,generalService,Lightbox,$uibModalInstance,FileUploader,toastr,alertsService) {
    $scope.uploading = false;
    $scope.close = function() {
        $uibModalInstance.close();
    }

    var uploader = $scope.uploader = new FileUploader({
            url: generalService.dir() + 'uploadFiles'
        });

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        uploader.onCompleteAll = function() {
            var allCompleted = true;
            angular.forEach(uploader.queue,function(value,key){
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
           uploader.uploadAll()
        }
  });

  