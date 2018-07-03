'use strict';
(function () {
  window.utils = {
    getRandomInt: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    removeChildren: function (element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    },
    showErrorMsg: function (errorMsgTxt) {
      var errorMsg = document.querySelector('.img-upload__message--error');
      errorMsg.classList.remove('hidden');
      errorMsg.style.zIndex = 3;

      errorMsg.innerHTML = errorMsgTxt + '<div class="error__links"> <a class="error__link" href="index.html">Попробовать снова</a> <a class="error__link" href="index.html">Загрузить другой файл</a> </div>';
    }
  };
})();
