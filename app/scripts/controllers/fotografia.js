'use strict';

/**
 * @ngdoc function
 * @name fotosApp.controller:FotografiactrlCtrl
 * @description
 * # FotografiactrlCtrl
 * Controller of the fotosApp
 */
angular.module('fotosApp')
  .controller('FotografiaCtrl', function ($routeParams,$scope,$mdDialog,Lightbox,imageServices,toastr,generalService) {
  	console.log($routeParams.categoria);

  	 imageServices.imagesListByCat({cat:$routeParams.categoria}).then(function(r){
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
