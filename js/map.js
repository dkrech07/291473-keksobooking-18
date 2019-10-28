'use strict';

(function () {

  var mapActivate = function () {
    var map = document.querySelector('.map');
    map.classList.remove('map--faded');
  };

  window.map = {
    markClickHandler: function () {

      mapActivate();

      window.form.checkSeatsOption();

      var loadHandler = function (adsList) {
        window.filter.filterAds(adsList);
      };

      window.backend.load(loadHandler, window.data.errorHandler);

      window.form.activateAdsForm();
      window.form.disableAllInputs(false);
      window.form.addClearMapListen();

      window.marker.mark.removeEventListener('mousedown', window.map.markClickHandler);
      window.marker.mark.removeEventListener('keydown', window.map.enterPressHandler);
    },
    enterPressHandler: function (evt) {
      if (evt.keyCode === window.filter.ENTER_KEYCODE) {
        window.map.markClickHandler();
      }
    },
    addListeners: function (adsArray) {
      var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      var deactivatePin = function () {
        var activePin = document.querySelector('.map__pin--active');
        if (activePin) {
          activePin.classList.remove('map__pin--active');
        }
      };

      var openPopUp = function (evt, key, handler) {
        var target = evt.currentTarget;
        var number = target.id;
        window.drawMapCard(adsArray, number);
        addListen();
        mapPins[number].removeEventListener(key, handler);

        deactivatePin();
        mapPins[number].classList.add('map__pin--active');
      };

      var closeButtonClickHandler = function () {
        var popUp = document.querySelector('.map__card');
        if (popUp) {
          popUp.remove();

          deactivatePin();
        }
        addListen();
      };

      var closePopUpAuto = function () {
        closeButtonClickHandler();
      };

      var closePopUpEsc = function () {
        document.addEventListener('keydown', function (evt) {
          if (evt.keyCode === window.filter.ESC_KEYCODE) {
            closeButtonClickHandler();
          }
        });
      };

      var closePopUpEnter = function () {
        var popUp = document.querySelector('.map__card');
        var closeButton = popUp.querySelector('.popup__close');
        closeButton.addEventListener('keydown', function (evt) {
          if (evt.keyCode === window.filter.ENTER_KEYCODE) {
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
        if (evt.keyCode === window.filter.ENTER_KEYCODE) {
          closePopUpAuto();
          openPopUp(evt, 'keydown', enterKeyDownHandler);
          closePopUpEsc();
          closePopUpClick();
          closePopUpEnter();
        }
      };

      var addListen = function () {
        mapPins.forEach(function (it) {
          it.addEventListener('click', pinClickHandler);
          it.addEventListener('keydown', enterKeyDownHandler);
        });
      };
      addListen();
    }
  };

  window.marker.mark.addEventListener('mousedown', window.map.markClickHandler);

  window.marker.mark.addEventListener('keydown', window.map.enterPressHandler);
})();
