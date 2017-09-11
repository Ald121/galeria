angular.module('fotosApp')
  .controller('commonDeleteCtrl', function ($scope,item,$uibModalInstance) {

    $scope.close = function() {
        $uibModalInstance.close();
    }

    $scope.deleteImage = function(){
      $uibModalInstance.close('Y');
    }
  });

  