var messagesController = angular.module('MessagesController', ['foundation.core'])

messagesController.controller('MessagesCtrl', ['$scope', 'FoundationApi', '$timeout', function($scope, foundationApi, $timeout){
  $scope.timer = {};//can hold multiple timers simultaneously
  $scope.url = '';//url to the image being displayed
  $scope.messages = [];//list of messages
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
      }
    });
  }
  $scope.retrieveMessages = function(){
    var query = new Parse.Query($scope.Message);
    query.find({
      success: function(messages) {
        $scope.messages = [];
        for(var i=0; i<messages.length; i++){
          if($scope.user.id == messages[i].get('user')['objectId']) {
            $scope.messages.push(messages[i])
          }
        }
        $scope.$apply();
      },
      error: function(error) {
        console.log(error.code + ": " + error.message )
      }
    });
  }
  $scope.retrieveMessages();
}])
