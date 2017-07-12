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
                      {nombre:'Inicio',link:'/',icon:'',child:[]},
                      {nombre:'Contactos',link:'/Contactos',icon:'',child:[]},
                      {nombre:'Fotografias',link:'/',icon:'',child:[
                        {nombre:'Corportivas',link:'/fotografia/Corportivas',icon:'',child:[]},
                        {nombre:'Bodas',link:'/fotografia/Bodas',icon:'',child:[]},
                        {nombre:'Retratos',link:'/fotografia/Retratos',icon:'',child:[]},
                        {nombre:'Fashion',link:'/fotografia/Fashion',icon:'',child:[]},
                        {nombre:'Editorial',link:'/fotografia/Editorial',icon:'',child:[]}
                      ]},
                      {nombre:'Workshop',link:'/',icon:'',child:[]},
                      {nombre:'Videos',link:'/',icon:'',child:[]},
                      {nombre:'Productos',link:'/',icon:'',child:[]},
                      {nombre:'Ingreso ',link:'/',icon:'',child:[]},
                    ];
    $scope.goTo=function(link){
      $location.path(link);
    }
  });
