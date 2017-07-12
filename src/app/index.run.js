(function() {
  'use strict';

  angular
    .module('fotos')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
