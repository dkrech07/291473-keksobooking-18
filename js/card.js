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

    if (advertisement.offer.title) {
      mapCard.querySelector('.popup__title').textContent = advertisement.offer.title;
    } else {
      mapCard.querySelector('.popup__title').remove();
    }

    if (advertisement.offer.address) {
      mapCard.querySelector('.popup__text--address').textContent = advertisement.offer.address;
    } else {
      mapCard.querySelector('.popup__text--address').remove();
    }

    if (advertisement.offer.price) {
      mapCard.querySelector('.popup__text--price').textContent = advertisement.offer.price + '₽/ночь';
    } else {
      mapCard.querySelector('.popup__text--price').remove();
    }

    if (advertisement.offer.type) {
      mapCard.querySelector('.popup__type').textContent = TYPES_HOUSING_RU[advertisement.offer.type];
    } else {
      mapCard.querySelector('.popup__type').remove();
    }

    if (advertisement.offer.rooms && advertisement.offer.guests) {
      mapCard.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
    } else {
      mapCard.querySelector('.popup__text--capacity').remove();
    }

    if (advertisement.offer.checkin && advertisement.offer.checkout) {
      mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
    } else {
      mapCard.querySelector('.popup__text--time').remove();
    }

    removeChild(mapCard.querySelector('.popup__features'));
    if (advertisement.offer.features && advertisement.offer.features.length > 0) {
      mapCard.querySelector('.popup__features').appendChild(window.data.renderFeatures(advertisement.offer.features));
    } else {
      mapCard.querySelector('.popup__features').remove();
    }

    if (advertisement.offer.description) {
      mapCard.querySelector('.popup__description').textContent = advertisement.offer.description;
    } else {
      mapCard.querySelector('.popup__description').remove();
    }

    removeChild(mapCard.querySelector('.popup__photos'));
    if (advertisement.offer.photos && advertisement.offer.photos.length > 0) {
      mapCard.querySelector('.popup__photos').appendChild(window.data.renderPhotos(advertisement.offer.photos));
    } else {
      mapCard.querySelector('.popup__photos').remove();
    }

    mapCard.querySelector('.popup__avatar').src = advertisement.author.avatar;

    return mapCard;
  };
})();
