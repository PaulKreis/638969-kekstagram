'use strict';
(function () {
  window.utils = {
    getRandomInt: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    ESC_KEYCODE: 27,
    removeChildren: function (element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    }
  };
})();
