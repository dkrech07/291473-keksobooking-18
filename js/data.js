'use strict';

(function () {
  window.data = {
    ADS_NUMBER: 8,
    pinLoadHandler: function (pinList) {
      window.drawPins(pinList);
    },
    errorHandler: function () {
      console.log('error');
    },
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
