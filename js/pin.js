'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  window.drawPins = function (adsList, limitPins) {
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    adsList.forEach(function (it, i) {
      if (it.offer && i < limitPins) {
        var pin = renderPin(it);
        pin.id = i;
        fragment.appendChild(pin);
      }
    });

    return mapPins.appendChild(fragment);
  };

  var renderPin = function (advertisement) {
    var template = document.querySelector('#pin').content.querySelector('.map__pin');
    var element = template.cloneNode(true);

    element.style.left = advertisement.location.x - (PIN_WIDTH / 2) + 'px';
    element.style.top = advertisement.location.y - PIN_HEIGHT + 'px';
    element.querySelector('img').src = advertisement.author.avatar;
    element.querySelector('img').alt = advertisement.offer.title;

    return element;
  };
})();
