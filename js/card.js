'use strict';

(function () {
  window.drawMapCard = function (cardList, adsNumber) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderMapCard(cardList[adsNumber]));

    return document.querySelector('.map .map__filters-container').before(fragment);
  };

  var TYPES_HOUSING_RU = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
  };

  var removeChild = function (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };

  var renderMapCard = function (advertisement) {
    var template = document.querySelector('#card').content.querySelector('.map__card');
    var mapCard = template.cloneNode(true);

    mapCard.querySelector('.popup__title').textContent = advertisement.offer.title;
    mapCard.querySelector('.popup__text--address').textContent = advertisement.offer.address;
    mapCard.querySelector('.popup__text--price').textContent = advertisement.offer.price + '₽/ночь';
    mapCard.querySelector('.popup__type').textContent = TYPES_HOUSING_RU[advertisement.offer.type];
    mapCard.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
    mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
    removeChild(mapCard.querySelector('.popup__features'));
    mapCard.querySelector('.popup__features').appendChild(window.data.renderFeatures(advertisement.offer.features));
    mapCard.querySelector('.popup__description').textContent = advertisement.offer.description;
    removeChild(mapCard.querySelector('.popup__photos'));
    mapCard.querySelector('.popup__photos').appendChild(window.data.renderPhotos(advertisement.offer.photos));
    mapCard.querySelector('.popup__avatar').src = advertisement.author.avatar;

    return mapCard;
  };
})();
