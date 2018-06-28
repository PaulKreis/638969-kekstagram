'use strict';
var PHOTO_NUMBER = 25;

var initPage = function () {
  var photos = window.data.generatePhotos(PHOTO_NUMBER);
  window.gallery.renderPhotos(photos);
  window.uploadPhoto.uploadFile.addEventListener('change', window.uploadPhoto.openUploadOverlay);
};

initPage();
