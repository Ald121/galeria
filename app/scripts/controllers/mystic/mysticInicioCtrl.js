'use strict';

/**
 * @ngdoc function
 * @name fotosApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the fotosApp
 */
angular.module('fotosApp')
  .controller('mysticInicioCtrl', function ($scope,productsServices,toastr,generalService) {
   	    $scope.slides = [
            {image: 'images/slider/pic1.jpg', description: 'Image 00'},
            {image: 'images/slider/pic2.jpg', description: 'Image 01'},
            {image: 'images/slider/pic3.jpg', description: 'Image 02'},
            {image: 'images/slider/pic4.jpg', description: 'Image 03'},
            {image: 'images/slider/pic5.jpg', description: 'Image 04'}
        ];

        $scope.getProds = function () {
            $scope.loading = true;
            productsServices.productsList().then(function(r){
                  if (r.data.respuesta == true) {
                     $scope.loading = false;
                     $scope.productsList = r.data.list;
                     angular.forEach($scope.productsList,function(value,key){
                        angular.forEach($scope.productsList[key].images,function(image,keyImg){
                          $scope.productsList[key].images[keyImg].image = generalService.pathImgProds() + $scope.productsList[key].images[keyImg].url;
                        if ($scope.productsList[key].images[keyImg].default == 1) {
                                $scope.productsList[key].picDefault = $scope.productsList[key].images[keyImg].image;
                            }
                        });
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

      $scope.getProds();
            
    });


