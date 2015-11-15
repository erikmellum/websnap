var userController = angular.module('UserController', [])

userController.controller('UserCtrl', ['$scope', function($scope){
  $scope.all_users = [];
  $scope.retrieve=function(){
    var query = new Parse.Query(Parse.User);
    query.find({
      success: function(results) {
        $scope.all_users=results;
        $scope.$apply();
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  }
  $scope.retrieve();
}])
