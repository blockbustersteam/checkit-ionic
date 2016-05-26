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

.controller('VerifyCtrl', function($scope, $stateParams, $cordovaBarcodeScanner, Products, $location, $http) {
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
          //"text": "Q0SRQGNM18KCXW7",
          "text": "9300605042421",
          "format": "EAN_13",
          "cancelled": false
      }
      $scope.product = Products.getByBarcode($scope.barcode.text);
                var config = {
                headers : {
                    //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }
            }
            
      // $http.post('http://checkit-web-kathyz-013.mybluemix.net/getItemsWithID', $scope.barcode.text, config).then(function(resp) {
      //   console.log(resp.data);
      // })
      
      
//How to scope out 
  $location.path('/tab/verify-detail/'+$scope.barcode.text);
//$location.path('/tab/verify-detail/')

  }

//   $scope.scanBarcode = function() {
//         $cordovaBarcodeScanner.scan().then(function(imageData) {
//           $scope.barcode = imageData;
//             alert(imageData.text);
//             console.log("Barcode Format -> " + imageData.format);
//             console.log("Cancelled -> " + imageData.cancelled);
            
//             $scope.product = Products.getByBarcode($scope.barcode.text, $scope.barcode.format);
// $scope.product = $http.post()



//         }, function(error) {
//             console.log("An error happened -> " + error);
//         });
        

//     };

//copied over
  $scope.scanBarcode = function() {
   console.log("scan");
      $cordovaBarcodeScanner.scan().then(function(imageData) {
  
          console.log("Barcode Format -> " + imageData.format);
          console.log("Cancelled -> " + imageData.cancelled);
          
          //alert("imageData.text: " + imageData.text)
          //alert("imageData: " + imageData)

          if(!imageData.cancelled){
            
            var cData = {itemId:imageData.text}
                  alert("cData: " + cData);

            $scope.getItemDetails(cData);
          }

      }, function(error) {
          console.error('ERR', err);
          alert("Houston we've got a problem!")
      })
    
  };


$scope.getItemDetails = function(cData) {
  alert('Connecting to Server')
      $scope.showLoading();
      //$http.post(appServerUrl+'getBatch',cData).then(function(resp) {
      //$http.post('http://sc-web-kathyz-2038.mybluemix.net/'+'getBatch',cData).then(function(resp) {
  $http.post('192.168.8.106:3000/'+'getItemsWithID',cData).then(function(resp) {

      console.log("--- Get New Batch Details",resp.data);
      alert('response:' + resp);
      alert('response.data:' + resp.data);

      var batchDet = resp.data;
      $scope.batchTransactions = [];
      $scope.batchItem = {};
    //   if(batchDet){
    //     $scope.batchItem = {type:batchDet.bType, id:batchDet.id};
    //     for(var i=0; i<batchDet.transactions.length; i++){
    //       var tx = batchDet.transactions[i];
    //       var litem;
    //       if(tx.ttype == "CREATE"){
    //         litem = {avatar:"ion-ios-box-outline", date: tx.vDate, location: tx.location, desc:"ADDED BY ", owner:tx.owner};
    //       }
    //       else if(tx.ttype == "CLAIM"){
    //         litem = {avatar:"ion-ios-barcode-outline", date: tx.vDate, location: tx.location, desc:"PICKED UP BY ", owner:tx.owner};
    //       }
    //       else if(tx.ttype == "TRANSFER"){
    //         litem = {avatar:"ion-ios-shuffle", date: tx.vDate, location: tx.location, desc:"DELIVERED TO ", owner:tx.owner};
    //       }
    //       else if(tx.ttype == "SELL" && tx.owner == "CONSUMER"){
    //         litem = {avatar:"ion-ios-cart-outline", date: tx.vDate, location: tx.location, desc:"SOLD TO ", owner:tx.owner};
    //       }
    //       else if(tx.ttype == "UPDATE QUALITY"){
    //         litem = {ttype:tx.ttype, avatar:"ion-ios-bolt-outline", date: tx.vDate, location: tx.location, desc:"QUALITY IMPACTED DUE TO HIGH T°", owner:""};
    //       }
    //       if(litem){
    //         $scope.batchTransactions.push(litem);
    //       }
    //     }
    //     $scope.hideLoading(); 
    //     $scope.openTrackerModal();
    //   }
     
    }, function(err) {
      $scope.hideLoading();
      console.error('ERR', err);
      alert("Houston we've got a problem!")
    })
  };

$scope.item = {
  "barcode":"9300605042421",
  "productname":"Nivea Soft Moisturising Cream",
  "productimage":"",
  "expdate":"n/a",
  "batchno":"54830974"
}

  
$scope.clearProduct = function(){
  $scope.barcode = null;
  $scope.product = null;
}

})


.controller('VerifyDetailCtrl', function($scope, $stateParams, Products) {

$scope.itemId=$stateParams.itemId;
      $scope.product = Products.getByBarcode($scope.itemId);
      console.log($scope.itemId)
      console.log($scope.product)
})



.controller('WalletCtrl', function($scope, $stateParams) {
  //$scope.chat = Chats.get($stateParams.chatId);
})