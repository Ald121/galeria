'use strict';

/**
 * @ngdoc overview
 * @name fotosApp
 * @description
 * # fotosApp
 *
 * Main module of the application.
 */
var app = angular
  .module('fotosApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'route-segment',
    'view-segment',
    'angularGrid',
    'ui.bootstrap',
    'bootstrapLightbox',
    'toastr',
    'md.data.table',
    'angularFileUpload',
    'ngStorage',
    'ui.carousel',
    'ui.utils.masks',
    'wipImageZoom',
    'ui.select', 
    'ngSanitize',
    'colorpicker.module',
    'underscore'
  ]);

app.run(function($rootScope,$window,userService,toastr,$localStorage,$location,$routeSegment) {
    $rootScope.$on("$routeChangeSuccess", function(event, next, current) {
        if ($localStorage.user) {
            $rootScope.user = $localStorage.user;
            userService.checkSession().then(function(r){
                if (r.data.respuesta != true) {
                  $localStorage.$reset();
                  $window.location.reload();
                }
            }).catch(function(e){
              var toast = toastr.error('Ups! tu sesión ha caducado', 'Error',{
                closeButton: true,
                 timeOut: 2000,
              });
              $localStorage.$reset();
              $window.location.reload();
            });
        }
    });
    
});

app.config(function ($routeSegmentProvider, $routeProvider,$locationProvider) {
      $routeSegmentProvider.options.autoLoadTemplates = true; 
      $routeSegmentProvider    
            .when('/',    'main')
            // Administracion
            .when('/administration',    'administration')
            .when('/administration/images',    'administration.images')
            .when('/administration/products',    'administration.products')
            .when('/administration/slider',    'administration.slider')
            .when('/administration/pedidos',    'administration.pedidos')
            // Cliente
            .when('/client',    'client')
            .when('/client/pedidos',    'client.pedidos')
            // Cofradia
            .when('/fotografia/:categoria',    'main.fotografia')
            // Activar cuenta
            .when('/activarcuenta/:code',    'main.activarcuenta')

            .segment('client', {
                templateUrl: 'views/administration/index.html',
                controller: 'clientAdministrationCtrl'
            }).within()
                .segment('pedidos', {
                    templateUrl: 'views/administration/client/pedidos/index.html',
                    controller: 'clientPedidosCtrl',
                    default: true
                }).up()

            .segment('administration', {
                templateUrl: 'views/administration/index.html',
                controller: 'administrationCtrl'
            }).within()
                .segment('images', {
                    templateUrl: 'views/administration/images/index.html',
                    controller: 'administrationImagesCtrl',
                    default: true
                })
                .segment('products', {
                    templateUrl: 'views/administration/products/index.html',
                    controller: 'prodsCtrl'
                })
                .segment('slider', {
                    templateUrl: 'views/administration/slider/index.html',
                    controller: 'sliderCtrl'
                })
                .segment('pedidos', {
                    templateUrl: 'views/administration/pedidos/index.html',
                    controller: 'pedidosCtrl'
                }).up()         
            .segment('main', {
                templateUrl: 'views/main/main.html',
                controller: 'MainCtrl'
            }).within()
                .segment('inicio', {
                    templateUrl: 'views/main/inicio.html',
                    controller: 'inicioCtrl',
                    default: true
                })
                .segment('fotografia', {
                    templateUrl: 'views/fotografia/main.html',
                    controller: 'FotografiaCtrl',
                    dependencies:['categoria']
                }) 
                .segment('activarcuenta', {
                    templateUrl: 'views/main/inicio.html',
                    controller: 'accountActivationCtrl',
                    dependencies:['code']
                })
                .up()

            .when('/mystic',    'mystic.home')
            .when('/mystic/:categoria',    'mystic.byCat')
            .when('/mystic/detalles/:id',    'mystic.detalles')
            .segment('mystic', {
                templateUrl: 'views/mystic/public/menu.html',
                controller: 'mysticHomeCtrl'
            })
            .within()
                .segment('home', {
                    templateUrl: 'views/mystic/public/inicio.html',
                    controller: 'mysticInicioCtrl',
                    default: true
                })
                .segment('byCat', {
                    templateUrl: 'views/mystic/public/inicio.html',
                    controller: 'mysticByCatCtrl',
                    dependencies: ['categoria']
                })
                .up()

  })

app.config(function (LightboxProvider) {
  LightboxProvider.templateUrl = 'views/fotografia/modalShowImg.html';
});