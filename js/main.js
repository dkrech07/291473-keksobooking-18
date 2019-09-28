'use strict';

var ADS_NUMBER = 8;
var MIN_X = 1200;
var MAX_X = 0;
var MIN_Y = 130;
var MAX_Y = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var TYPES_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var CHECKS_TIME = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_LIST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TYPES_HOUSING_RU = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var MARK_WIDTH = 62;
var MARK_HEIGHT = 84;
var NUMBERS_SEATS = {
  '1': [1],
  '2': [2, 1],
  '3': [3, 2, 1],
  '100': [0]
};

var mark = document.querySelector('.map__pin--main');
var inputRoomNumber = document.querySelector('#room_number');
var inputSeatsNumber = document.querySelector('#capacity');
var inputSeatsOption = inputSeatsNumber.querySelectorAll('option');

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
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var element = template.cloneNode(true);

  element.style.left = advertisement.location.x - (PIN_WIDTH / 2) + 'px';
  element.style.top = advertisement.location.y - PIN_HEIGHT + 'px';
  element.querySelector('img').src = advertisement.author.avatar;
  element.querySelector('img').alt = advertisement.offer.title;

  return element;
};

var drawPins = function (adsList) {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < adsList.length; i++) {
    var pin = renderPin(adsList[i]);
    pin.id = [i];
    fragment.appendChild(pin);
  }

  return mapPins.appendChild(fragment);
};

var removeChild = function (element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

var renderFeatures = function (list) {
  var template = document.querySelector('#card').content.querySelector('.popup__features');
  var element = template.cloneNode(true);
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < list.length; i++) {
    var currentElement = element.querySelector('.popup__feature--' + list[i]);
    fragment.appendChild(currentElement);
  }

  return fragment;
};

var renderPhotos = function (photos) {
  var template = document.querySelector('#card').content.querySelector('.popup__photos .popup__photo');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    var element = template.cloneNode(true);
    element.src = photos[i];
    fragment.appendChild(element);
  }

  return fragment;
};

var renderMapCard = function (advertisement) {
  var template = document.querySelector('#card').content.querySelector('.map__card');
  var mapCard = template.cloneNode(true);

  mapCard.querySelector('.popup__title').textContent = advertisement.offer.title;
  mapCard.querySelector('.popup__text--address').textContent = advertisement.offer.address;
  mapCard.querySelector('.popup__text--price').textContent = advertisement.offer.price + '₽/ночь';
  mapCard.querySelector('.popup__type').textContent = TYPES_HOUSING_RU[advertisement.offer.type];
  mapCard.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
  mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
  removeChild(mapCard.querySelector('.popup__features'));
  mapCard.querySelector('.popup__features').appendChild(renderFeatures(advertisement.offer.features));
  mapCard.querySelector('.popup__description').textContent = advertisement.offer.description;
  removeChild(mapCard.querySelector('.popup__photos'));
  mapCard.querySelector('.popup__photos').appendChild(renderPhotos(advertisement.offer.photos));
  mapCard.querySelector('.popup__avatar').src = advertisement.author.avatar;

  return mapCard;
};

var drawMapCard = function (adsNumber) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderMapCard(createAds(ADS_NUMBER)[adsNumber]));

  return document.querySelector('.map .map__filters-container').before(fragment);
};

var activateAdsForm = function () {
  var adsForm = document.querySelector('.ad-form');
  adsForm.classList.remove('ad-form--disabled');
};

var disableInput = function (input, status) {
  var inputs = document.querySelectorAll(input);
  for (var i = 0; i < inputs.length; i++) {
    if (status) {
      inputs[i].disabled = true;
    } else {
      inputs[i].disabled = false;
    }
  }
  return inputs;
};

var disableAllInputs = function (status) {
  disableInput('fieldset', status);
  disableInput('select', status);
  disableInput('input', status);
};

disableAllInputs(true);

var getMarkPosition = function () {
  return {
    x: mark.offsetLeft,
    y: mark.offsetTop
  };
};

