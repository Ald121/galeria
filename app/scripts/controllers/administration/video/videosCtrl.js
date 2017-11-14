'use strict';

/**
 * @ngdoc function
 * @name fotosApp.controller:InicioctrlCtrl
 * @description
 * # InicioctrlCtrl
 * Controller of the fotosApp
 */
var app = angular.module('fotosApp');
app.controller('videosCtrl', function ($scope,$uibModal,imageServices) {
    console.log('aqi');
     $scope.addVideo = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/administration/video/modalAddVideo.html',
            controller: 'addVideoCtrl',
        });
        modalInstance.result.then(function(result) {
          $scope.videoList = [];
          $scope.getVideos();
        });
      };

      $scope.getVideos = function () {
        $scope.loadingVideoList = true;
        imageServices.videoList().then(function(r){
          if (r.data.respuesta == true) {
             $scope.loadingVideoList = false;
             $scope.videoList = r.data.list;
          }else{
            var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
            closeButton: true,
             timeOut: 2000,
          });
          $scope.loadingVideoList = false;
          }
        }).catch(function(e){
          userService.catchError(e);
          var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
            closeButton: true,
             timeOut: 2000,
          });
          $scope.loadingVideoList = false;
        });
      };

      $scope.getVideos();
});

app.controller('addVideoCtrl', function (userService,alertsService,toastr,$scope,$uibModal,imageServices,$uibModalInstance) {
    
     $scope.saveVideo = function () {
        $scope.savingVideo = true;
        imageServices.saveVideo($scope.item).then(function(r){
          if (r.data.respuesta == true) {
            toastr.success(alertsService.alerts.ok.save, 'Correcto !',{
              closeButton: true,
              timeOut: 2000,
            });
             $uibModalInstance.close();
          }else{
            var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
            closeButton: true,
             timeOut: 2000,
          });
          $scope.savingVideo = false;
          }
        }).catch(function(e){
          userService.catchError(e);
          var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
            closeButton: true,
             timeOut: 2000,
          });
          $scope.savingVideo = false;
        });
      };
     $scope.close = function(){
     	$uibModalInstance.close();
     }
});



