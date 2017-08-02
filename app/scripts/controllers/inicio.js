'use strict';

/**
 * @ngdoc function
 * @name fotosApp.controller:InicioctrlCtrl
 * @description
 * # InicioctrlCtrl
 * Controller of the fotosApp
 */
var app=angular.module('fotosApp');
  app.controller('inicioCtrl', function ($scope,$mdDialog,Lightbox) {
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

});

