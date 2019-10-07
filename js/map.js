'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var mapActivate = function () {
    var map = document.querySelector('.map');
    map.classList.remove('map--faded');
  };

  var markClickHandler = function () {
    mapActivate();

    window.form.activateAdsForm();

    window.form.disableAllInputs(false);

    var loadHandler = function (adsList) {
      window.drawPins(adsList);

      var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      var openPopUp = function (evt, key, handler) {
        var target = evt.currentTarget;
        var number = target.id;
        window.drawMapCard(adsList, number);
        addListen();
        mapPin[number].removeEventListener(key, handler);
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
          if (evt.keyCode === ESC_KEYCODE) {
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
        for (var i = 0; i < mapPin.length; i++) {
          mapPin[i].addEventListener('click', pinClickHandler);
          mapPin[i].addEventListener('keydown', enterKeyDownHandler);
        }
      };
      addListen();

    };

    window.backend.load(loadHandler, window.data.errorHandler);

    window.marker.mark.removeEventListener('mousedown', markClickHandler);
    window.marker.mark.removeEventListener('keydown', enterPressHandler);
  };

  var enterPressHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      markClickHandler();
    }
  };

  window.marker.mark.addEventListener('mousedown', markClickHandler);

  window.marker.mark.addEventListener('keydown', enterPressHandler);
})();
