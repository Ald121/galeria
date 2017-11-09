var app = angular.module('fotosApp');
  app.factory('userService',['$q', '$timeout', '$http','generalService',
    '$localStorage','$mdDialog',
    function ($q, $timeout, $http,generalService,$localStorage,$mdDialog,alertsService) {
    
    return ({
      ingresar: ingresar,
      registrar:registrar,
      activar:activar,
      salir:salir,
      checkSession:checkSession,
      openModalRegister:openModalRegister,
      catchError:catchError
    });

    function catchError(e) {
       if (e) {
          if (e.error == "Sin-Token-de-Seguridad" || e.error == "Token-Expirado") {
            $localStorage.$reset();
            $window.location.reload();
            var toast = toastr.error(alertsService.alerts.error.session, 'Error',{
              closeButton: true,
               timeOut: 2000,
            });
          };
       }
    }

    function ingresar(dataSend) {
       if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'acceso', dataSend);
    }

    function registrar(dataSend) {
       if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'registrar', dataSend);
    }

    function activar(dataSend) {
       if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'activar', dataSend);
    }

    function salir(dataSend) {
       if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
       return $http.post(generalService.dir() + 'salir', dataSend);
    }

    function checkSession(dataSend){
      if ($localStorage.user) {
        if (!dataSend) {
          dataSend = {};
        }
        dataSend.token = $localStorage.user.token;
      }
      return $http.post(generalService.dir() + 'checkSession', dataSend);
    }

    function openModalRegister(ev){
      $mdDialog.show({
        controller: modalRegisterController,
        templateUrl: 'views/fotografia/modalRegister.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: true
      });
    }

    function modalRegisterController($scope,$mdDialog,userService,locationService,toastr){
        $scope.cancel = function(){
          $mdDialog.hide();
        }
        $scope.item = {};
        
        $scope.lodingProv = true;
        locationService.provinciasList()
        .then(function(r){
            if (r.data.respuesta == true) {
              $scope.lodingProv = false;
              $scope.provinciasList = r.data.provincias;
            }else{
                var toast = toastr.error('Usuario o contraseña incorrecto', 'Error',{
                  closeButton: true,
                  timeOut: 2000,
                });
              $scope.saving = false;
            }
          }).catch(function(e){
            $scope.lodingProv = false;
            var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
              closeButton: true,
               timeOut: 2000,
            });
            $scope.saving = false;
          });

        $scope.getCiudades = function(prov){
          $scope.loadingCiudades = true;
          locationService.ciudadesList({provincia:prov})
          .then(function(r){
              if (r.data.respuesta == true) {
                $scope.ciudadesList = r.data.ciudades;
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
              $scope.loadingCiudades = false;
              var toast = toastr.error('Ups! intentalo nuevamente', 'Error',{
                closeButton: true,
                 timeOut: 2000,
              });
              $scope.saving = false;
            });
        } 
        $scope.setCiudad = function(item){
          console.log(item);
          $scope.item.ciudad = item;
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
      }

    }])