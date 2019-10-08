'use strict';

(function () {
  var TIMEOUT_DURATION = 1000;
  var STATUS_OK = 200;

  var handleErrors = function (xhr, load, error) {
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        load(xhr.response);
      } else {
        error('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      error('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      error('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };

  window.backend = {
    load: function (onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking/data';

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      handleErrors(xhr, onLoad, onError);

      xhr.addEventListener('load', function () {
        if (xhr.status === STATUS_OK) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_DURATION;

      xhr.open('GET', URL);
      xhr.send();
    },
    upload: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking';

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      handleErrors(xhr, onLoad, onError);

      xhr.timeout = TIMEOUT_DURATION;

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
