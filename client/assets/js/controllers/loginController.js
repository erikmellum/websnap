var loginController = angular.module('LoginController', ['foundation.core'])

loginController.controller('LoginCtrl', ['$scope', '$rootScope', '$state', 'FoundationApi',
 function($scope, $rootScope, $state, foundationApi){
  $scope.username = '';
  $scope.login=function(username, password){
    Parse.User.logIn(username, password, {
      success: function(user) {
        $rootScope.user = Parse.User.current();
        $scope.username = username;
        $scope.$apply();
        foundationApi.publish('main-notifications', { title: 'Logged in!', content: 'Welcome, ' + username , autoclose: '3000' });
        $state.go('snap')
        // Do stuff after successful login.
      },
      error: function(user, error) {
        $scope.error = error.code + ": " + error.message
        $scope.$apply();
        // The login failed. Check error to see why.
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
        $scope.username = username;
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        $scope.error = error.message
        $scope.$apply();
        //alert("Error: " + error.code + " " + error.message);
      }
    });
  }
  $scope.signout=function(){
    Parse.User.logOut();
    var currentUser = Parse.User.current();  // this will now be null
    foundationApi.publish('main-notifications', { title: 'Logged out!', content: 'You have successfully logged out!' , autoclose: '3000' });
    $scope.username = '';
    $rootScope.user = '';
  }
}])
