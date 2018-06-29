'use strict';
(function () {
  var PHOTO_NUMBER = 25;
  var photos = window.data.generatePhotos(PHOTO_NUMBER);
  window.gallery.render(photos, document.querySelector('.pictures'));
  window.upload.init();
})();
