'use strict';

/**
 * @ngdoc function
 * @name fotosApp.controller:accountActivationCtrl
 * @description
 * # accountActivationCtrl
 * Controller of the fotosApp
 */
angular.module('fotosApp')
  .controller('accountActivationCtrl', function ($scope,$mdDialog) {
  	   $scope.imgs = [
		    	{url:'styles/images/21.jpg'},
		    	{url:'styles/images/22.png'},
		    	{url:'styles/images/1.jpg'},
		    	{url:'styles/images/2.jpg'},
		    	{url:'styles/images/3.jpg'},
		    	{url:'styles/images/4.jpg'},
		    	{url:'styles/images/5.jpg'},
		    	{url:'styles/images/6.jpg'},
		    	{url:'styles/images/7.jpg'},
		    	{url:'styles/images/8.jpg'},
		    	{url:'styles/images/9.jpg'},
		    	{url:'styles/images/10.jpg'},
		    	{url:'styles/images/11.jpg'},
		    	{url:'styles/images/12.jpg'},
		    	{url:'styles/images/13.jpg'},
		    	{url:'styles/images/14.jpg'},
		    	{url:'styles/images/15.jpg'},
		    	{url:'styles/images/16.jpg'},
		    	{url:'styles/images/17.jpg'},
		    	{url:'styles/images/18.jpg'},
		    	{url:'styles/images/19.jpg'},
		    	{url:'styles/images/20.jpg'}
		    ];
	
	$scope.openLightboxModal = function (index) {
    	Lightbox.openModal($scope.imgs,index);
  	};

  	var modalActivationController = function($scope,$mdDialog,userService,$routeParams,toastr){
      userService.activar({codigo:$routeParams.code}).then(function(r){
          if (r.data.respuesta == true) {
            toastr.success('Se ha activado correctamente','Felicidades :)',{
              closeButton: true,
              timeOut: 3000,
            });
             $mdDialog.hide();
             $scope.saving = false;
          }else{
            var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
              closeButton: true,
              timeOut: 2000,
            });
            $scope.saving = false;
          }
        }).catch(function(e){
          var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
            closeButton: true,
             timeOut: 2000,
          });
          $scope.saving = false;
        });
    }

  	$mdDialog.show({
        controller: modalActivationController,
        templateUrl: 'views/fotografia/modalActivation.html',
        parent: angular.element(document.body),
        clickOutsideToClose:false,
        fullscreen: true
    });
  	 

  })
