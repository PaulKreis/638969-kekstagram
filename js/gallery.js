'use strict';
(function () {
  var onLoadSuccess = function (photos) {
    window.photoData = photos;
    init(photos, document.querySelector('.pictures'));
  };
  var onLoadError = function (header, msg) {
    window.modalError.render(header, msg);
  };
  var clearGallery = function () {
    var imgs = document.querySelectorAll('.picture__link');
    for (var i = 0; i < imgs.length; i++) {
      var dd = document.querySelector('.pictures');
      var img = document.querySelector('.picture__link');
      dd.removeChild(img);
    }
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
  var init = function (photos) {
    var filterRender = function (evt) {
      var newArr = [];

      var popularButton = document.querySelector('#filter-popular');
      var newButton = document.querySelector('#filter-new');
      var discussedButton = document.querySelector('#filter-discussed');

      discussedButton.classList.remove('img-filters__button--active');
      popularButton.classList.remove('img-filters__button--active');
      newButton.classList.remove('img-filters__button--active');

      switch (evt.target.id) {
        case 'filter-popular':
          newArr = photos.slice();
          popularButton.classList.add('img-filters__button--active');
          break;
        case 'filter-new':
          newArr = window.utils.getRandomSubarray(photos, 10);
          newButton.classList.add('img-filters__button--active');
          break;
        case 'filter-discussed':
          newArr = photos.slice();
          newArr.sort(function (left, right) {
            return right.comments.length - left.comments.length;
          });
          discussedButton.classList.add('img-filters__button--active');
          break;
      }
      window.gallery.render(newArr, document.querySelector('.pictures'));
    };
    var imgFilter = document.querySelector('.img-filters');
    imgFilter.classList.remove('img-filters--inactive');
    imgFilter.addEventListener('click', filterRender);
    window.gallery.render(photos, document.querySelector('.pictures'));
  };
  window.gallery = {
    render: function (photos, target) {
      clearGallery();
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
