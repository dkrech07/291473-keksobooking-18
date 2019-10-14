'use strict';

(function () {
  var LIMIT_ADS = 5;

  window.filter = {
    limitPins: function (adsList) {
      if (adsList.length > LIMIT_ADS) {
        adsList.length = LIMIT_ADS;
      }
      return adsList;
    }
    // changeFilter: function (arrayFiltered) {
    //   window.form.removePins();
    //   window.form.removeCard();
    //   // window.filter.limitPins(arrayFiltered);
    //   window.drawPins(arrayFiltered);
    //   window.map.addListeners(arrayFiltered);
    // };
  };


})();
