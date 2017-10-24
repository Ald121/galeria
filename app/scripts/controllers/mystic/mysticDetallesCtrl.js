'use strict';

/**
 * @ngdoc function
 * @name fotosApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the fotosApp
 */
angular.module('fotosApp')
  .controller('mysticDetallesCtrl', function (userService,$scope,productsServices,toastr,generalService,$routeParams) {
     productsServices.prodDetails({id:$routeParams.id}).then(function(r){
          console.log(r);
        }).catch(function(e){
          userService.catchError(e);
          var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
            closeButton: true,
             timeOut: 2000,
          });
          $scope.saving = false;
        });   
    });


