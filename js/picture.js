'use strict';
(function () {
  var renderPhoto = function (pictureTemplate, picturesFragment, photo) {
    var pictureElement = pictureTemplate.cloneNode(true);
    var pictureImg = pictureElement.querySelector('.picture__img');
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;
    picturesFragment.appendChild(pictureElement);
    pictureImg.addEventListener('click', function () {
      window.preview.renderBigPicture(photo);
    });
  };

  window.picture = {
    renderPhotos: function (photos) {
      var pictureTemplate = document.querySelector('#picture').content;
      var pictureGridElement = document.querySelector('.pictures');
      var picturesFragment = document.createDocumentFragment();

      photos.forEach(function (photo) {
        renderPhoto(pictureTemplate, picturesFragment, photo);
      });
      pictureGridElement.appendChild(picturesFragment);
    }
  };
})();
