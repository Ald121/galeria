'use strict';

/**
 * @ngdoc function
 * @name fotosApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the fotosApp
 */
angular.module('fotosApp')
  .controller('mysticHomeCtrl', function (categoriaService,$location,$rootScope,userService,$window,$scope,$mdDialog,toastr,carService,$localStorage) {
      $scope.$watch(function () { return $localStorage.car; },function(newVal,oldVal){
           if($localStorage.car){
            $rootScope.carList = $localStorage.car;
          }
        },true);
      var modalCarListController = function(locationService,bancosServices,$rootScope,$scope,$mdDialog,userService,pedidosServices){
        $scope.carList = $localStorage.car;
        $scope.loading = false;
        $scope.loading = false;
        $scope.selected = {};
        $scope.showRegister = ($rootScope.user) ? false : true;
        if ($rootScope.user) {
          $scope.user = $rootScope.user.datos;
        }
        //Lista de bancos 
        if ($scope.carList) {
          bancosServices.bancosList().then(function(r){
            if (r.data.respuesta == true) {
              $scope.bancosList = r.data.list;
            }else{
              var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
                          closeButton: true,
                           timeOut: 2000,
                        });
              $scope.loading = false;
            }
          })
          .catch(function(e){
            userService.catchError(e);
            var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
                          closeButton: true,
                           timeOut: 2000,
                        });
            $scope.loading = false;
          });
        }
        

        $scope.getCiudades = function(prov){
          $scope.loadingCiudades = true;
          locationService.ciudadesList({provincia:prov})
          .then(function(r){
              if (r.data.respuesta == true) {
                $scope.ciudadesList = r.data.ciudades;
                angular.forEach($scope.ciudadesList,function(value){
                  if ($scope.user) {
                    if (value.nombre == $scope.user.ciudad) {
                      $scope.selected.ciudad = value;
                    }
                  }
                });
                $scope.loadingCiudades = false;
              }else{
                $scope.loadingCiudades = false;
                var toast = toastr.error('Usuario o contraseña incorrecto', 'Error',{
                  closeButton: true,
                  timeOut: 2000,
                });
                $scope.saving = false;
              }
            }).catch(function(e){
              userService.catchError(e);
              $scope.loadingCiudades = false;
              var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
                closeButton: true,
                 timeOut: 2000,
              });
              $scope.saving = false;
            });
        }

        locationService.provinciasList()
        .then(function(r){
          if (r.data.respuesta == true) {
            $scope.lodingProv = false;
            $scope.provinciasList = r.data.provincias;
            angular.forEach($scope.provinciasList,function(value){
              if ($scope.user) {
                if (value.nombre == $scope.user.provincia) {
                  $scope.selected.provincia = value;
                  $scope.getCiudades($scope.selected.provincia);
                }
              }
            });
          }else{
            $scope.lodingProv = false;
            var toast = toastr.error('Usuario o contraseña incorrecto', 'Error',{
              closeButton: true,
              timeOut: 2000,
            });
            $scope.saving = false;
          }
        }).catch(function(e){
          userService.catchError(e);
          $scope.lodingProv = false;
          var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
            closeButton: true,
             timeOut: 2000,
          });
          $scope.saving = false;
        });

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
              swal({
                 title: "Pedido Enviado Correctamente !!",
                 text: "No olvides subir tu comprobante de pago para que tu pedido sea atendido",
                 type: "info",
                 showCancelButton: false,
                 confirmButtonText: "Aceptar",
                 closeOnConfirm: false
               }, 
              function(){ 
                 carService.resetCar();
                 $scope.loading = false;
                 $window.location.reload();
              });
              
            }else{
              var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
                        closeButton: true,
                         timeOut: 2000,
                      });
                      $scope.loading = false;
            }
           }).catch(function(e){
            userService.catchError(e);
              var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
                closeButton: true,
                 timeOut: 2000,
              });
              $scope.loading = false;
           });
        }

        $scope.openRegister = function(ev){
          userService.openModalRegister(ev);
        }
      }

    $scope.logOut = function(){
      $scope.loading = true;
      userService.salir({token:$rootScope.user.token}).then(function(r){
        if (r.respuesta == true) {
          $localStorage.$reset();
          $window.location.reload();
        }
      }).catch(function(e){
        userService.catchError(e);
        $scope.loading = false;
        $localStorage.$reset();
        $window.location.reload();
        var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
          closeButton: true,
           timeOut: 2000,
        });
      });
    }

    $scope.goTo = function(link){
      if (link == '/administration') {
        if ($rootScope.user.datos.userType == 'ADMIN') {
            $location.path('/administration');
         }
         if ($rootScope.user.datos.userType == 'CLIENTE') {
            $location.path('/client');
         }
       }else{
            $location.path(link);
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

    // $scope.menuSuperior = [
    //                   {nombre:'Inicio',link:'/mystic',icon:'fa-home',child:[]},
    //                   {nombre:'Camisas',link:'/mystic/camisas',icon:'fa-shopping-bag',child:[]},
    //                   {nombre:'Accesorios',link:'/mystic/accesorios',icon:'fa-shopping-bag',child:[]}
    //                 ];

    $scope.getCategorias = function () {
        $scope.loadingCat = true;
        categoriaService.categoriasList().then(function(r){
          $scope.menuSuperior = r.data.list;
          angular.forEach($scope.menuSuperior,function(value,key){
            $scope.menuSuperior[key].link = '/mystic/' + $scope.menuSuperior[key].key;
            $scope.menuSuperior[key].icon = 'fa-shopping-bag';
            $scope.menuSuperior[key].child = [];
          });
          $scope.loadingCat = false;
        }).catch(function(e){
          userService.catchError(e);
          $scope.loadingCat = false;
        });
      };
    $scope.getCategorias();

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
          userService.catchError(e);
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
          userService.catchError(e);
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
