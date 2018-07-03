'use strict';
(function () {
  var showErrorMsg = function (errorMsgTxt) {
    var errorMsgTemplate = document.querySelector('.img-upload__message--error');
    var errorMsgElement = errorMsgTemplate.cloneNode(true);
    errorMsgElement.innerHTML = errorMsgTxt + '<div class="error__links"> <a class="error__link" href="index.html">Попробовать снова</a> <a class="error__link" href="index.html">Загрузить другой файл</a> </div>';
    errorMsgElement.classList.remove('hidden');
    errorMsgElement.style.zIndex = 2;
    var imgUpload = document.querySelector('.img-upload');
    imgUpload.appendChild(errorMsgElement);
  };
  window.uploadService = {
    send: function (data, onLoad) {
      var URL = 'https://js.dump.academy/kekstagram';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad();
        } else {
          showErrorMsg('Ошибка соединения: ' + window.enums.HttpStatusName[xhr.status]);
        }
      });
      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
