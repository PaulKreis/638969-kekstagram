'use strict';
(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  window.uploadService = {
    send: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad();
        } else {
          onError('Ошибка соединения: ' + window.enums.HttpStatusName[xhr.status]);
        }
      });
      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
