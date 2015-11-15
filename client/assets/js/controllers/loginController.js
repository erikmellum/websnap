var loginController = angular.module('LoginController', ['foundation.core'])

loginController.controller('LoginCtrl', ['$scope', '$rootScope', '$state', 'FoundationApi', '$window',
 function($scope, $rootScope, $state, foundationApi, $window){
  $scope.username = '';
  $scope.login=function(username, password){
    Parse.User.logIn(username, password, {
      success: function(user) {
        $rootScope.user = Parse.User.current();
        $scope.username = username;
        $scope.$apply();
        foundationApi.publish('main-notifications', { title: 'Logged in!', content: 'Welcome, ' + username , autoclose: '3000' });
        $state.go('snap')
        $window.sessionStorage.token = Parse.Session.sessionToken;
      },
      error: function(user, error) {
        $scope.error = error.code + ": " + error.message
        $scope.$apply();
      }
    });
  }
  $scope.signup=function(username, email, password, confirm){
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
    user.signUp(null, {
      success: function(user) {
        foundationApi.publish('main-notifications', { title: 'Signed up!', content: 'Successfully signed up!' , autoclose: '3000' });
        $rootScope.user = Parse.User.current();
        $state.go('snap')
        $window.sessionStorage.token = Parse.Session.sessionToken;
        $scope.username = username;
      },
      error: function(user, error) {
        $scope.error = error.message
        $scope.$apply();
      }
    });
  }
  $scope.signout=function(){
    Parse.User.logOut();
    delete $window.sessionStorage.token;
    var currentUser = Parse.User.current();  // this will now be null
    foundationApi.publish('main-notifications', { title: 'Logged out!', content: 'You have successfully logged out!' , autoclose: '3000' });
    $scope.username = '';
    $rootScope.user = '';
  }
}])
