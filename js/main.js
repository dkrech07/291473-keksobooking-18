'use strict';

var ADS_NUMBER = 8;

var typeHousing = ['palace', 'flat', 'house', 'bungalo'];
var checkTime = ['12:00', '13:00', '14:00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandom = function (number) {
  return Math.floor(Math.random() * number);
};

var getRandomFeatures = function (list) {
  list.length = getRandom(list.length);
  return list;
};

var shuffleElement = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

var createAds = function (ads) {
  var adsArray = [];
  for (var i = 0; i < ads; i++) {
    var advert = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: 'Заголовок объявления',
        address: '600, 350',
        price: 50000,
        type: typeHousing[getRandom(typeHousing.length)],
        rooms: 5,
        guests: 6,
        checkin: checkTime[getRandom(checkTime.length)],
        checkout: checkTime[getRandom(checkTime.length)],
        features: getRandomFeatures(featuresList),
        description: 'строка с описанием',
        photos: shuffleElement(photos)
      },

      location: {
        x: 100,
        y: 200
      }

    };

    adsArray[i] = advert;
  }

  return adsArray;
};

createAds(ADS_NUMBER);
console.log(createAds(ADS_NUMBER));

var map = document.querySelector('.map');
map.classList.remove('map--faded');
