'use strict';

/**
 * @ngdoc function
 * @name fotosApp.controller:InicioctrlCtrl
 * @description
 * # InicioctrlCtrl
 * Controller of the fotosApp
 */
var app=angular.module('fotosApp');
  app.controller('inicioCtrl', function ($scope,$mdDialog,Lightbox,imageServices,toastr,generalService) {
    
    imageServices.imageList().then(function(r){
	    	$scope.imgs = r.data.list;
	        angular.forEach($scope.imgs,function(value,key){
	          $scope.imgs[key].url = generalService.dir() + $scope.imgs[key].src
	        });
        }).catch(function(e){
          var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
            closeButton: true,
             timeOut: 2000,
          });
          $scope.loading = false;
        });
	
	$scope.openLightboxModal = function (index) {
    	Lightbox.openModal($scope.imgs,index);
  	};

});

