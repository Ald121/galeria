'use strict';

/**
 * @ngdoc function
 * @name fotosApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the fotosApp
 */
angular.module('fotosApp')
  .controller('mysticHomeCtrl', function ($scope,$mdDialog,toastr) {
    $scope.menuSuperior = [
                      {nombre:'Inicio',link:'/mytic',icon:'fa-home',child:[]},
                      {nombre:'Camisas',link:'/camisas',icon:'fa-shopping-bag',child:[]},
                      {nombre:'Accesorios',link:'/accesorios',icon:'fa-shopping-bag',child:[]}
                    ];
    $scope.openLoginModal = function(ev){
      $mdDialog.show({
        controller: modalLoginController,
        templateUrl: 'views/fotografia/modalLogin.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen
      });
    }

    var modalLoginController = function($scope,$localStorage,$mdDialog,userService,$location){
      $scope.cancel = function(){
        $mdDialog.hide();
      }

      $scope.ingresar = function(){
        $scope.saving = true;
        userService.ingresar($scope.item).then(function(r){
          if (r.data.respuesta == true) {
            toastr.success($scope.item.nick, 'Bienvenido !',{
              closeButton: true,
              timeOut: 2000,
            });
             $scope.saving = false;
             $localStorage.user = r.data;
             $mdDialog.hide();
             $location.path('/administration');
          }else{
            var toast = toastr.error('Usuario o contraseña incorrecto', 'Error',{
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

      $scope.openRegister = function(ev){
      $mdDialog.show({
        controller: modalRegisterController,
        templateUrl: 'views/fotografia/modalRegister.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen
      });
    }
    
    var modalRegisterController = function($scope,$mdDialog,userService){
      $scope.cancel = function(){
        $mdDialog.hide();
      }

      $scope.registrar = function(){
        $scope.saving = true;
        userService.registrar($scope.item).then(function(r){
          if (r.data.respuesta == true) {
            toastr.info('Se envió un correo de verificación, para ingresar activa tu cuenta','Correo de verificación',{
              closeButton: true,
              timeOut: 3000,
            });
             $mdDialog.hide();
             $scope.saving = false;
          }else{
            var toast = toastr.error('Usuario o contraseña incorrecto', 'Error',{
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
    } 

    } 
  });
