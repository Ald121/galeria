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
                        {nombre:'Corporativas',link:'/fotografia/Corporativas',icon:'fa-picture-o',child:[]},
                        {nombre:'Bodas',link:'/fotografia/Bodas',icon:'fa-picture-o',child:[]},
                        {nombre:'Retratos',link:'/fotografia/Retratos',icon:'fa-picture-o',child:[]},
                        {nombre:'Fashion',link:'/fotografia/Fashion',icon:'fa-picture-o',child:[]},
                        {nombre:'Editorial',link:'/fotografia/Editorial',icon:'fa-picture-o',child:[]}
                      ]},
                      {nombre:'Workshop',link:'/',icon:'fa-home',child:[]},
                      {nombre:'Videos',link:'/videos',icon:'fa-video-camera',child:[]},
                      {nombre:'Productos',link:'/',icon:'fa-product-hunt',child:[]}
                      // {nombre:'Ingreso ',link:'/',icon:'fa-user-circle',child:[]},
                    ];
    $rootScope.logos = [
                      {image:'images/cofradiaB.png',link:'/',active:true},
                      {image:'images/mysticB.png',link:'/mystic/ALL',active:false}
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
             if (r.data.datos.userType == 'ADMIN') {
                $location.path('/administration');
             }
             if (r.data.datos.userType == 'CLIENTE') {
                $location.path('/client');
             }
             
          }else{
            if (r.data.error == 'userExist') {
              swal({
                 title: 'Error !!',
                 text: 'El correo ingresado ya se encuentra registrado',
                 type: 'error',
                 showCancelButton: false,
                 confirmButtonText: 'Aceptar',
                 closeOnConfirm: true
               });
            }else{
              var toast = toastr.error('Usuario o contraseña incorrecto', 'Error',{
                closeButton: true,
                timeOut: 2000,
              });
            }
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
        userService.openModalRegister(ev);
      }
    } 

  });
