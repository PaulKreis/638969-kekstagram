'use strict';
(function () {
  window.gallery = {
    renderPhotos: function (photos) {
      var pictureTemplate = document.querySelector('#picture').content;
      var pictureGridElement = document.querySelector('.pictures');
      var picturesFragment = document.createDocumentFragment();

      photos.forEach(function (photo) {
        window.picture.renderPhoto(pictureTemplate, picturesFragment, photo);
      });
      pictureGridElement.appendChild(picturesFragment);
    }
  };
})();
