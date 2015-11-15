(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',
    'controllers',
    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
    .config(config)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run($rootScope, $window) {
    FastClick.attach(document.body);
    Parse.initialize("cm1bcVNQrZJ1XCUKJSYIub7C2MqSxK8lzR5o9bCd", "1xbBZxRIRRV8Fc3HibtH6sOTnpmayA8lLNIC4BzW");
    if($window.sessionStorage.token) {
      $rootScope.user=Parse.User.current()
      $rootScope.$apply();
    }
    $rootScope.Message = Parse.Object.extend("Message", {
      initialize: function (attrs, options) {
        this.user = ""
        this.contents = ""
        this.image = ""
        this.viewed = false;
      }
    });
    $rootScope.currentUser = Parse.User.current();
    if ($rootScope.currentUser) {
        // do stuff with the user
    } else {
        // show the signup or login page
    }
  }

})();
