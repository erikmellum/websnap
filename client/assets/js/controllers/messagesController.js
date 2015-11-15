var messagesController = angular.module('MessagesController', ['foundation.core'])

messagesController.controller('MessagesCtrl', ['$scope', 'FoundationApi', '$timeout', function($scope, foundationApi, $timeout){
  $scope.timer = {};
  $scope.url = '';
  $scope.messages = [];
  $scope.username = ''
  $scope.showImage=function(modalId, url, message){
      message.set('viewed', true);
      message.save();
      $scope.url=url
      foundationApi.publish(modalId, 'open')
      var timer = function(){
        $scope.timer[modalId] -= 100;
        if($scope.timer[modalId] > 0) $timeout(timer,100);
        else{
          $scope.url='';
          $scope.destroyMessage(message);
        }
      }
      if(!$scope.timer[modalId]) $scope.timer[modalId] = 15000;
      $timeout(timer,100);
  }
  $scope.destroyMessage = function(message){
    message.destroy({
      success: function(message) {
        $scope.retrieveMessages();
      },
      error: function(message, error) {
        // The delete failed.
        // error is a Parse.Error with an error code and message.
      }
    });
  }
  $scope.retrieveMessages = function(){
    var query = new Parse.Query($scope.Message);
    query.find({
      success: function(messages) {
        //console.log(JSON.stringify(messages))
        $scope.messages = [];
        for(var i=0; i<messages.length; i++){
          if($scope.user.id == messages[i].get('user')['objectId']) {
            $scope.messages.push(messages[i])
          }
        }
        $scope.$apply();
        // comments now contains the comments for posts with images.
      },
      error: function(error) {
        console.log(error.code + ": " + error.message )
        // The login failed. Check error to see why.
      }
    });
  }
  $scope.retrieveMessages();
}])
