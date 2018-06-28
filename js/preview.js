'use strict';
(function () {
  var AVATAR_HEIGHT = 35;
  var AVATAR_WIDTH = 35;
  var AVATAR_PATH = 'img/avatar-';
  var AVATAR_EXT = '.svg';

  var getAvatarPath = function (avatarIndex) {
    return AVATAR_PATH + avatarIndex + AVATAR_EXT;
  };

  var createCommentElement = function (comment) {
    var commentElement = document.createElement('li');
    commentElement.className = 'social__comment';

    var socialPictureElement = document.createElement('img');
    socialPictureElement.className = 'social__picture';
    socialPictureElement.src = getAvatarPath(window.utils.getRandomInt(1, 6));
    socialPictureElement.alt = 'Аватар комментатора фотографии';
    socialPictureElement.width = AVATAR_WIDTH;
    socialPictureElement.height = AVATAR_HEIGHT;

    var socialTextElement = document.createElement('p');
    socialTextElement.className = 'social__text';
    socialTextElement.textContent = comment;

    commentElement.appendChild(socialPictureElement);
    commentElement.appendChild(socialTextElement);
    return commentElement;
  };

  var renderComments = function (photos) {
    var commentsFragment = document.createDocumentFragment();

    photos.comments.forEach(function (comment) {
      commentsFragment.appendChild(createCommentElement(comment));
    });
    return commentsFragment;
  };

  var hideCommentsFeatures = function () {
    //  Прячем блоки счётчика комментариев и загрузки новых комментариев
    var commentCountElement = document.querySelector('.social__comment-count');
    commentCountElement.classList.add('visually-hidden');
    var loadMoreElement = document.querySelector('.social__loadmore');
    loadMoreElement.classList.add('visually-hidden');
  };

  // Отрисовка окна с крупной картинкой
  var openBigPicture = function (bigPictureElement) {
    bigPictureElement.classList.remove('hidden');
  };

  var closeBigPicture = function (bigPictureElement) {
    bigPictureElement.classList.add('hidden');
  };

  window.preview = {
    renderBigPicture: function (picture) {
      var bigPictureElement = document.querySelector('.big-picture');

      var bigPictureImg = bigPictureElement.querySelector('.big-picture__img');
      bigPictureImg.querySelector('img').src = picture.url;
      bigPictureElement.querySelector('.likes-count').textContent = picture.likes;

      bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
      bigPictureElement.querySelector('.social__caption').textContent = picture.description;

      openBigPicture(bigPictureElement);
      hideCommentsFeatures();
      var commentsElement = document.querySelector('.social__comments');
      window.utils.removeChildren(commentsElement);
      commentsElement.appendChild(renderComments(picture));

      //  Закрытие окна с большой картинкой по клику на крестик
      var bigPictureCloseBtn = bigPictureElement.querySelector('.big-picture__cancel');
      bigPictureCloseBtn.addEventListener('click', function () {
        closeBigPicture(bigPictureElement);
      });
      document.addEventListener('keydown', function () {
        if (event.keyCode === window.enums.ESC_KEYCODE) {
          closeBigPicture(bigPictureElement);
        }
      });
    }
  };
})();
