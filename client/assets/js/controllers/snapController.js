var snapController = angular.module('SnapController', ['foundation.core'])

snapController.controller('SnapCtrl', ['$scope', 'FoundationApi', '$state', function($scope, foundationApi, $state){
  $scope.users = [];
  $scope.send=function(content){
    var fileUploadControl = angular.element(document.querySelector('#image'))[0];
    if (fileUploadControl.files.length > 0) {
      var file = fileUploadControl.files[0];
      var name = Math.random().toString(36)
      var parseFile = new Parse.File(name, file);
      parseFile.save().then(function() {
        for(var i=0; i<$scope.users.length; i++){
          if($scope.users[i] !== '' && typeof($scope.users[i]) !== 'undefined' && $scope.users[i] !== null ){
            var message = new $scope.Message();
            message.set("contents", content);
            message.set("image", parseFile);
            message.set("user", $scope.users[i]);
            message.save(null, {
              success: function(message) {
                foundationApi.publish('main-notifications', { title: 'Successfully Sent!', content: 'Your message was successfully sent!' , autoclose: '3000' });
                console.log("MESssage Saved!" )
                var el = angular.element(document.querySelector('#image'))

                el.val('');
                console.log(JSON.stringify(message))
              },
              error: function(user, error) {
                console.log( error.code + ": " + error.message )
                $scope.$apply();
                // The login failed. Check error to see why.
              }
            });
          }
        }
      }, function(error) {
        console.log(error)
        // The file either could not be read, or could not be saved to Parse.
      });
    }
  }

  /**
  * Verify we get .png, .gif, or .jpg only
  **/
  var el = angular.element(document.querySelector('#image'))
  el.change(function(){
    var val = el.val();
    switch(val.substring(val.lastIndexOf('.') + 1).toLowerCase()){
      case 'gif': case 'jpg': case 'png':
        break;
      default:
        el.val('');
        // error message here
        alert("Images with .gif, .jpg, or .png extension only please.");
        break;
    }
  })

}])
