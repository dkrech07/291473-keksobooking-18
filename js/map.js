'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  window.window.ESC_KEYCODE = 27;

  var mapActivate = function () {
    var map = document.querySelector('.map');
    map.classList.remove('map--faded');
  };

  window.map = {
    markClickHandler: function () {
      mapActivate();
      window.form.activateAdsForm();
      window.form.disableAllInputs(false);

      var loadHandler = function (adsList) {

        var MIN_PRICE = 10000;
        var MAX_PRICE = 50000;
        var QUANTITY_PINS = 5;

        var showPins = function (ads, limitPins) {
          window.form.removePins();
          window.form.removeCard();
          window.drawPins(ads, limitPins);
          window.map.addListeners(ads);
        };

        showPins(adsList, QUANTITY_PINS);

        var mapFilters = document.querySelector('.map__filters');
        var typeFilter = mapFilters.querySelector('#housing-type');
        var priceFilter = mapFilters.querySelector('#housing-price');
        var roomsFilter = mapFilters.querySelector('#housing-rooms');
        var guestsFilter = mapFilters.querySelector('#housing-guests');
        var featuresFilter = mapFilters.querySelector('#housing-features');

        var updatePins = function () {
          var filteredAds = adsList;

          if (typeFilter.value !== 'any') {
            filteredAds = adsList.filter(function (it) {
              return it.offer.type === typeFilter.value;
            });
          }

          if (priceFilter.value !== 'any') {
            filteredAds = filteredAds.filter(function (it) {
              if (priceFilter.value === 'low') {
                return it.offer.price < MIN_PRICE;
              } else if (priceFilter.value === 'middle') {
                return it.offer.price > MIN_PRICE && it.offer.price < MAX_PRICE;
              } else if (priceFilter.value === 'high') {
                return it.offer.price > MAX_PRICE;
              }
              return it;
            });
          }

          if (roomsFilter.value !== 'any') {
            filteredAds = filteredAds.filter(function (it) {
              return it.offer.rooms === +roomsFilter.value;
            });
          }

          if (guestsFilter.value !== 'any') {
            filteredAds = filteredAds.filter(function (it) {
              return it.offer.guests === +guestsFilter.value;
            });
          }

          var checkedFeatures = featuresFilter.querySelectorAll('input:checked');

          var arrayFeatures = Array.from(checkedFeatures);
          var valueFeatures = arrayFeatures.map(function (element) {
            return element.value;
          });

          filteredAds = filteredAds.filter(function (it) {
            var count = 0;
            valueFeatures.forEach(function (el) {
              count += it.offer.features.indexOf(el) > -1 ? 1 : 0;

            });
            return count === valueFeatures.length;
          });

          var limitPins = filteredAds.length > QUANTITY_PINS ? QUANTITY_PINS : filteredAds.length;
          showPins(filteredAds, limitPins);
        };

        var DEBOUNCE_INTERVAL = 500;

        var filtresHandler = function () {
          var lastTimeout = null;
          if (lastTimeout) {
            window.clearTimeout(lastTimeout);
          }
          lastTimeout = window.setTimeout(function () {
            updatePins();
          }, DEBOUNCE_INTERVAL);
        };
        mapFilters.addEventListener('change', filtresHandler);

      };

      window.backend.load(loadHandler, window.data.errorHandler);

      window.marker.mark.removeEventListener('mousedown', window.map.markClickHandler);
      window.marker.mark.removeEventListener('keydown', window.map.enterPressHandler);
    },
    enterPressHandler: function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        window.map.markClickHandler();
      }
    },
    addListeners: function (adsArray) {
      var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      var openPopUp = function (evt, key, handler) {
        var target = evt.currentTarget;
        var number = target.id;
        window.drawMapCard(adsArray, number);
        addListen();
        mapPins[number].removeEventListener(key, handler);
      };

      var closeButtonClickHandler = function () {
        var popUp = document.querySelector('.map__card');
        if (popUp) {
          popUp.remove();
        }
        addListen();
      };

      var closePopUpAuto = function () {
        closeButtonClickHandler();
      };

      var closePopUpEsc = function () {
        document.addEventListener('keydown', function (evt) {
          if (evt.keyCode === window.ESC_KEYCODE) {
            closeButtonClickHandler();
          }
        });
      };

      var closePopUpEnter = function () {
        var popUp = document.querySelector('.map__card');
        var closeButton = popUp.querySelector('.popup__close');
        closeButton.addEventListener('keydown', function (evt) {
          if (evt.keyCode === ENTER_KEYCODE) {
            closeButtonClickHandler();
          }
        });
      };

      var closePopUpClick = function () {
        var popUp = document.querySelector('.map__card');
        var closeButton = popUp.querySelector('.popup__close');
        closeButton.addEventListener('click', closeButtonClickHandler);
      };

      var pinClickHandler = function (evt) {
        closePopUpAuto();
        openPopUp(evt, 'click', pinClickHandler);
        closePopUpEsc();
        closePopUpClick();
        closePopUpEnter();
      };

      var enterKeyDownHandler = function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          closePopUpAuto();
          openPopUp(evt, 'keydown', enterKeyDownHandler);
          closePopUpEsc();
          closePopUpClick();
          closePopUpEnter();
        }
      };

      var addListen = function () {
        for (var i = 0; i < mapPins.length; i++) {
          mapPins[i].addEventListener('click', pinClickHandler);
          mapPins[i].addEventListener('keydown', enterKeyDownHandler);
        }
      };
      addListen();
    }
  };

  window.marker.mark.addEventListener('mousedown', window.map.markClickHandler);

  window.marker.mark.addEventListener('keydown', window.map.enterPressHandler);
})();
