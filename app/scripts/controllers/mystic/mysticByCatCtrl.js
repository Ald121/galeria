'use strict';

angular.module('fotosApp')
  .controller('mysticByCatCtrl', function ($routeParams,$localStorage,$rootScope,carService,$mdDialog,$location,sliderService,$scope,productsServices,toastr,generalService) {
        
        if ($routeParams.categoria) {
          $scope.search = $routeParams.categoria;
        }else{
          $scope.search = 'ALL';
        }
        $scope.productsListSlider = [];
        $scope.productsDestacados = [];
        $scope.loadingDestacados = false;
        $scope.loadingSlider = false;
        $scope.loadingRecent = false;
        $rootScope.logos = [
                      {image:'images/cofradiaB.png',link:'/',active:false},
                      {image:'images/mysticB.png',link:'/mystic/ALL',active:true}
                  ];
        $rootScope.setActiveLogo = function(item){
          angular.forEach($rootScope.logos,function(value){
            if (value.link == $location.path()) {
              value.active = true;
            }else{
              value.active = false;
            }
          });
          if (item) {
            $location.path(item.link);
          }
        }
        $rootScope.setActiveLogo();

        $scope.getProds = function () {
            $scope.loadingRecent = true;
            $scope.loading = true;
            productsServices.productsList({q:$scope.search}).then(function(r){
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
            sliderService.sliderProdDestacados({q:$scope.search}).then(function(r){
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
            sliderService.sliderList({q:$scope.search}).then(function(r){
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
        if (ev.target.nodeName === 'SPAN'  || ev.target.nodeName === 'H5' || ev.target.nodeName === 'IMG' || ev.target.nodeName === 'P' || ev.target.nodeName === 'DIV') {
          carService.viewDetails(ev,item,$mdDialog);
        }
      }
      
      $scope.addToCar = function(evn,item){
        if (evn.target.nodeName === 'A' || evn.target.nodeName === 'I') {
          carService.addToCar(item);
        }
      }

    });


