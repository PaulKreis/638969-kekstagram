'use strict';
(function () {
  window.utils = {
    getRandomInt: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    removeChildren: function (element) {
      element.innerHTML = '';
    },
    getRandomSubArray: function (arr, size) {
      var shuffled = arr.slice(0);
      var i = arr.length;
      var temp;
      var index;
      while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(0, size);
    },
    debounce: function (fn, interval) {
      var lastTimeout = null;
      return function () {
        var args = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          fn.apply(null, args);
        }, interval);
      };
    },
    checkContains: function (arr, element) {
      var numberOfElem = 0;
      arr.forEach(function (e) {
        if (e.toUpperCase() === element.toUpperCase()) {
          numberOfElem++;
        }
      });
      return numberOfElem;
    },
    isEmptyString: function (array) {
      var checkEmptyElement = function (value) {
        return value !== '';
      };
      var result = array.filter(checkEmptyElement);
      return result;
    }
  };
})();
