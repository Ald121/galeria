'use strict';

/**
 * @ngdoc function
 * @name fotosApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the fotosApp
 */
angular.module('fotosApp')
  .controller('mysticHomeCtrl', function ($scope) {
    $scope.menuSuperior = [
                      {nombre:'Inicio',link:'/mytic',icon:'fa-home',child:[]},
                      {nombre:'Camisas',link:'/camisas',icon:'fa-shopping-bag',child:[]},
                      {nombre:'Accesorios',link:'/accesorios',icon:'fa-shopping-bag',child:[]}
                    ];
  });
