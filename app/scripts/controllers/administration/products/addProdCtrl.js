angular.module('fotosApp')
  .controller('addProdCtrl', function (tallasService,colorService,alertsService,$localStorage,$scope,item,$uibModalInstance,toastr,FileUploader,generalService,productsServices) {

    if (item) {
      $scope.item = item;
    }else{
      $scope.item = {};
      $scope.item.inSlider = 0;
      $scope.item.destacar = 0;
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

    $scope.getColors = function () {
        colorService.colorList().then(function(r){
          $scope.colorList = r.data.list;
        }).catch(function(e){

        });
    };
    $scope.getColors(); 

    $scope.getTallas = function () {
        tallasService.tallasList().then(function(r){
          $scope.tallasList = r.data.list;
        }).catch(function(e){

        });
    };
    $scope.getTallas();

    $scope.uploader.onBeforeUploadItem = function(item) {
        formData = [{
            token: $localStorage.user.token,
            idProd: $scope.item.id,
            default: item.default
        }];
        Array.prototype.push.apply(item.formData, formData);
    };

    $scope.uploader.onAfterAddingFile = function(item) {
        if ($scope.uploader.queue.length == 1) {
          item.default = 1;
        }else{
          item.default = 0;
        }
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
            var result = {respuesta:'Y',data:$scope.item};
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
      $scope.loading = true;
        $scope.item.token = $localStorage.user.token;
        productsServices.addProd($scope.item).then(function(r){
          $scope.item = r.data.row;
          $scope.uploader.uploadAll();
        }).catch(function(e){
          $scope.loading = false;
          toastr.error(alertsService.alerts.error.save, 'Error !',{
              closeButton: true,
              timeOut: 2000,
          });
        });
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

  