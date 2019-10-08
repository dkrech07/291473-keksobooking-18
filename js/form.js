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
    var inputPrice = adsForm.querySelector('#price');
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

  var tmpFillForm = function () { // Временное заполнение полей формы;
    document.querySelector('#title').value = 'ТестовыйЗаголовокТестовыйЗаголовокТестовыйЗаголовок';
    document.querySelector('#price').value = '1000';
  }
  tmpFillForm();

  var deactivateMap = function () {
    var map = document.querySelector('.map');
    map.classList.add('map--faded');
  };

  var deactivateAdsForm = function () {
    adsForm.classList.add('ad-form--disabled');
  };

  var uploadHandler = function  () {
    console.log('ok');
    window.form.disableAllInputs(true); // Деактивировал все поля формы;
    deactivateAdsForm(); // Деактивировал форму;
    deactivateMap(); // Деактивировал карту;

  };

  adsForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adsForm), uploadHandler, window.data.errorHandler);
  });
})();
