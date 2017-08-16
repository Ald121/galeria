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
    'toastr'
  ]);

app.config(function ($routeSegmentProvider, $routeProvider,$locationProvider) {
      $routeSegmentProvider.options.autoLoadTemplates = true; 
      $routeSegmentProvider    
            .when('/',    'main')
            .when('/fotografia/:categoria',    'main.fotografia')
            .when('/activarcuenta/:code',    'main.activarcuenta')         
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

  })

app.config(function (LightboxProvider) {
  LightboxProvider.templateUrl = 'views/fotografia/modalShowImg.html';
});