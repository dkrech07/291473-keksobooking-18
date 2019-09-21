'use strict';

var ADS_NUMBER = 8;
var MIN_X = 1200;
var MAX_X = 0;
var MIN_Y = 130;
var MAX_Y = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var TYPE_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_LIST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandom = function (number) {
  return Math.floor(Math.random() * number);
};

var getRandomDouble = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomList = function (array) {
  var newArray = Array.from(array);
  newArray.length = getRandom(array.length) + 1;

  return newArray;
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
        price: 10000,
        type: TYPE_HOUSING[getRandom(TYPE_HOUSING.length)],
        rooms: 5,
        guests: 6,
        checkin: CHECK_TIME[getRandom(CHECK_TIME.length)],
        checkout: CHECK_TIME[getRandom(CHECK_TIME.length)],
        features: getRandomList(FEATURES_LIST),
        description: 'строка с описанием',
        photos: getRandomList(PHOTOS_LIST)
      },

      location: {
        x: getRandomDouble(MIN_X, MAX_X),
        y: getRandomDouble(MIN_Y, MAX_Y)
      }
    };
    adsArray.push(advert);
  }

  return adsArray;
};

var mapActivate = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
};

var renderPin = function (advertisement) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = advertisement.location.x - (PIN_WIDTH / 2) + 'px';
  pinElement.style.top = advertisement.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = advertisement.author.avatar;
  pinElement.querySelector('img').alt = advertisement.offer.title;

  return pinElement;
};

var drawPins = function (adsList) {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < adsList.length; i++) {
    fragment.appendChild(renderPin(adsList[i]));
  }

  return mapPins.appendChild(fragment);
};

mapActivate();
drawPins(createAds(ADS_NUMBER));
