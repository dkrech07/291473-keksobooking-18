'use strict';

(function () {
  var LIMIT_ADS = 5;

  window.filter = {
    limitPins: function (adsList) {
      if (adsList.length > LIMIT_ADS) {
        adsList.length = LIMIT_ADS;
      }
      return adsList;
    },
    changeFilter: function (arrayFiltered) {
      window.form.removePins();
      window.form.removeCard();
      window.filter.limitPins(arrayFiltered);
      window.drawPins(arrayFiltered);
      window.map.addListeners(arrayFiltered);
    },
    checkTypeHousing: function (type, adsList) {
      var positiveArr = adsList.filter(function (item) {
        return item.offer.type === String(type);
      });
      var adsFiltered = positiveArr.slice();
      window.filter.changeFilter(adsFiltered);
    },
    optionClickHandler: function (options, arrayOriginal, arrayCopy) {

      for (var i = 0; i < options.length; i++) {
        if (options[i].selected === true) {
          var currentOption = options[i].value;
        }
      }

      if (currentOption === 'any') {
        window.filter.changeFilter(arrayCopy);
      } else {
        window.filter.checkTypeHousing(currentOption, arrayOriginal);
      }
    }
  };


})();
