'use strict';

(function () {
  window.data = {
    ADS_NUMBER: 8,
    renderPhotos: function (photos) {
      var template = document.querySelector('#card').content.querySelector('.popup__photos .popup__photo');
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < photos.length; i++) {
        var element = template.cloneNode(true);
        element.src = photos[i];
        fragment.appendChild(element);
      }

      return fragment;
    },
    renderFeatures: function (list) {
      var template = document.querySelector('#card').content.querySelector('.popup__features');
      var element = template.cloneNode(true);
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < list.length; i++) {
        var currentElement = element.querySelector('.popup__feature--' + list[i]);
        fragment.appendChild(currentElement);
      }

      return fragment;
    },
    errorHandler: function (errorMessage) {
      var template = document.querySelector('#error').content.querySelector('.error');
      var element = template.cloneNode(true);
      var fragment = document.createDocumentFragment();

      var node = document.createElement('p');
      node.style = 'font-size: 30px; color: #ffffff;';
      node.textContent = errorMessage;
      element.appendChild(node);

      fragment.appendChild(element);
      document.querySelector('main').appendChild(fragment);
    }
  };
})();
