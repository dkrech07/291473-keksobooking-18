// // 'use strict';
//
// // Отлавливаю фильтры и записываю их в переменные;
// var filter = document.querySelector('.map__filters-container');
// var filterTypeHousing = filter.querySelector('#housing-type');
// var typeHousingOptions = filterTypeHousing.querySelectorAll('option');
// var filterPrice = filter.querySelector('#housing-price');
// var filterPriceOptions = filterPrice.querySelectorAll('option');
//
// // Служебные функция:
// // -копирует массив объектов; -Фильтрует компию массива объектов;
// // -Рисует пины;-Добавляет обработчики на пины;
// var adsCopy = adsList.slice();
// // window.filter.limitPins(adsCopy);
// window.drawPins(adsCopy);
// window.map.addListeners(adsCopy);
//
// // Фильтрую пины по типу отеля;
// var typeHousingClickHandler = function () {
//   window.filter.getTypeHousingValue(typeHousingOptions, adsCopy);
// };
// // Фильтрую пины по цене;
// var priceClickHandler = function () {
//   window.filter.getPriceValue(filterPriceOptions, adsCopy);
// };
//
// // Обработчик клика по фильтру - тип отеля;
// // Обработчик клика по фильтру - цена;
// filterTypeHousing.addEventListener('change', typeHousingClickHandler);
// filterPrice.addEventListener('change', priceClickHandler);
// //
// // (function () {
// //   var LIMIT_ADS = 5;
// //   var MIN_PRICE = 10000;
// //   var MAX_PRICE = 50000;
// //
// //   window.filter = {
// //     // Задаю лимит на вывод 5 пинов на карте;
// //     limitPins: function (adsList) {
// //       if (adsList.length > LIMIT_ADS) {
// //         adsList.length = LIMIT_ADS;
// //       }
// //       return adsList;
// //     },
// //     // Срабатывает при клике на фильтр;
// //     // Проверяет выбранное значение в фильре и в зависимости от этого:
// //     // - выводит исходный массив (если выбраны все значения) - запускает функцию фильрации по checkTypeHousing, если выбрано конкретное значение;
// //     getTypeHousingValue: function (options, adsCopy) {
// //       for (var i = 0; i < options.length; i++) {
// //         if (options[i].selected === true) {
// //           var currentOption = options[i].value;
// //         }
// //       }
// //
// //       if (currentOption === 'any') {
// //         changeFilter(adsCopy);
// //       } else {
// //         checkTypeHousing(currentOption, adsCopy);
// //       }
// //     },
// //     getPriceValue: function (prices, adsCopy) {
// //       for (var i = 0; i < prices.length; i++) {
// //         if (prices[i].selected === true) {
// //           var currentOption = prices[i].value;
// //         }
// //       }
// //       if (currentOption === 'any') {
// //         changeFilter(adsCopy);
// //       } else if (currentOption === 'middle') {
// //         checkPriceHousingMiddle(adsCopy);
// //       } else if (currentOption === 'low') {
// //         checkPriceHousingLow(adsCopy);
// //       } else if (currentOption === 'high') {
// //         checkPriceHousingHigh(adsCopy);
// //       }
// //     }
// //   };
// //
// //   // Служебная функция, срабатывает при запуске фильтра;
// //   // - удаляет старые пины с карты; - удаляет карточку объявления с карты;
// //   // - ограничивает количество отфильтрованных пинов до 5; - отрисовывает отчильтрованные пины;
// //   // - добавляет обработчики событий на отрисованные пины;
// //   var changeFilter = function (positiveArr) {
// //     window.form.removePins();
// //     window.form.removeCard();
// //     // window.filter.limitPins(arrayFiltered);
// //     window.drawPins(positiveArr);
// //     window.map.addListeners(positiveArr);
// //   };
// //
// //   // Проверяет массив объектов (копию или исходный?) на соответствие значению из фильтра - Тип жилья;
// //   // Записывает сопадающие значения в новую переменную postiveArr;
// //   var checkTypeHousing = function (type, adsCopy) {
// //     var positiveArr = adsCopy.filter(function (item) {
// //       return item.offer.type === String(type);
// //     });
// //     // adsCopy = positiveArr;
// //     changeFilter(positiveArr);
// //   };
// //
// //   var checkPriceHousingMiddle = function (adsCopy) {
// //     var positiveArr = adsCopy.filter(function (item) {
// //       return item.offer.price > MIN_PRICE && item.offer.price < MAX_PRICE;
// //     });
// //     // adsCopy = positiveArr;
// //     changeFilter(positiveArr);
// //   };
// //
// //   var checkPriceHousingLow = function (adsCopy) {
// //     var positiveArr = adsCopy.filter(function (item) {
// //       return item.offer.price < MIN_PRICE;
// //     });
// //     // adsCopy = positiveArr;
// //     changeFilter(positiveArr);
// //   };
// //
// //   var checkPriceHousingHigh = function (adsCopy) {
// //     var positiveArr = adsCopy.filter(function (item) {
// //       return item.offer.price > MAX_PRICE;
// //     });
// //     // adsCopy = positiveArr;
// //     changeFilter(positiveArr);
// //   };
// //
// // })();
