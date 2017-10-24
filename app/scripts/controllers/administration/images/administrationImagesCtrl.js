angular.module('fotosApp')
  .controller('administrationImagesCtrl', function (userService,$location,$rootScope,$scope,Lightbox,$uibModal,imageServices,generalService,toastr) {
    $scope.imgsList = [];
    $scope.rolForRoute = 'ADMIN';
    if ($rootScope.user.datos.userType != $scope.rolForRoute) {
      var toast = toastr.error('Acesso denegado', 'Error',{
          closeButton: true,
           timeOut: 2000,
        });
      $location.path('/');
    }
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
          userService.catchError(e);
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
          $scope.imgsList = [];
          $scope.getImgs();
        });
      };

      $scope.showImage = function (index) {
        Lightbox.openModal($scope.imgsList,index);
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
                   var indexObj = $scope.imgsList.indexOf(item);
                   $scope.imgsList = [];
                   $scope.getImgs();
                }else{
                  var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
                  closeButton: true,
                   timeOut: 2000,
                });
                $scope.loading = false;
                }
              }).catch(function(e){
                userService.catchError(e);
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
      Lightbox.openModal($scope.imgsList,index);
    };
    
  });

  