var drawMarkPosition = function (width, height) {
  var inputAddress = document.querySelector('#address');
  inputAddress.value = (getMarkPosition().x + width) + ', ' + (getMarkPosition().y + height);
};

drawMarkPosition(MARK_WIDTH / 2, MARK_WIDTH / 2);

var markClickHandler = function () {
  mapActivate();

  activateAdsForm();

  disableAllInputs(false);

  drawPins(createAds(ADS_NUMBER));
  drawMarkPosition(MARK_WIDTH / 2, MARK_HEIGHT);

  addPinClickHandler();

  mark.removeEventListener('mousedown', markClickHandler);
  mark.removeEventListener('keydown', enterPressHandler);
};

var enterPressHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    markClickHandler();
  }
};

mark.addEventListener('mousedown', markClickHandler);

mark.addEventListener('keydown', enterPressHandler);

var roomNumberClickHandler = function () {
  for (var i = 0; i < inputSeatsOption.length; i++) {
    inputSeatsOption[i].disabled = true;
  }
  for (var j = 0; j < NUMBERS_SEATS[inputRoomNumber.value].length; j++) {
    var number = NUMBERS_SEATS[inputRoomNumber.value][j];

    for (var k = 0; k < inputSeatsOption.length; k++) {
      var seat = inputSeatsOption[k].value;
      if (String(number) === seat) {
        inputSeatsOption[k].disabled = false;
      }
    }
  }
};

inputRoomNumber.addEventListener('click', function () {
  roomNumberClickHandler();
});

var addPinClickHandler = function () {
  var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');

  var closePopUpAuto = function () {
    var map = document.querySelector('.map');
    var popUp = document.querySelector('.map__card');
    if (popUp) {
      map.removeChild(popUp);
    }
  };

  var closePopUp = function () {
    var map = document.querySelector('.map');
    var popUp = document.querySelector('.map__card');
    var closeButton = popUp.querySelector('.popup__close');
    var removeElement = function () {
      map.removeChild(popUp);
      addListen();
    };
    closeButton.addEventListener('click', removeElement);
    closeButton.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        removeElement();
      }
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        removeElement();
      }
    });
  };

  var openPopUp = function (evt, key, handler) {
    var target = evt.currentTarget;
    var number = target.id;
    drawMapCard(number);
    addListen();
    mapPin[number].removeEventListener(key, handler);

  };

  var pinClickHandler = function (evt) {
    closePopUpAuto();
    openPopUp(evt, 'click', pinClickHandler);
    closePopUp();
  };

  var enterKeyDownHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopUpAuto();
      openPopUp(evt, 'keydown', enterKeyDownHandler);
      closePopUp();
    }
  };

  var addListen = function () {
    for (var i = 0; i < mapPin.length; i++) {
      mapPin[i].addEventListener('click', pinClickHandler);
      mapPin[i].addEventListener('keydown', enterKeyDownHandler);
    }
  };
  addListen();
};

var validationInput = function () {
  var adsForm = document.querySelector('.ad-form');
  var inputTitle = adsForm.querySelector('#title');
  var inputPrice = adsForm.querySelector('#price');

  inputTitle.addEventListener('invalid', function () {
    if (inputTitle.validiti.tooShort) {
      inputTitle.setCustomValidity('Минимальная длина — 30 символов');
    } else if (inputTitle.validiti.tooLong) {
      inputTitle.setCustomValidity('Максимальная длина — 100 символов');
    } else if (inputTitle.validiti.valueMissing) {
      inputTitle.setCustomValidity('Обязательное поле');
    }
  });

  inputPrice.addEventListener('invalid', function () {
    if (inputPrice.validiti.tooLong) {
      inputPrice.setCustomValidity('Максимальное значение — 1 000 000');
    } else if (inputPrice.validiti.valueMissing) {
      inputPrice.setCustomValidity('Обязательное поле');
    }
  });


};

validationInput();
