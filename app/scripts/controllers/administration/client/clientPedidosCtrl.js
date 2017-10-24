angular.module('fotosApp')
  .controller('clientPedidosCtrl', function (userService,$rootScope,alertsService,$uibModal,bancosServices,$mdDialog,toastr,$location,$localStorage,$scope,$mdSidenav,pedidosServices,$rootScope) {
    $scope.rolForRoute = 'CLIENTE';
    if (!$rootScope.user) {
      var toast = toastr.error(alertsService.alerts.error.session, 'Error',{
          closeButton: true,
           timeOut: 2000,
        });
      $location.path('/');
    }
    if ($rootScope.user.datos.userType != $scope.rolForRoute) {
      var toast = toastr.error('Acesso denegado', 'Error',{
          closeButton: true,
           timeOut: 2000,
        });
      $location.path('/');
    }

    $scope.getPedidos = function () {
      $scope.loading = true;
      pedidosServices.pedidosListCliente({iduser:$rootScope.user.datos.id}).then(function(r){
            if (r.data.respuesta == true) {
               $scope.loading = false;
               $scope.pedidosList = r.data.list.data;
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
      };
      $scope.viewDetails = function (ev,pedido) {
        $mdDialog.show({
            controller: modalDetailsController,
            templateUrl: 'views/administration/pedidos/modalDetails.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true,
            locals:{
              pedido:pedido
            }
         });
      };
      $scope.getPedidos();

      var modalDetailsController = function(generalService,pedido,$scope,$localStorage,$mdDialog,userService,$location){
        $scope.pedido = pedido;
         angular.forEach($scope.pedido.detalles,function(value){
              value.image = generalService.pathImgProds() + value.image;
           });
        $scope.cancel = function(){
          $mdDialog.hide();
        }
      }

      $scope.uploadComprobante = function(ev,pedido){
        $mdDialog.show({
            controller: modalUploadComprobanteController,
            templateUrl: 'views/administration/client/pedidos/modalUploadComprobante.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true,
            locals:{
              pedido:pedido
            }
         }).then(function(r){
          if (r.respuesta == 'Y') {
              $scope.pedidosList = [];
              $scope.getPedidos();
          }
         });
      }

      var modalUploadComprobanteController = function(FileUploader,generalService,pedido,$scope,$localStorage,$mdDialog){
        $scope.pedido = pedido;
         $scope.uploader = new FileUploader({
            url: generalService.dir() + 'uploadComprobante'
        });

        $scope.uploader.filters.push({
                name: 'imageFilter',
                fn: function(item /*{File|FileLikeObject}*/, options) {
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            });

         $scope.uploader.onBeforeUploadItem = function(item) {
              formData = [{
                  token: $localStorage.user.token,
                  pedido: $scope.pedido.idpedidos
              }];
              Array.prototype.push.apply(item.formData, formData);
          };

          $scope.uploader.onAfterAddingFile = function(item) {
              if ($scope.uploader.queue.length == 1) {
                item.default = 1;
              }else{
                item.default = 0;
              }
          };

          $scope.uploader.onCompleteAll = function() {
              var allCompleted = true;
              angular.forEach($scope.uploader.queue,function(value,key){
                  if (value.progress == 0) {
                      allCompleted = false;
                  }
              });
              if (allCompleted) {
                  toastr.success(alertsService.alerts.ok.save, 'Correcto !',{
                    closeButton: true,
                    timeOut: 2000,
                  });
                  var result = {respuesta:'Y',data:$scope.item};
                  $mdDialog.hide(result);
                  $scope.loading = false;
              }else{
                   $scope.loading = false;
                  toastr.error(alertsService.alerts.error.upload, 'Error !',{
                    closeButton: true,
                    timeOut: 2000,
                  });
              }
          };

          $scope.save = function() {
            $scope.loading = true;
            $scope.uploader.uploadAll();
          }

        $scope.cancel = function(){
          $mdDialog.hide();
        }
      }

  });