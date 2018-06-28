'use strict';
(function () {
  window.picture = {
    renderPhoto: function (pictureTemplate, picturesFragment, photo) {
      var pictureElement = pictureTemplate.cloneNode(true);
      var pictureImg = pictureElement.querySelector('.picture__img');
      pictureElement.querySelector('.picture__img').src = photo.url;
      pictureElement.querySelector('.picture__stat--likes').textContent = photo.likes;
      pictureElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;
      picturesFragment.appendChild(pictureElement);
      pictureImg.addEventListener('click', function () {
        window.preview.renderBigPicture(photo);
      });
    }
  };
})();
