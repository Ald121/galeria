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
    'ngStorage'
  ]);

app.run(function($rootScope,$window,userService,toastr,$localStorage) {
    $rootScope.$on("$locationChangeStart", function(event, next, current) {
        if ($localStorage.user) {
            userService.checkSession().then(function(r){
            }).catch(function(e){
              var toast = toastr.error('Ups! tu sesión ha caducado', 'Error',{
                closeButton: true,
                 timeOut: 2000,
              });
              $window.location.reload();
            });
        }
    });
});

app.config(function ($routeSegmentProvider, $routeProvider,$locationProvider) {
      $routeSegmentProvider.options.autoLoadTemplates = true; 
      $routeSegmentProvider    
            .when('/',    'main')
            .when('/administration',    'administration')
            .when('/administration/images',    'administration.images')
            .when('/fotografia/:categoria',    'main.fotografia')
            .when('/activarcuenta/:code',    'main.activarcuenta')
            .segment('administration', {
                templateUrl: 'views/administration/index.html',
                controller: 'administrationCtrl'
            }).within()
                .segment('images', {
                    templateUrl: 'views/administration/images/index.html',
                    controller: 'administrationImagesCtrl',
                    default: true
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
                .up()

  })

app.config(function (LightboxProvider) {
  LightboxProvider.templateUrl = 'views/fotografia/modalShowImg.html';
});