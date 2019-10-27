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

  var renderCardTitle = function (advertisement, mapCard) {
    var cardTitle = mapCard.querySelector('.popup__title');

    if (advertisement.offer.title) {
      cardTitle.textContent = advertisement.offer.title;
    } else {
      cardTitle.remove();
    }
  };

  var renderCardAddress = function (advertisement, mapCard) {
    var cardAddress = mapCard.querySelector('.popup__text--address');

    if (advertisement.offer.address) {
      cardAddress.textContent = advertisement.offer.address;
    } else {
      cardAddress.remove();
    }
  };

  var renderCardPrice = function (advertisement, mapCard) {
    var cardPrice = mapCard.querySelector('.popup__text--price');

    if (advertisement.offer.price) {
      cardPrice.textContent = advertisement.offer.price + '₽/ночь';
    } else {
      cardPrice.remove();
    }
  };

  var renderCardTypeHousing = function (advertisement, mapCard) {
    var cardTypeHousing = mapCard.querySelector('.popup__type');

    if (advertisement.offer.type) {
      cardTypeHousing.textContent = TYPES_HOUSING_RU[advertisement.offer.type];
    } else {
      cardTypeHousing.remove();
    }
  };

  var renderCardRoomsForGuests = function (advertisement, mapCard) {
    var cardRoomsForGuests = mapCard.querySelector('.popup__text--capacity');

    if (advertisement.offer.rooms && advertisement.offer.guests) {
      cardRoomsForGuests.textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
    } else {
      cardRoomsForGuests.remove();
    }
  };

  var renderCardCheckinCheckout = function (advertisement, mapCard) {
    var cardCheckinCheckout = mapCard.querySelector('.popup__text--time');

    if (advertisement.offer.checkin && advertisement.offer.checkout) {
      cardCheckinCheckout.textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
    } else {
      cardCheckinCheckout.remove();
    }
  };

  var renderCardFeatures = function (advertisement, mapCard) {
    var cardFeatures = mapCard.querySelector('.popup__features');

    removeChild(cardFeatures);
    if (advertisement.offer.features && advertisement.offer.features.length > 0) {
      cardFeatures.appendChild(window.data.renderFeatures(advertisement.offer.features));
    } else {
      cardFeatures.remove();
    }
  };

  var renderCardDescription = function (advertisement, mapCard) {
    var cardDesctiption = mapCard.querySelector('.popup__description');

    if (advertisement.offer.description) {
      cardDesctiption.textContent = advertisement.offer.description;
    } else {
      cardDesctiption.remove();
    }
  };

  var renderCardPhotos = function (advertisement, mapCard) {
    var cardPhotos = mapCard.querySelector('.popup__photos');

    removeChild(cardPhotos);
    if (advertisement.offer.photos && advertisement.offer.photos.length > 0) {
      cardPhotos.appendChild(window.data.renderPhotos(advertisement.offer.photos));
    } else {
      cardPhotos.remove();
    }
  };

  var renderCardAvatar = function (advertisement, mapCard) {
    var cardAvatar = mapCard.querySelector('.popup__avatar');

    cardAvatar.src = advertisement.author.avatar;
  };

  var renderMapCard = function (advertisement) {
    var template = document.querySelector('#card').content.querySelector('.map__card');
    var mapCard = template.cloneNode(true);

    renderCardTitle(advertisement, mapCard);
    renderCardAddress(advertisement, mapCard);
    renderCardPrice(advertisement, mapCard);
    renderCardTypeHousing(advertisement, mapCard);
    renderCardRoomsForGuests(advertisement, mapCard);
    renderCardCheckinCheckout(advertisement, mapCard);
    renderCardFeatures(advertisement, mapCard);
    renderCardDescription(advertisement, mapCard);
    renderCardPhotos(advertisement, mapCard);
    renderCardAvatar(advertisement, mapCard);

    return mapCard;
  };
})();
