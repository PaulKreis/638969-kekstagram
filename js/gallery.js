'use strict';
(function () {
  var onLoadSuccess = function (photos) {
    window.gallery.render(photos, document.querySelector('.pictures'));
  };
  var onLoadError = function (header, msg) {
    window.modalError.render(header, msg);
  };
  var pictureTemplate = document.querySelector('#picture').content;
  var renderPicture = function (picturesFragment, photo) {
    var pictureElement = pictureTemplate.cloneNode(true);
    var pictureImg = pictureElement.querySelector('.picture__img');
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;
    picturesFragment.appendChild(pictureElement);
    pictureImg.addEventListener('click', function () {
      window.preview.render(photo);
    });
  };
  window.gallery = {
    render: function (photos, target) {
      var picturesFragment = document.createDocumentFragment();

      photos.forEach(function (photo) {
        renderPicture(picturesFragment, photo);
      });

      target.appendChild(picturesFragment);
    },
    load: function () {
      window.galleryService.load(onLoadSuccess, onLoadError);
    }
  };
})();
