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
      errorMsg.style.zIndex = 999;

      errorMsg.innerHTML = errorMsgTxt + '<div class="error__links"> <a class="error__link" href="">Попробовать снова</a> <a class="" href="">Загрузить другой файл</a> </div>';
      var errorLink = errorMsg.querySelector('.error__link');
      var pagereload = function () {
        Location.reload();
      };
      errorLink.addEventListener('click', pagereload);
      var closeErrorMSg = function () {
        errorMsg.removeEventListener('click', closeErrorMSg);
        errorMsg.classList.add('hidden');
      };
      errorMsg.addEventListener('click', closeErrorMSg);
    }
  };
})();
