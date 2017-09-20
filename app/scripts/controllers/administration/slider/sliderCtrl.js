angular.module('fotosApp')
  .controller('sliderCtrl', function ($scope,Lightbox,$uibModal,imageServices,generalService,toastr) {
    $scope.slides = [];
      
    $scope.getImgs = function () {
         $scope.loading = true;
        imageServices.imageList().then(function(r){
          if (r.data.respuesta == true) {
             $scope.loading = false;
             $scope.slides = r.data.list;
             angular.forEach($scope.slides,function(value,key){
              $scope.slides[key].url = generalService.dir() + $scope.slides[key].src
             });
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
      };

      $scope.getImgs();

      $scope.addImage = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/administration/images/modalAddImg.html',
            controller: 'addImageCtrl',
        });
        modalInstance.result.then(function(result) {
          $scope.slides = [];
          $scope.getImgs();
        });
      };

      $scope.showImage = function (index) {
        Lightbox.openModal($scope.slides,index);
      };

      $scope.showDelete = function (item) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/commonModals/modalDelete.html',
            controller: 'commonDeleteCtrl',
            resolve: {
                  item: function () {
                      return item;
                  }
              }
        });
        modalInstance.result.then(function(result) {
          if (result) {
            if (result == 'Y') {
              imageServices.deleteImg({id:item.idpictures,img:item.src}).then(function(r){
                if (r.data.respuesta == true) {
                   var indexObj = $scope.slides.indexOf(item);
                   $scope.slides = [];
                   $scope.getImgs();
                }else{
                  var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
                  closeButton: true,
                   timeOut: 2000,
                });
                $scope.loading = false;
                }
              }).catch(function(e){
                console.log(e);
                var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
                  closeButton: true,
                   timeOut: 2000,
                });
                $scope.loading = false;
              });
            }
          }
        });
      };

    $scope.openLightboxModal = function (index) {
      Lightbox.openModal($scope.slides,index);
    };
    
  });

  