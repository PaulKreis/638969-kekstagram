'use strict';
var PHOTO_NUMBER = 25;

var initPage = function () {
  var photos = window.data.generatePhotos(PHOTO_NUMBER);
  window.picture.renderPhotos(photos);
  window.form.uploadFile.addEventListener('change', window.form.openUploadOverlay);
};

initPage();
