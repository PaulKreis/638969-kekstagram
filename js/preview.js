'use strict';
(function () {
  var AVATAR_HEIGHT = 35;
  var AVATAR_WIDTH = 35;
  var AVATAR_PATH = 'img/avatar';
  var AVATAR_EXT = '.svg';
  var visibleCommentCount = 0;
  var currentData = null;
  var commentsElement = document.querySelector('.social__comments');
  var bigPicture = document.querySelector('.big-picture');
  var body = document.querySelector('body');

  var getAvatarPath = function (avatarIndex) {
    return AVATAR_PATH + '-' + avatarIndex + AVATAR_EXT;
  };

  var createComment = function (comment) {
    var сomment = document.createElement('li');
    сomment.className = 'social__comment';

    var avatarImg = document.createElement('img');
    avatarImg.className = 'social__picture';
    avatarImg.src = getAvatarPath(window.utils.getRandomInt(1, 6));
    avatarImg.alt = 'Аватар комментатора фотографии';
    avatarImg.width = AVATAR_WIDTH;
    avatarImg.height = AVATAR_HEIGHT;

    var commentText = document.createElement('p');
    commentText.className = 'social__text';
    commentText.textContent = comment;

    сomment.appendChild(avatarImg);
    сomment.appendChild(commentText);
    return сomment;
  };

  var renderComments = function (comments) {
    var commentsFragment = document.createDocumentFragment();

    comments.forEach(function (comment) {
      commentsFragment.appendChild(createComment(comment));
    });
    return commentsFragment;
  };

  var open = function (modal) {
    modal.classList.remove('hidden');
  };

  var close = function (modal) {
    modal.classList.add('hidden');
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

      var bigPictureImg = bigPicture.querySelector('.big-picture__img');
      bigPictureImg.querySelector('img').src = picture.url;
      bigPicture.querySelector('.likes-count').textContent = picture.likes;

      commentCountElement.textContent = '5 из ' + picture.comments.length + ' комментариев';
      bigPicture.querySelector('.social__caption').textContent = picture.description;

      open(bigPicture);
      checkComments();

      //  Закрытие окна с большой картинкой по клику на крестик
      var closeBtn = bigPicture.querySelector('.big-picture__cancel');
      closeBtn.addEventListener('click', function () {
        close(bigPicture);
      });
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.enums.KeyCode.ESC) {
          close(bigPicture);
        }
      });
    }
  };
})();
