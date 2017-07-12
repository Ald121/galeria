'use strict';

describe('Controller: FotografiactrlCtrl', function () {

  // load the controller's module
  beforeEach(module('fotosApp'));

  var FotografiactrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FotografiactrlCtrl = $controller('FotografiactrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FotografiactrlCtrl.awesomeThings.length).toBe(3);
  });
});
