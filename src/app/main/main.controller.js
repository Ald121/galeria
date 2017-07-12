(function() {
  'use strict';

  angular
    .module('fotos')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope,$timeout, webDevTec, toastr) {
    var vm = $scope;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1499655526160;
    vm.showToastr = showToastr;
    vm.menuSuperior=[
                      {nombre:'Contactos',link:'/',icon:'',child:[]},
                      {nombre:'Inicio',link:'/',icon:'',child:[]},
                      {nombre:'Fotografias',link:'/',icon:'',child:[
                        {nombre:'Corportivas',link:'/',icon:'',child:[]},
                        {nombre:'Bodas',link:'/',icon:'',child:[]},
                        {nombre:'Retratos',link:'/',icon:'',child:[]},
                        {nombre:'Fashion',link:'/',icon:'',child:[]},
                        {nombre:'Editorial',link:'/',icon:'',child:[]}
                      ]},
                      {nombre:'Workshop',link:'/',icon:'',child:[]},
                      {nombre:'Videos',link:'/',icon:'',child:[]},
                      {nombre:'Productos',link:'/',icon:'',child:[]},
                      {nombre:'Ingreso ',link:'/',icon:'',child:[]},
                    ];
    vm.imgs=[{dir:'../assets/images/corporativa.jpg',colspan:4,rowspan:2}]
    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
