'use strict';

(function () {

  var TYPES_HOUSING_RU = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
  };

  window.drawMapCard = function (cardList, adsNumber) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderMapCard(cardList[adsNumber]));

    return document.querySelector('.map .map__filters-container').before(fragment);
  };

  var removeChild = function (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };

  var renderMapCard = function (advertisement) {
    var template = document.querySelector('#card').content.querySelector('.map__card');
    var mapCard = template.cloneNode(true);

    var cardTitle = mapCard.querySelector('.popup__title');
    var cardAddress = mapCard.querySelector('.popup__text--address');
    var cardPrice = mapCard.querySelector('.popup__text--price');
    var cardTypeHousing = mapCard.querySelector('.popup__type');
    var cardRoomsForGuests = mapCard.querySelector('.popup__text--capacity');
    var cardCheckinCheckout = mapCard.querySelector('.popup__text--time');
    var cardFeatures = mapCard.querySelector('.popup__features');
    var cardDesctiption = mapCard.querySelector('.popup__description');
    var cardPhotos = mapCard.querySelector('.popup__photos');
    var cardAvatar = mapCard.querySelector('.popup__avatar');

    if (advertisement.offer.title) {
      cardTitle.textContent = advertisement.offer.title;
    } else {
      cardTitle.remove();
    }

    if (advertisement.offer.address) {
      cardAddress.textContent = advertisement.offer.address;
    } else {
      cardAddress.remove();
    }

    if (advertisement.offer.price) {
      cardPrice.textContent = advertisement.offer.price + '₽/ночь';
    } else {
      cardPrice.remove();
    }

    if (advertisement.offer.type) {
      cardTypeHousing.textContent = TYPES_HOUSING_RU[advertisement.offer.type];
    } else {
      cardTypeHousing.remove();
    }

    if (advertisement.offer.rooms && advertisement.offer.guests) {
      cardRoomsForGuests.textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
    } else {
      cardRoomsForGuests.remove();
    }

    if (advertisement.offer.checkin && advertisement.offer.checkout) {
      cardCheckinCheckout.textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
    } else {
      cardCheckinCheckout.remove();
    }

    removeChild(cardFeatures);
    if (advertisement.offer.features && advertisement.offer.features.length > 0) {
      cardFeatures.appendChild(window.data.renderFeatures(advertisement.offer.features));
    } else {
      cardFeatures.remove();
    }

    if (advertisement.offer.description) {
      cardDesctiption.textContent = advertisement.offer.description;
    } else {
      cardDesctiption.remove();
    }

    removeChild(cardPhotos);
    if (advertisement.offer.photos && advertisement.offer.photos.length > 0) {
      cardPhotos.appendChild(window.data.renderPhotos(advertisement.offer.photos));
    } else {
      cardPhotos.remove();
    }

    cardAvatar.src = advertisement.author.avatar;

    return mapCard;
  };
})();
