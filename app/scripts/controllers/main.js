'use strict';

/**
 * @ngdoc function
 * @name fotosApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fotosApp
 */
angular.module('fotosApp')
  .controller('MainCtrl', function ($scope,$rootScope,$localStorage,$location,$window,$mdDialog,userService,toastr) {
    $rootScope.user = $localStorage.user;

    $scope.saving = false;
     $scope.menuSuperior = [
                      {nombre:'Inicio',link:'/',icon:'fa-home',child:[]},
                      {nombre:'Contactos',link:'/Contactos',icon:'fa-envelope',child:[]},
                      {nombre:'Fotografias',link:'/',icon:'fa-camera-retro',child:[
                        {nombre:'Corportivas',link:'/fotografia/Corportivas',icon:'fa-picture-o',child:[]},
                        {nombre:'Bodas',link:'/fotografia/Bodas',icon:'fa-picture-o',child:[]},
                        {nombre:'Retratos',link:'/fotografia/Retratos',icon:'fa-picture-o',child:[]},
                        {nombre:'Fashion',link:'/fotografia/Fashion',icon:'fa-picture-o',child:[]},
                        {nombre:'Editorial',link:'/fotografia/Editorial',icon:'fa-picture-o',child:[]}
                      ]},
                      {nombre:'Workshop',link:'/',icon:'fa-home',child:[]},
                      {nombre:'Videos',link:'/',icon:'fa-video-camera',child:[]},
                      {nombre:'Productos',link:'/',icon:'fa-product-hunt',child:[]}
                      // {nombre:'Ingreso ',link:'/',icon:'fa-user-circle',child:[]},
                    ];
    $scope.goTo = function(link){
      $location.path(link);
    }

    $scope.logOut = function(){
      userService.salir({token:$rootScope.user.token}).then(function(r){
        if (r.respuesta == true) {
          $localStorage.$reset();
          $window.location.reload();
        }
      }).catch(function(e){
        $scope.saving = false;
        $localStorage.$reset();
        $window.location.reload();
        var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
          closeButton: true,
           timeOut: 2000,
        });
      });
    }

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
