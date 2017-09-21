'use strict';

/**
 * @ngdoc function
 * @name fotosApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the fotosApp
 */
angular.module('fotosApp')
  .controller('mysticInicioCtrl', function ($mdDialog,$location,sliderService,$scope,productsServices,toastr,generalService) {
   	    $scope.productsListSlider = [];
        $scope.productsDestacados = [];
        $scope.loadingDestacados = false;
        $scope.loadingSlider = false;
        $scope.loadingRecent = false;

        $scope.getProds = function () {
            $scope.loadingRecent = true;
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
                     $scope.loadingRecent = false;
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

      $scope.getProductosDestacados = function () {
            $scope.loadingDestacados = true;
            $scope.loading = true;
            sliderService.sliderList().then(function(r){
                  if (r.data.respuesta == true) {
                     $scope.loading = false;
                     $scope.productsDestacados = r.data.list;
                     angular.forEach($scope.productsDestacados,function(value,key){
                        angular.forEach($scope.productsDestacados[key].images,function(image,keyImg){
                          $scope.productsDestacados[key].images[keyImg].image = generalService.pathImgProds() + $scope.productsDestacados[key].images[keyImg].url;
                        if ($scope.productsDestacados[key].images[keyImg].default == 1) {
                                $scope.productsDestacados[key].picDefault = $scope.productsDestacados[key].images[keyImg].image;
                            }
                        });
                     });
                     $scope.loadingDestacados = false;
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

      $scope.getProductosDestacados();

      $scope.getSlider = function () {
            $scope.loadingSlider = true;
            $scope.loading = true;
            sliderService.sliderProdDestacados().then(function(r){
                  if (r.data.respuesta == true) {
                     $scope.loading = false;
                     $scope.productsListSlider = r.data.list;
                     angular.forEach($scope.productsListSlider,function(value,key){
                        angular.forEach($scope.productsListSlider[key].images,function(image,keyImg){
                          $scope.productsListSlider[key].images[keyImg].image = generalService.pathImgProds() + $scope.productsListSlider[key].images[keyImg].url;
                        if ($scope.productsListSlider[key].images[keyImg].default == 1) {
                                $scope.productsListSlider[key].picDefault = $scope.productsListSlider[key].images[keyImg].image;
                            }
                        });
                     });
                     $scope.loadingSlider = false;
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

      $scope.getSlider();

      $scope.viewDetails = function(ev,item){
        // $location.path('/mystic/detalles/' + item.idproductos);
        $mdDialog.show({
          controller: modalDetailsController,
          templateUrl: 'views/commonModals/modalDetails.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: true,
          locals:{
            prod:item
          }
        });
      }

      var modalDetailsController = function(prod,$scope,$localStorage,$mdDialog,userService,$location){
        $scope.saving = false;
        $scope.prodSelected = prod;
        $scope.images = [];
        angular.forEach($scope.prodSelected.images,function(image,keyImg){
          $scope.prodSelected.images[keyImg].image = generalService.pathImgProds() + $scope.prodSelected.images[keyImg].url;
          var img = {
            thumb:$scope.prodSelected.images[keyImg].image,
            large:$scope.prodSelected.images[keyImg].image,
            medium:$scope.prodSelected.images[keyImg].image
          }
          $scope.images.push(img);
          if ($scope.prodSelected.images[keyImg].default == 1) {
                $scope.prodSelected.picDefault = $scope.prodSelected.images[keyImg].image;
          }
        });
        console.log($scope.images);
        $scope.zoomOptions1 = {
            defaultImage        : 0,
            style               : 'box',
            boxPos              : 'right-top',
            boxW                : 400,
            boxH                : 400,
            method              : 'lens',
            cursor              : 'crosshair',
            lens                : true,
            zoomLevel           : 3,
            immersiveMode       : '769',
            immersiveModeOptions: {
            },
            prevThumbButton     : '&#9665;',
            nextThumbButton     : '&#9655;',
            thumbsPos           : 'top',
            thumbCol            : 4,
            thumbColPadding     : 4,
            images              : $scope.images
        };

        $scope.cancel = function(){
          $mdDialog.hide();
        }
      }
            
    });


