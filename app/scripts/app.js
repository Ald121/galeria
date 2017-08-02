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
    'bootstrapLightbox'
  ]);

app.config(function ($routeSegmentProvider, $routeProvider,$locationProvider) {
      $routeSegmentProvider.options.autoLoadTemplates = true; 
      $routeSegmentProvider    
            .when('/',    'main')
            .when('/fotografia/:categoria',    'main.fotografia')        
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
            });
  })

app.config(function (LightboxProvider) {
  LightboxProvider.templateUrl = 'views/fotografia/modalShowImg.html';
});