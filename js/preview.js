'use strict';
(function () {
  var AVATAR_HEIGHT = 35;
  var AVATAR_WIDTH = 35;
  var AVATAR_PATH = 'img/avatar';
  var AVATAR_EXT = '.svg';
  var visibleCommentCount = 0;
  var currentData = null;
  var commentsElement = document.querySelector('.social__comments');
  var bigPictureElement = document.querySelector('.big-picture');
  var body = document.querySelector('body');

  var getAvatarPath = function (avatarIndex) {
    return AVATAR_PATH + '-' + avatarIndex + AVATAR_EXT;
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

  var renderComments = function (comments) {
    var commentsFragment = document.createDocumentFragment();

    comments.forEach(function (comment) {
      commentsFragment.appendChild(createCommentElement(comment));
    });
    return commentsFragment;
  };

  var open = function (bigPictureElem) {
    bigPictureElem.classList.remove('hidden');
  };

  var close = function (bigPictureElem) {
    bigPictureElem.classList.add('hidden');
    body.classList.remove('modal-open');
  };

  var commentCountElement = document.querySelector('.social__comment-count');
  commentCountElement.classList.remove('visually-hidden');

  var more = document.querySelector('.social__loadmore');
  more.classList.remove('visually-hidden');

  var checkComments = function () {
    if (currentData.comments.length - visibleCommentCount > 5) {
      more.classList.remove('visually-hidden');
      window.utils.removeChildren(commentsElement);
      visibleCommentCount += 5;
    } else {
      window.utils.removeChildren(commentsElement);
      more.classList.add('visually-hidden');
      visibleCommentCount += currentData.comments.length - visibleCommentCount;
    }
    var comments = currentData.comments.slice(0, visibleCommentCount);
    commentsElement.appendChild(renderComments(comments));
    commentCountElement.textContent = visibleCommentCount + ' из ' + currentData.comments.length + ' комментариев';
  };

  more.addEventListener('click', checkComments);

  window.preview = {
    render: function (picture) {
      body.classList.add('modal-open');
      currentData = picture;
      visibleCommentCount = 0;

      var bigPictureImg = bigPictureElement.querySelector('.big-picture__img');
      bigPictureImg.querySelector('img').src = picture.url;
      bigPictureElement.querySelector('.likes-count').textContent = picture.likes;

      commentCountElement.textContent = '5 из ' + picture.comments.length + ' комментариев';
      bigPictureElement.querySelector('.social__caption').textContent = picture.description;

      open(bigPictureElement);
      checkComments();

      //  Закрытие окна с большой картинкой по клику на крестик
      var closeBtn = bigPictureElement.querySelector('.big-picture__cancel');
      closeBtn.addEventListener('click', function () {
        close(bigPictureElement);
      });
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.enums.KeyCode.ESC) {
          close(bigPictureElement);
        }
      });
    }
  };
})();
