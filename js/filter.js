'use strict';

(function () {
  var LIMIT_ADS = 5;
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  window.filter = {
    // Задаю лимит на вывод 5 пинов на карте;
    limitPins: function (adsList) {
      if (adsList.length > LIMIT_ADS) {
        adsList.length = LIMIT_ADS;
      }
      return adsList;
    },
    // Срабатывает при клике на фильтр;
    // Проверяет выбранное значение в фильре и в зависимости от этого:
    // - выводит исходный массив (если выбраны все значения) - запускает функцию фильрации по checkTypeHousing, если выбрано конкретное значение;
    getTypeHousingValue: function (options, adsList, arrayCopy) {
      for (var i = 0; i < options.length; i++) {
        if (options[i].selected === true) {
          var currentOption = options[i].value;
        }
      }

      if (currentOption === 'any') {
        changeFilter(arrayCopy);
      } else {
        checkTypeHousing(currentOption, adsList);
      }
    },
    getPriceValue: function (prices, adsList, arrayCopy) {
      for (var i = 0; i < prices.length; i++) {
        if (prices[i].selected === true) {
          var currentOption = prices[i].value;
        }
      }
      if (currentOption === 'any') {
        changeFilter(arrayCopy);
      } else if (currentOption === 'middle') {
        checkPriceHousingMiddle(arrayCopy);
      } else if (currentOption === 'low') {
        checkPriceHousingLow(arrayCopy);
      } else if (currentOption === 'high') {
        checkPriceHousingHigh(arrayCopy);
      }
    }
  };

  // Служебная функция, срабатывает при запуске фильтра;
  // - удаляет старые пины с карты; - удаляет карточку объявления с карты;
  // - ограничивает количество отфильтрованных пинов до 5; - отрисовывает отчильтрованные пины;
  // - добавляет обработчики событий на отрисованные пины;
  var changeFilter = function (arrayFiltered) {
    window.form.removePins();
    window.form.removeCard();
    window.filter.limitPins(arrayFiltered);
    window.drawPins(arrayFiltered);
    window.map.addListeners(arrayFiltered);
  };

  // Проверяет массив объектов (копию или исходный?) на соответствие значению из фильтра - Тип жилья;
  // Записывает сопадающие значения в новую переменную postiveArr;
  var checkTypeHousing = function (type, adsList) {
    var positiveArr = adsList.filter(function (item) {
      return item.offer.type === String(type);
    });

    changeFilter(positiveArr);
  };

  var checkPriceHousingMiddle = function (adsList) {
    var positiveArr = adsList.filter(function (item) {
      return item.offer.price > MIN_PRICE && item.offer.price < MAX_PRICE;
    });

    changeFilter(positiveArr);
  };

  var checkPriceHousingLow = function (adsList) {
    var positiveArr = adsList.filter(function (item) {
      return item.offer.price < MIN_PRICE;
    });

    changeFilter(positiveArr);
  };

  var checkPriceHousingHigh = function (adsList) {
    var positiveArr = adsList.filter(function (item) {
      return item.offer.price > MAX_PRICE;
    });

    changeFilter(positiveArr);
  };

})();
