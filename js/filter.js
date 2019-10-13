'use strict';

(function () {
  var LIMIT_ADS = 5;
  // var filter = document.querySelector('.map__filters-container');
  //
  // var filterTypeHousing = filter.querySelector('#housing-type');
  // var typeHousingOptions = filterTypeHousing.querySelectorAll('option');
  //
  // var optionClickHandler = function (options) {
  //   for (var i = 0; i < options.length; i++) {
  //     if (options[i].selected === true) {
  //       var currentOption = options[i].value
  //     }
  //   }
  //   console.log(currentOption);
  //   window.filterTypeHousing(currentOption);
  //   return currentOption;
  // };
  //
  // var getTypeHousingValue = function () {
  //   optionClickHandler(typeHousingOptions);
  // };
  //
  // filterTypeHousing.addEventListener('click', getTypeHousingValue);

  window.filter = {
    limitPins: function (adsList) {
      adsList.length = LIMIT_ADS;
      return adsList;
    }
  };


})();
