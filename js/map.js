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
        window.drawPins(adsList);
        window.map.addListeners(adsList);

        var PRICE_MIN = 10000;
        var PRICE_MAX = 50000;

        var mapFilters = document.querySelector('.map__filters');
        var typeFilters = mapFilters.querySelector('#housing-type');
        var priceFilters = mapFilters.querySelector('#housing-price');
        var roomsFilters = mapFilters.querySelector('#housing-rooms');

        var updatePins = function () {
          var filteredAds = adsList;

          if (typeFilters.value !== 'any') {
            filteredAds = adsList.filter(function (it) {
              return it.offer.type === typeFilters.value;
            });
          }

          if (priceFilters.value !== 'any') {
            filteredAds = filteredAds.filter(function (it) {
              if (priceFilters.value === 'low') {
                return it.offer.price < PRICE_MIN;
              } else if (priceFilters.value === 'middle') {
                return it.offer.price > PRICE_MIN && it.offer.price < PRICE_MAX;
              } else if (priceFilters.value === 'high') {
                return it.offer.price > PRICE_MAX;
              }
              return it;
            });
          }

          if (roomsFilters.value !== 'any') {
            filteredAds = filteredAds.filter(function (it) {
              return it.offer.rooms === +roomsFilters.value;
            });
          }

          window.form.removePins();
          window.form.removeCard();
          window.drawPins(filteredAds);
          window.map.addListeners(filteredAds);
        };


        var filtresHandler = function () {

          updatePins();
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
