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
  $scope.signIn = function(user){
    $state.go('tab.verify');
      console.log('signing in');      
  }
})

.controller('DashCtrl', function($scope) {})

.controller('VerifyCtrl', function($scope, $stateParams, $cordovaBarcodeScanner, Products, $location, $http) {
 
            window.localStorage.setItem( 'stubscancount', 1 );
   
    
            $scope.sydney=true;
            
            
             if($scope.sydney){
                window.localStorage.setItem( 'userlocation', 'Barangaroo, Sydney, NSW, 2220' );
                window.localStorage.setItem( 'userdistance', 0.01 );


            } else {
                window.localStorage.setItem( 'userlocation', 'Siem Reap, Cambodia ' );
                window.localStorage.setItem( 'userdistance', 7106 );

            }
            $scope.updatelocation = function(){
                
              $scope.sydney=!$scope.sydney;
              
              
              if($scope.sydney){
                  window.localStorage.setItem( 'userlocation', 'Barangaroo, Sydney, NSW, 2220' );
                  window.localStorage.setItem( 'userdistance', 0.01 );


                } else {
                    window.localStorage.setItem( 'userlocation', 'Siem Reap, Cambodia ' );
                    window.localStorage.setItem( 'userdistance', 7106 );

                }
                $scope.userlocation = window.localStorage.getItem('userlocation')

            }
            
            
            
  $scope.product=null;

  $scope.scanBarcodeStub = function() {
    console.log("inside scan stub")
      $scope.barcode={
          "text": "3Z945S5JGV1H3DK",
          //"text": "9300605042421",
          "format": "EAN_13",
          "cancelled": false
      }

      
      
    $location.path('/tab/verify-detail/'+$scope.barcode.text);
    //$location.path('/tab/verify-detail/')
  }
  $scope.scanBarcode = function() {
   console.log("scan");
      $cordovaBarcodeScanner.scan().then(function(imageData) {
  
          console.log("Barcode Format -> " + imageData.format);
          console.log("Cancelled -> " + imageData.cancelled);
          
          //alert("imageData.text: " + imageData.text)
          //alert("imageData: " + imageData)

          if(!imageData.cancelled){
            
           

           // $scope.getItemDetails(cData);
            //  $location.path('/tab/verify-detail/'+ cData);
            //6CBGMU8E89ZQ4AB
            // alert(imageData.text)
             $location.path('/tab/verify-detail/'+ imageData.text);

          }

      }, function(error) {
          console.error('ERR', err);
          alert("Houston we've got a problem!")
      })
    
  };



  
$scope.clearProduct = function(){
  $scope.barcode = null;
  $scope.product = null;
}

})


.controller('VerifyDetailCtrl', function($scope, $stateParams, Products, $http) {


$scope.itemId=$stateParams.itemId;

        
            $scope.distance={};
            $scope.distance.value = window.localStorage.getItem('userdistance');
            $scope.distance.text = window.localStorage.getItem('userdistance');
            console.dir($scope.distance)
            console.log($scope.distance.value);
            $scope.userlocation = window.localStorage.getItem('userlocation')
            
            
     
                var config = {
                headers : {
                    //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }
            } 
            
         console.log($scope.itemId)
      //   $http.post('http://192.168.8.115:3000/getItemsWithID', {"itemId": $scope.itemId}, config).then(function(resp) {     
      //   $http.post('http://checkit-web-final-kathyz-759.mybluemix.net/getItemsWithID', {itemId: $scope.itemId}, config).then(function(resp) {

            //putting fake url so it will timeout faster...
             $http.post('bbb', {"itemId": $scope.itemId}, config).then(function(resp) {     
alert('response:')
            console.log(resp.data);
            $scope.product=resp.data;
              
              
            //placeholders for now
            //$scope.product.scancount=0;
            $scope.product.image = 'img/products/codral-day-night.png';

         //alert($scope.product);
            var origin = window.localStorage.getItem( 'barangaroo' );
            var origin = window.localStorage.getItem( 'barangaroo-distance' );
            var destination = window.localStorage.getItem( 'cambodia-distance');
            var destination = window.localStorage.getItem( 'cambodia-distance');
            
            
            //var destination = resp.data.location;
            //var origin="Wynyard, Sydney, NSW, Australia";
         
        //  $http.post('http://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins='+origin+'&destinations='+destination).then(function(resp){          
        //     console.log(resp.data);
        //     console.log(resp.data.rows[0].elements[0].distance);
        //     $scope.distance = resp.data.rows[0].elements[0].distance;
        //     $scope.distance.value=499;
            
        //  })
       }, function(){
         
         console.log('could not connect')
              //  alert.log('could not connect')
          $scope.product = Products.getByBarcode($scope.itemId);
      
          $scope.product.image = 'img/products/codral-day-night.png';
          
          $scope.product.scancount = window.localStorage.getItem( 'stubscancount');
          //incrementing for demo scan mode
          window.localStorage.setItem( 'stubscancount', parseInt(window.localStorage.getItem( 'stubscancount')) + 1 );
      
   
         
         
       })
       

         
      console.log($scope.itemId)
      console.log($scope.product)
      
      
      
})



.controller('WalletCtrl', function($scope, $stateParams) {
  //$scope.chat = Chats.get($stateParams.chatId);
})