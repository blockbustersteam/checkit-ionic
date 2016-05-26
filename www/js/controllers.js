angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate){
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.toggleRight = function() {
    $ionicSideMenuDelegate.toggleRight();
  };


 
})

.controller('LoginCtrl', function($scope, $state){
  console.log('Testing')
  $scope.signIn = function(){
    $state.go('tab.verify');
      console.log('signing in');
  }
})

.controller('DashCtrl', function($scope) {})

// .controller('ChatsCtrl', function($scope, Chats) {
//   // With the new view caching in Ionic, Controllers are only called
//   // when they are recreated or on app start, instead of every page change.
//   // To listen for when this page is active (for example, to refresh data),
//   // listen for the $ionicView.enter event:
//   //
//   //$scope.$on('$ionicView.enter', function(e) {
//   //});

//   $scope.chats = Chats.all();
//   $scope.remove = function(chat) {
//     Chats.remove(chat);
//   };
// })

// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })

// .controller('AccountCtrl', function($scope) {
//   $scope.settings = {
//     enableFriends: true
//   };
// })

.controller('VerifyCtrl', function($scope, $stateParams, $cordovaBarcodeScanner, Products) {
  //$scope.chat = Chats.get($stateParams.chatId);

  //   document.addEventListener("deviceready", function () {

  //   $cordovaBarcodeScanner
  //     .scan()
  //     .then(function(barcodeData) {
  //       // Success! Barcode data is here
  //     }, function(error) {
  //       // An error occurred
  //     });


  //   // NOTE: encoding not functioning yet
  //   $cordovaBarcodeScanner
  //     .encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com")
  //     .then(function(success) {
  //       // Success!
  //     }, function(error) {
  //       // An error occurred
  //     });

  // }, false);
$scope.product=null;

  $scope.scanBarcodeStub = function() {
      $scope.barcode={
          "text": "9310059062371",
          "format": "EAN_13",
          "cancelled": false
      }
      $scope.product = Products.getByBarcode($scope.barcode.text, $scope.barcode.format);
//How to scope out 
$location.path('/tab-verify-detai')

  }

  $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
          $scope.barcode = imageData;
            alert(imageData.text);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
            $scope.product = Products.getByBarcode($scope.barcode.text, $scope.barcode.format);

        }, function(error) {
            console.log("An error happened -> " + error);
        });
        

    };

$scope.clearProduct = function(){
  $scope.barcode = null;
  $scope.product = null;
}



})
.controller('WalletCtrl', function($scope, $stateParams) {
  //$scope.chat = Chats.get($stateParams.chatId);
})