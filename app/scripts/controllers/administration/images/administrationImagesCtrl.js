angular.module('fotosApp')
  .controller('administrationImagesCtrl', function ($scope,$mdSidenav,Lightbox,$uibModal,imageServices,generalService) {
     $scope.selected = [];
  
      $scope.query = {
        order: 'name',
        limit: 5,
        page: 1
      };
      
      $scope.getImgs = function () {
         $scope.loading = true;
        imageServices.imageList().then(function(r){
          if (r.data.respuesta == true) {
             $scope.loading = false;
             $scope.imgsList = r.data.list;
             angular.forEach($scope.imgsList,function(value,key){
              $scope.imgsList[key].url = generalService.dir() + $scope.imgsList[key].src
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
          $scope.getImgs();
        });
      };

      $scope.showImage = function (index) {
        Lightbox.openModal($scope.imgsList,index);
      };

      $scope.showDelete = function (item) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/administration/images/modalDeleteImg.html',
            controller: 'deleteImageCtrl',
            resolve: {
                  item: function () {
                      return item;
                  }
              }
        });
        modalInstance.result.then(function(result) {
          $scope.getImgs();
        });
      };

  });

  