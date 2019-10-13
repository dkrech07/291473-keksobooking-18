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
  };


})();
