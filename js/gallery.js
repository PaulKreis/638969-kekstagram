'use strict';
(function () {
  var pictureTemplate = document.querySelector('#picture').content;
  var imgFilter = document.querySelector('.img-filters');
  var loadedPhotos = [];
  var clearGallery = function () {
    var imgs = document.querySelectorAll('.picture__link');
    for (var i = 0; i < imgs.length; i++) {
      var pictures = document.querySelector('.pictures');
      var img = document.querySelector('.picture__link');
      pictures.removeChild(img);
    }
  };

  var render = function (photos, target) {
    clearGallery();
    var picturesFragment = document.createDocumentFragment();

    photos.forEach(function (photo) {
      renderPicture(picturesFragment, photo);
    });

    target.appendChild(picturesFragment);
  };

  var renderPicture = function (picturesFragment, photo) {
    var picture = pictureTemplate.cloneNode(true);
    var pictureLink = picture.querySelector('.picture__link');
    picture.querySelector('.picture__img').src = photo.url;
    picture.querySelector('.picture__stat--likes').textContent = photo.likes;
    picture.querySelector('.picture__stat--comments').textContent = photo.comments.length;
    picturesFragment.appendChild(picture);
    pictureLink.addEventListener('click', function () {
      window.preview.render(photo);
    });
    pictureLink.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.enums.KeyCode.ENTER) {
        window.preview.render(photo);
      }
    });
  };
  var filterPhotos = function (evt) {
    var filteredPhotos = [];
    var filterPopular = document.querySelector('#filter-popular');
    var filterNew = document.querySelector('#filter-new');
    var filterDiscussed = document.querySelector('#filter-discussed');

    filterDiscussed.classList.remove('img-filters__button--active');
    filterPopular.classList.remove('img-filters__button--active');
    filterNew.classList.remove('img-filters__button--active');
    filteredPhotos = loadedPhotos.slice();
    switch (evt.target.id) {
      case 'filter-popular':
        filteredPhotos = loadedPhotos.slice();
        filterPopular.classList.add('img-filters__button--active');
        break;
      case 'filter-new':
        filteredPhotos = window.utils.getRandomSubarray(loadedPhotos, 10);
        filterNew.classList.add('img-filters__button--active');
        break;
      case 'filter-discussed':
        filteredPhotos = loadedPhotos.slice();
        filteredPhotos.sort(function (left, right) {
          return right.comments.length - left.comments.length;
        });
        filterDiscussed.classList.add('img-filters__button--active');
        break;
    }
    window.utils.debounce(function () {
      render(filteredPhotos, document.querySelector('.pictures'));
    }, 300)();
  };
  var onFilterPress = function (evt) {
    filterPhotos(evt);
  };
  var onLoadSuccess = function (photos) {
    loadedPhotos = photos.slice();
    imgFilter.classList.remove('img-filters--inactive');
    imgFilter.addEventListener('click', onFilterPress);
    render(photos, document.querySelector('.pictures'));
  };

  var onLoadError = function (header, msg) {
    window.modalError.render(header, msg);
  };

  window.gallery = {
    init: function () {
      window.galleryService.load(onLoadSuccess, onLoadError);
    }
  };
})();
