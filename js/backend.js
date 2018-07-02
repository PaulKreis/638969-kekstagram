'use strict';
(function () {
  var checkErrorCode = function (code) {
    var msg;
    switch (code) {
      case 400:
        msg = 'Неверный запрос к серверу. Пожалуйста проверьте корректность заполнения формы';
        break;
      case 401:
        msg = 'Для доступа к запрашиваемому ресурсу требуется аутентификация';
        break;
      case 403:
        msg = 'Доступ к серверу запрещен';
        break;
      case 404:
        msg = 'Сервер не найден';
        break;
      case 405:
        msg = 'Указанный клиентом метод нельзя применить к текущему ресурсу';
        break;
      case 408:
        msg = 'Время ожидания сервером передачи от клиента истекло';
        break;
      case 429:
        msg = 'Сервер не найден';
        break;
      case 500:
        msg = 'Внутренняя ошибка сервера';
        break;
      case 501:
        msg = 'Сервер не поддерживает возможностей, необходимых для обработки запроса';
        break;
      case 503:
        msg = 'Сервер временно не имеет возможности обрабатывать запросы по техническим причинам';
        break;
      default:
        msg = 'Неизвестная ошибка';
        break;
    }
    return msg;
  };

  window.backend = {
    load: function (onSuccess, onError) {
      var URL = 'https://js.dump.academy/kekstagram/data';
      var XHR_TIMEOUT = 10000;

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Не удалось загрузить изображения', checkErrorCode(xhr.status));
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Не удалось загрузить изображения', 'Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = XHR_TIMEOUT;

      xhr.open('GET', URL);
      xhr.send();
    },

    send: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/kekstagram';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad();
        } else {
          onError('Ошибка соединения: ' + checkErrorCode(xhr.status));
        }
      });
      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
