'use strict';

/**
 * @ngdoc function
 * @name fotosApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the fotosApp
 */
angular.module('fotosApp')
  .controller('mysticHomeCtrl', function ($window,$scope,$mdDialog,toastr,carService,$localStorage) {
      var modalCarListController = function($rootScope,$scope,$mdDialog,userService,pedidosServices){
        $scope.carList = $localStorage.car;
        $scope.loading = false;
        $scope.showRegister = ($rootScope.user) ? false : true;

        $scope.cancel = function(){
          $mdDialog.hide();
        }

        $scope.updateCantidad = function(index,item){
          carService.updateCantidadCar(index,item);
        }

        $scope.removeItemCar = function(index){
          carService.removeItemCar(index);
        }

        $scope.sendCar = function(){
          $scope.loading = true;
           pedidosServices.addPedido($localStorage.car).then(function(r){
            if (r.data.respuesta == true) {
              var toast = toastr.success('Pedido Enviado correctamente', 'Correcto',{
                        closeButton: true,
                         timeOut: 2000,
                      });
              carService.resetCar();
              $mdDialog.hide('Y');
              $scope.loading = false;
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
        }
      }

    $scope.openCar = function(ev){
        $mdDialog.show({
          controller: modalCarListController,
          templateUrl: 'views/commonModals/modalCarList.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: true
        }).then(function(r) {
          if (r == 'Y') {
            $window.location.reload();
          }
        });
    }

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
