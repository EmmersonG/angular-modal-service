describe('template', function() {

  var ModalService = null;
  var rootScope = null;
  var $httpBackend = null;

  angular.module('templatetests', ['angularModalService'])
    .controller('TemplateController', function ($scope) {
    });

  beforeEach(function() {
    module('templatetests');
    inject(function(_ModalService_, $rootScope, $injector) {
      ModalService = _ModalService_;
      rootScope = $rootScope;
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'some/template.html').respond("<div>template</div>");
      $httpBackend.when('GET', 'some/invalid/template.html').respond(404, 'Not Found');
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should http get the specified template url', function() {

    $httpBackend.expectGET('some/template.html');

    ModalService.showModal({
      controller: "TemplateController",
      templateUrl: "some/template.html"
    }).then(function(modal) {
      expect(modal).not.toBe(null);
    });

    $httpBackend.flush();
  
  });

  it('should fail to get an invalid template url', function() {

    ModalService.showModal({
      controller: "TemplateController",
      templateUrl: "some/invalid/template.html"
    }).then(function(modal) {
      
    }).catch(function(error) {
      expect(error).not.toBe(null);
    });

    $httpBackend.flush();
  
  });

});