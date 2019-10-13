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

        var adsCopy = adsList.slice();
        window.filter.limitPins(adsCopy);
        window.drawPins(adsCopy);

        var addListeners = function () {

          var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

          var openPopUp = function (evt, key, handler) {
            var target = evt.currentTarget;
            var number = target.id;
            window.drawMapCard(adsCopy, number);
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
        };

        addListeners();

        var checkTypeHousing = function (type) {

          var positiveArr = adsList.filter(function (item) {
            return item.offer.type === String(type);
          });

          var adsFiltered = positiveArr.slice();
          window.form.removePins();
          window.form.removeCard();
          window.filter.limitPins(adsFiltered);
          window.drawPins(adsFiltered);
          addListeners();
        };

        var filter = document.querySelector('.map__filters-container');
        var filterTypeHousing = filter.querySelector('#housing-type');
        var typeHousingOptions = filterTypeHousing.querySelectorAll('option');

        var optionClickHandler = function (options) {

          for (var i = 0; i < options.length; i++) {
            if (options[i].selected === true) {
              var currentOption = options[i].value;
            }
          }

          if (currentOption === 'any') {
            window.drawPins(adsCopy);
          } else {
            checkTypeHousing(currentOption);
          }
        };

        var getTypeHousingValue = function () {
          optionClickHandler(typeHousingOptions);
        };

        filterTypeHousing.addEventListener('click', getTypeHousingValue);
      };

      window.backend.load(loadHandler, window.data.errorHandler);

      window.marker.mark.removeEventListener('mousedown', window.map.markClickHandler);
      window.marker.mark.removeEventListener('keydown', window.map.enterPressHandler);
    },
    enterPressHandler: function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        window.map.markClickHandler();
      }
    }
  };

  window.marker.mark.addEventListener('mousedown', window.map.markClickHandler);

  window.marker.mark.addEventListener('keydown', window.map.enterPressHandler);
})();
