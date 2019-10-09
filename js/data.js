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

      var error = document.querySelector('.error');
      var errorButton = error.querySelector('.error__button');

      var errorClickHandler = function () {
        error.remove();
        removeErrorClickHandler();
      };

      var errorKeyDownHandler = function (evt) {
        if (evt.keyCode === window.ESC_KEYCODE) {
          errorClickHandler();
        }
      };

      var clickButtonHandler = function (evt) {
        evt.preventDefault();
        errorClickHandler();
      };

      var keyDownButtonHandler = function (evt) {
        evt.preventDefault();
        if (evt.keyCode === window.ENTER_KEYCODE) {
          errorClickHandler();
        }
      };

      error.addEventListener('click', errorClickHandler);
      document.addEventListener('keydown', errorKeyDownHandler);
      errorButton.addEventListener('click', clickButtonHandler);
      errorButton.addEventListener('click', keyDownButtonHandler);

      var removeErrorClickHandler = function () {
        error.removeEventListener('click', errorClickHandler);
        document.removeEventListener('keydown', errorKeyDownHandler);
        errorButton.removeEventListener('click', clickButtonHandler);
        errorButton.removeEventListener('click', keyDownButtonHandler);
      };
    }
  };
})();
