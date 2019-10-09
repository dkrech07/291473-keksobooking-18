'use strict';

(function () {

  var adsForm = document.querySelector('.ad-form');

  window.form = {
    activateAdsForm: function () {
      adsForm.classList.remove('ad-form--disabled');
    },
    disableAllInputs: function (status) {
      disableInput('fieldset', status);
      disableInput('select', status);
      disableInput('input', status);
    },
    drawMarkPosition: function (width, height) {
      var inputAddress = document.querySelector('#address');
      inputAddress.value = (getMarkPosition().x + width) + ', ' + (getMarkPosition().y + height);
    }
  };

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

  var inputRoomNumber = document.querySelector('#room_number');
  var inputSeatsNumber = document.querySelector('#capacity');
  var inputSeatsOption = inputSeatsNumber.querySelectorAll('option');
  var inputPrice = adsForm.querySelector('#price');

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

  window.form.disableAllInputs(true);

  var getMarkPosition = function () {
    return {
      x: window.marker.mark.offsetLeft,
      y: window.marker.mark.offsetTop
    };
  };

  window.form.drawMarkPosition(window.marker.MARK_WIDTH / 2, window.marker.MARK_WIDTH / 2);

  var validationInput = function () {
    var inputTitle = adsForm.querySelector('#title');
    var inputType = adsForm.querySelector('#type');
    var inputTimeIn = adsForm.querySelector('#timein');
    var inputTimeOut = adsForm.querySelector('#timeout');

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

    inputRoomNumber.addEventListener('change', function () {
      roomNumberClickHandler();
    });

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

    inputPrice.addEventListener('invalid', function () {
      if (inputPrice.validity.tooLong) {
        inputPrice.setCustomValidity('Максимальное значение — 1 000 000');
      } else if (inputPrice.validity.valueMissing) {
        inputPrice.setCustomValidity('Обязательное поле');
      } else {
        inputPrice.setCustomValidity('');
      }
    });

    inputType.addEventListener('change', function (evt) {
      inputPrice.placeholder = HOUSING_MIN_PRICES[evt.target.value];
    });

    inputTimeIn.addEventListener('change', function () {
      inputTimeOut.value = inputTimeIn.value;
    });

    inputTimeOut.addEventListener('change', function () {
      inputTimeIn.value = inputTimeOut.value;
    });

  };

  validationInput();

  // Отправка данных на сервер;

  var resetInputs = function () {
    var resetCheckbox = function (input, condition) {
      var inputs = document.querySelectorAll(input);
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].checked = condition;
      }
    };
    resetCheckbox('input[name="features"]:checked', false);

    var resetSelect = function (input, condition) {
      var inputs = document.querySelectorAll(input);
      console.log(inputs);
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].selected = condition;
      }
    };
    resetSelect('select > option', false);

    var resetNumberSeats = function () {
      for (var i = 0; i < inputSeatsOption.length; i++) {
        console.log(inputSeatsOption[i]);
        inputSeatsOption[i].selected = false;
        inputSeatsOption[i].disabled = false;
      }
      inputSeatsOption[NUMBERS_SEATS[2][0]].selected = true;
    };
    resetNumberSeats();

    var resetTextInputs = function () {
      var title = document.querySelector('input[name="title"]');
      title.value = '';
      inputPrice.value = '';
      inputPrice.placeholder = HOUSING_MIN_PRICES.bungalo;
    };
    resetTextInputs();

    var resetDescription = function () {
      var description = document.querySelector('#description');
      description.value = '';
    }
    resetDescription();

  };

  var deactivateMap = function () {
    var map = document.querySelector('.map');
    map.classList.add('map--faded');
  };

  var deactivateAdsForm = function () {
    adsForm.classList.add('ad-form--disabled');
  };

  var removePins = function () {
    var removablePins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < removablePins.length; i++) {
      removablePins[i].remove();
    }
  };

  var removeCard = function () {
    var popUp = document.querySelector('.map__card');
    if (popUp) {
      popUp.remove();
    }
  };

  var addMarkListeners = function () {
    window.marker.mark.addEventListener('mousedown', window.map.markClickHandler);
    window.marker.mark.addEventListener('keydown', window.map.enterPressHandler);
  };

  var resetMark = function () {
    window.marker.mark.style.left = 570 + 'px';
    window.marker.mark.style.top = 375 + 'px';
    window.form.drawMarkPosition(window.marker.MARK_WIDTH / 2, window.marker.MARK_WIDTH / 2);
  };

  var uploadHandler = function () {
    console.log('ok');
    window.form.disableAllInputs(true); // Деактивировал все поля формы;
    deactivateAdsForm(); // Деактивировал форму;
    deactivateMap(); // Деактивировал карту;
    resetInputs(); // Сбрасываю записи в инпутах;
    removePins(); // Удаляю пины с карты;
    removeCard(); // Удаляю открытую карточку, при ее наличии;
    addMarkListeners(); // Добавляю обработчики на маркер;
    resetMark(); // Сбрасываю положение маркера к исходному, вывожу дефолтные координаты в поле адреса;
  };

  adsForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adsForm), uploadHandler, window.data.errorHandler);
  });
})();
