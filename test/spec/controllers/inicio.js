'use strict';

describe('Controller: InicioctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('fotosApp'));

  var InicioctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InicioctrlCtrl = $controller('InicioctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InicioctrlCtrl.awesomeThings.length).toBe(3);
  });
});
