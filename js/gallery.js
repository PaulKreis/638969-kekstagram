'use strict';
(function () {
  var pictureTemplate = document.querySelector('#picture').content;
  var imgFilters = document.querySelector('.img-filters');
  var loadedPhotos = [];
  var clearGallery = function () {
    var imgs = document.querySelectorAll('.picture__link');
    var pictures = document.querySelector('.pictures');
    for (var i = 0; i < imgs.length; i++) {
      var pictureLink = document.querySelector('.picture__link');
      pictures.removeChild(pictureLink);
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

  var debouncedRender = window.utils.debounce(function (photos) {
    render(photos, document.querySelector('.pictures'));
  });

  var filterPhotos = function (filterName) {
    var filterPopular = document.querySelector('#filter-popular');
    var filterNew = document.querySelector('#filter-new');
    var filterDiscussed = document.querySelector('#filter-discussed');

    filterDiscussed.classList.remove('img-filters__button--active');
    filterPopular.classList.remove('img-filters__button--active');
    filterNew.classList.remove('img-filters__button--active');
    var filteredPhotos = loadedPhotos.slice();
    switch (filterName) {
      case 'filter-popular':
        filteredPhotos = loadedPhotos.slice();
        filterPopular.classList.add('img-filters__button--active');
        break;
      case 'filter-new':
        filteredPhotos = window.utils.getRandomSubArray(loadedPhotos, 10);
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
    debouncedRender(filteredPhotos);
  };
  var onFilterClick = function (evt) {
    filterPhotos(evt.target.id);
  };
  var onLoadSuccess = function (photos) {
    loadedPhotos = photos;
    imgFilters.classList.remove('img-filters--inactive');
    var filterForm = document.querySelector('.img-filters__form');
    filterForm.addEventListener('click', onFilterClick);
    render(loadedPhotos, document.querySelector('.pictures'));
  };

  var onLoadError = function (header, message) {
    window.modalError.render(header, message);
  };

  window.gallery = {
    init: function () {
      window.galleryService.load(onLoadSuccess, onLoadError);
    }
  };
})();
