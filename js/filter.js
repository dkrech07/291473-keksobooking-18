'use strict';

(function () {

  window.filter = {
    ENTER_KEYCODE: 13,
    ESC_KEYCODE: 27,
    mapFilters: document.querySelector('.map__filters'),
    checkboxKeyDownHandler: function (evt) {
      if (evt.srcElement.checked) {
        evt.srcElement.checked = false;
      } else {
        evt.srcElement.checked = true;
      }
    },
    addFeaturesCheck: function (features, callback) {
      features.forEach(function (it) {
        it.addEventListener('keydown', function (evt) {
          if (evt.keyCode === window.filter.ENTER_KEYCODE) {
            evt.preventDefault();
            callback(evt);
          }
        });
      });
    },
    filterAds: function (adsList) {
      var MIN_PRICE = 10000;
      var MAX_PRICE = 50000;
      var QUANTITY_PINS = 5;
      var DEBOUNCE_INTERVAL = 500;

      var showPins = function (ads, limitPins) {
        window.form.removePins();
        window.form.removeCard();
        window.drawPins(ads, limitPins);
        window.map.addListeners(ads);
      };

      showPins(adsList, QUANTITY_PINS);

      var typeFilter = window.filter.mapFilters.querySelector('#housing-type');
      var priceFilter = window.filter.mapFilters.querySelector('#housing-price');
      var roomsFilter = window.filter.mapFilters.querySelector('#housing-rooms');
      var guestsFilter = window.filter.mapFilters.querySelector('#housing-guests');
      var featuresFilter = window.filter.mapFilters.querySelector('#housing-features');
      var filterFeatures = document.querySelectorAll('.map__checkbox');

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

      var filtresHandler = function () {
        var lastTimeout = null;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          updatePins();
        }, DEBOUNCE_INTERVAL);
      };

      window.filter.mapFilters.addEventListener('change', filtresHandler);
      window.filter.addFeaturesCheck(filterFeatures, window.filter.checkboxKeyDownHandler);
      window.filter.addFeaturesCheck(filterFeatures, filtresHandler);

    }
  };

})();
