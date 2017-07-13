'use strict';

/**
 * @ngdoc function
 * @name fotosApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fotosApp
 */
angular.module('fotosApp')
  .controller('MainCtrl', function ($scope,$location) {

     $scope.menuSuperior=[
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
                      {nombre:'Productos',link:'/',icon:'fa-product-hunt',child:[]},
                      {nombre:'Ingreso ',link:'/',icon:'fa-user-circle',child:[]},
                    ];
    $scope.goTo=function(link){
      $location.path(link);
    }
  });
