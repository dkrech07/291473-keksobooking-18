'use strict';

(function () {

  var MARK_START_X = 570;
  var MARK_START_Y = 375;
  var NUMBERS_SEATS = {
    '1': [1],
    '2': [2, 1],
    '3': [3, 2, 1],
    '100': [0]
  };
  var HOUSING_MIN_PRICES = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var adsForm = document.querySelector('.ad-form');
  var filterForm = document.querySelector('.map__filters');
  filterForm.classList.add('ad-form--disabled');
  var clearMap = adsForm.querySelector('.ad-form__reset');
  var formFeatures = adsForm.querySelectorAll('.feature__checkbox');

  window.form = {
    activateAdsForm: function () {
      adsForm.classList.remove('ad-form--disabled');
      filterForm.classList.remove('ad-form--disabled');
    },
    disableAllInputs: function (status) {
      disableInput('fieldset', status);
      disableInput('select', status);
      disableInput('input', status);
    },
    drawMarkPosition: function (width, height) {
      var inputAddress = document.querySelector('#address');
      inputAddress.value = (getMarkPosition().x + width) + ', ' + (getMarkPosition().y + height);
    },
    removePins: function () {
      var removablePins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      removablePins.forEach(function (it) {
        it.remove();
      });
    },
    removeCard: function () {
      var popUp = document.querySelector('.map__card');
      if (popUp) {
        popUp.remove();
      }
    },
    addClearMapListen: function () {
      var clearMapClickHandler = function () {
        resetMap();
        clearMap.removeEventListener('click', clearMapClickHandler);
      };
      clearMap.addEventListener('click', clearMapClickHandler);
    },
    checkSeatsOption: function () {
      inputSeatsOption.forEach(function (it) {
        it.disabled = true;
      });
      NUMBERS_SEATS[inputRoomNumber.value].forEach(function (it) {
        var number = it;
        inputSeatsOption.forEach(function (item) {
          var seat = item.value;
          if (String(number) === seat) {
            item.disabled = false;
            item.selected = true;
          }
        });
      });
    }
  };

  var inputRoomNumber = document.querySelector('#room_number');
  var inputSeatsNumber = document.querySelector('#capacity');
  var inputSeatsOption = inputSeatsNumber.querySelectorAll('option');
  var inputPrice = adsForm.querySelector('#price');

  var disableInput = function (input, status) {
    var inputs = document.querySelectorAll(input);
    inputs.forEach(function (it) {
      it.disabled = !!status;
    });

    return inputs;
  };

  window.form.disableAllInputs(true);

  var getMarkPosition = function () {
    return {
      x: window.marker.mark.offsetLeft,
      y: window.marker.mark.offsetTop
    };
  };

  window.form.drawMarkPosition(window.marker.MARK_WIDTH / 2, window.marker.MARK_WIDTH / 2);

  var validateSeatsOption = function () {
    var roomNumberClickHandler = function () {
      window.form.checkSeatsOption();
    };

    inputRoomNumber.addEventListener('change', function () {
      roomNumberClickHandler();
    });
  };

  var validateTitle = function () {
    var inputTitle = adsForm.querySelector('#title');

    inputTitle.addEventListener('invalid', function () {
      if (inputTitle.validity.tooShort) {
        inputTitle.setCustomValidity('Минимальная длина — 30 символов');
      } else if (inputTitle.validity.tooLong) {
        inputTitle.setCustomValidity('Максимальная длина — 100 символов');
      } else if (inputTitle.validity.valueMissing) {
        inputTitle.setCustomValidity('Обязательное поле');
      } else {
        inputTitle.setCustomValidity('');
      }
    });
  };

  var validatePrice = function () {
    inputPrice.addEventListener('invalid', function () {
      if (inputPrice.validity.valueMissing) {
        inputPrice.setCustomValidity('Обязательное поле');
      } else {
        inputPrice.setCustomValidity('');
      }
    });
  };

  var validateTypeHousing = function () {
    var inputType = adsForm.querySelector('#type');

    inputType.addEventListener('change', function (evt) {
      inputPrice.min = HOUSING_MIN_PRICES[evt.target.value];
      inputPrice.placeholder = HOUSING_MIN_PRICES[evt.target.value];
    });
  };

  var synchronizeTimeInTimeOut = function () {
    var inputTimeIn = adsForm.querySelector('#timein');
    var inputTimeOut = adsForm.querySelector('#timeout');

    inputTimeIn.addEventListener('change', function () {
      inputTimeOut.value = inputTimeIn.value;
    });
    inputTimeOut.addEventListener('change', function () {
      inputTimeIn.value = inputTimeOut.value;
    });
  };

  validateSeatsOption();
  validateTitle();
  validatePrice();
  validateTypeHousing();
  synchronizeTimeInTimeOut();

  window.filter.addFeaturesCheck(formFeatures, window.filter.featuresCheckHandler);

  var deactivateMap = function () {
    var map = document.querySelector('.map');
    map.classList.add('map--faded');
  };

  var deactivateAdsForm = function () {
    adsForm.classList.add('ad-form--disabled');
  };

  var addMarkListeners = function () {
    window.marker.mark.addEventListener('mousedown', window.map.markClickHandler);
    window.marker.mark.addEventListener('keydown', window.map.enterPressHandler);
  };

  var resetMark = function () {
    window.marker.mark.style.left = MARK_START_X + 'px';
    window.marker.mark.style.top = MARK_START_Y + 'px';
    window.form.drawMarkPosition(window.marker.MARK_WIDTH / 2, window.marker.MARK_WIDTH / 2);
  };

  var resetPhotos = function () {
    window.avatarPreview.src = 'img/muffin-grey.svg';

    var advertisementPhotos = document.querySelectorAll('.advertisement__photo');
    if (advertisementPhotos.length > 0) {
      advertisementPhotos.forEach(function (it) {
        it.remove();
      });
    }
  };

  var resetInputPlaceholder = function () {
    inputPrice.placeholder = HOUSING_MIN_PRICES.bungalo;
    inputPrice.min = 0;
    inputPrice.max = 1000000;
  };

  var generateSuccessMessage = function () {
    var element = document.querySelector('#success').content.querySelector('.success ');
    var successMessage = element.cloneNode(true);
    document.querySelector('main').appendChild(successMessage);

    var success = document.querySelector('.success');

    var messageClickHandler = function () {
      success.remove();
      removeClickHandler();
    };

    var messageKeyDownHandler = function (evt) {
      if (evt.keyCode === window.filter.ESC_KEYCODE) {
        messageClickHandler();
      }
    };

    document.addEventListener('click', messageClickHandler);
    document.addEventListener('keydown', messageKeyDownHandler);

    var removeClickHandler = function () {
      success.removeEventListener('click', messageClickHandler);
      document.removeEventListener('keydown', messageKeyDownHandler);
    };
  };

  var resetMap = function () {
    window.filter.mapFilters.reset();
    adsForm.reset();
    deactivateAdsForm();
    deactivateMap();
    window.form.removePins();
    window.form.removeCard();
    addMarkListeners();
    resetMark();
    resetInputPlaceholder();
    resetPhotos();
    window.form.disableAllInputs(true);
  };

  var uploadHandler = function () {
    resetMap();
    generateSuccessMessage();
  };

  adsForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adsForm), uploadHandler, window.data.errorHandler);
  });

})();
