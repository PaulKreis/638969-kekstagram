'use strict';
(function () {
  window.galleryService = {
    load: function (onSuccess, onError) {
      var URL = 'https://js.dump.academy/kekstagram/data';
      var XHR_TIMEOUT = 10000;

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Не удалось загрузить изображения', window.enums.HttpStatusName[xhr.status]);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Не удалось загрузить изображения.', 'Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = XHR_TIMEOUT;

      xhr.open('GET', URL);
      xhr.send();
    },
  };
})();
