'use strict';
(function () {
  var onLoadSucess = function (photos) {
    window.gallery.render(photos, document.querySelector('.pictures'));
  };
  window.backend.load(onLoadSucess, window.modalError);
  window.upload.init();
})();
