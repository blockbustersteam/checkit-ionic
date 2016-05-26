angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})



.factory('Products', function() {

  // Stubbing until webservices available
  var products = [
  {
    id: 0,
    text: "9310059062371",  
    format: "EAN_13",
    productName: "Codral Cold and Flu",
    manufacturer: "Johnson & Johnson",
    batch: "650783",
    expiry: "Dec 2018",
    picture: 'img/products/codral-day-night.png',
    trackedLocation: "Chemist Warehouse, Lane Cove"
  }


  ];

  return {
    all: function() {
      return products;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(productId) {
      for (var i = 0; i < products.length; i++) {
        if (products[i].id === parseInt(productId)) {
          return products[i];
        }
      }
      return null;
    },
        getByBarcode: function(inputText, inputFormat) {
      for (var i = 0; i < products.length; i++) {
        if (products[i].format === inputFormat) {
          if(products[i].text === inputText){

          
          return products[i];
          }
        }
      }
      
  }
}});
