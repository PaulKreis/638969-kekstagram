'use strict';
(function () {
  var AVATAR_HEIGHT = 35;
  var AVATAR_WIDTH = 35;
  var AVATAR_PATH = 'img/avatar';
  var AVATAR_EXT = '.svg';
  var visibleCommentCount = 0;
  var commentsLoaded = 5;
  var currentData = null;
  var socialComments = document.querySelector('.social__comments');
  var bigPicture = document.querySelector('.big-picture');

  var getAvatarPath = function (avatarIndex) {
    return AVATAR_PATH + '-' + avatarIndex + AVATAR_EXT;
  };

  var createComment = function (commentContent) {
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
    commentText.textContent = commentContent;

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
    more.addEventListener('click', onMoreClick);
  };

  var close = function (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
  };

  var commentCount = document.querySelector('.social__comment-count');
  commentCount.classList.remove('visually-hidden');

  var more = document.querySelector('.social__loadmore');
  more.classList.remove('visually-hidden');

  var onMoreClick = function () {
    checkComments();
  };

  var checkComments = function () {
    if (currentData.comments.length - visibleCommentCount > commentsLoaded) {
      more.classList.remove('visually-hidden');
      window.utils.removeChildren(socialComments);
      visibleCommentCount += commentsLoaded;
    } else {
      window.utils.removeChildren(socialComments);
      more.classList.add('visually-hidden');
      visibleCommentCount += currentData.comments.length - visibleCommentCount;
    }
    var comments = currentData.comments.slice(0, visibleCommentCount);
    socialComments.appendChild(renderComments(comments));
    commentCount.textContent = visibleCommentCount + ' из ' + currentData.comments.length + ' комментариев';
  };

  window.preview = {
    render: function (picture) {
      document.body.classList.add('modal-open');
      currentData = picture;
      visibleCommentCount = 0;

      var bigPictureImg = bigPicture.querySelector('.big-picture__img');
      bigPictureImg.querySelector('img').src = picture.url;
      bigPicture.querySelector('.likes-count').textContent = picture.likes;

      commentCount.textContent = '5 из ' + picture.comments.length + ' комментариев';
      bigPicture.querySelector('.social__caption').textContent = picture.description;

      open(bigPicture);
      checkComments();

      //  Закрытие окна с большой картинкой по клику на крестик
      var closeBtn = bigPicture.querySelector('.big-picture__cancel');
      var onCloseBtnClick = function () {
        close(bigPicture);
        closeBtn.removeEventListener('click', onCloseBtnClick);
        document.removeEventListener('keydown', onBtnPress);
        more.removeEventListener('click', onMoreClick);
      };
      var onBtnPress = function (evt) {
        if (evt.keyCode === window.enums.KeyCode.ESC) {
          onCloseBtnClick();
        }
      };

      closeBtn.addEventListener('click', onCloseBtnClick);
      document.addEventListener('keydown', onBtnPress);
    }
  };
})();
