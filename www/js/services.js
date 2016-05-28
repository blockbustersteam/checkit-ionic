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
    "id": 0,
    "manufacturer": "Johnson & Johnson",
    //picture: 'img/products/codral-day-night.png',
    "location": "200 Barangaroo ave, Sydney, Australia",
    "origin": "Australia",
    "scancount": "0",
    "barcode":"3Z945S5JGV1H3DK",
    "name":"Codral cold and flu",
    "image":"codral-day-night.png",
    "expdate":"Dec 2018",
    "batchno":"54830974",
    "currentowner": "Chemist Warehouse"
  }


  ];

  return {
    all: function() {
      return products;
    },
    get: function(productId) {
      for (var i = 0; i < products.length; i++) {
        if (products[i].id === parseInt(productId)) {
          return products[i];
        }
      }
      return null;
    },
        getByBarcode: function(inputText) {
          console.log('service; Getting by barcode: ', inputText)
      for (var i = 0; i < products.length; i++) {
        //if (products[i].format === inputFormat) {
          if(products[i].barcode === inputText){          
            return products[i];
          }
        
      }
      
  }
}});
