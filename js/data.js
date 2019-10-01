'use strict';

(function () {
  window.data = {
    ADS_NUMBER: 8,
    renderPhotos: function (photos) {
      var template = document.querySelector('#card').content.querySelector('.popup__photos .popup__photo');
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < photos.length; i++) {
        var element = template.cloneNode(true);
        element.src = photos[i];
        fragment.appendChild(element);
      }

      return fragment;
    },
    renderFeatures: function (list) {
      var template = document.querySelector('#card').content.querySelector('.popup__features');
      var element = template.cloneNode(true);
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < list.length; i++) {
        var currentElement = element.querySelector('.popup__feature--' + list[i]);
        fragment.appendChild(currentElement);
      }

      return fragment;
    },
    createAds: function (ads) {
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
            type: TYPES_HOUSING[getRandom(TYPES_HOUSING.length)],
            rooms: 5,
            guests: 6,
            checkin: CHECKS_TIME[getRandom(CHECKS_TIME.length)],
            checkout: CHECKS_TIME[getRandom(CHECKS_TIME.length)],
            features: getRandomList(FEATURES_LIST),
            description: 'строка с описанием',
            photos: getRandomList(PHOTOS_LIST)
          },

          location: {
            x: getRandomDouble(window.marker.MIN_X, window.marker.maxX),
            y: getRandomDouble(window.marker.MIN_Y, window.marker.MAX_Y)
          }
        };
        adsArray.push(advert);
      }

      return adsArray;
    }
  };

  var TYPES_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKS_TIME = ['12:00', '13:00', '14:00'];
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
})();
