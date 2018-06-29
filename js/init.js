'use strict';
(function () {
  var onLoadSucess = function (photos) {
    window.gallery.render(photos, document.querySelector('.pictures'));
  };
  window.backend.dataLoad(onLoadSucess, window.generateWindow);
  window.upload.init();
})();
