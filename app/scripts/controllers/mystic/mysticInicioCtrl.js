'use strict';

/**
 * @ngdoc function
 * @name fotosApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the fotosApp
 */
angular.module('fotosApp')
  .controller('mysticInicioCtrl', function ($scope) {
   	     $scope.slides = [
            {image: 'images/slider/pic1.jpg', description: 'Image 00'},
            {image: 'images/slider/pic2.jpg', description: 'Image 01'},
            {image: 'images/slider/pic3.jpg', description: 'Image 02'},
            {image: 'images/slider/pic4.jpg', description: 'Image 03'},
            {image: 'images/slider/pic5.jpg', description: 'Image 04'}
        ];


        $scope.prods = [
            {image: 'images/slider/pic1.jpg', description: 'Image 00'},
            {image: 'images/slider/pic2.jpg', description: 'Image 01'},
            {image: 'images/slider/pic3.jpg', description: 'Image 02'},
            {image: 'images/slider/pic4.jpg', description: 'Image 03'},
            {image: 'images/slider/pic5.jpg', description: 'Image 04'}
        ];

    });


