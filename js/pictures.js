'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS_NUMBER = 2;
var PHOTO_NUMBER = 25;
var MAX_PHRASE_IN_COMMENTS = 2;
var IMG_PATH = 'photos/';
var IMG_EXT = '.jpg';
var AVATAR_PATH = 'img/avatar-';
var AVATAR_EXT = '.svg';
var AVATAR_HEIGHT = 35;
var AVATAR_WIDTH = 35;
var ESC_KEYCODE = 27;

//  Функции генерации внутренних значений
var getRandomInt = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getPhotoPath = function (photoIndex) {
  return IMG_PATH + photoIndex + IMG_EXT;
};

var getAvatarPath = function (avatarIndex) {
  return AVATAR_PATH + avatarIndex + AVATAR_EXT;
};

var generateCommentsPhrase = function (phraseNum) {
  var commentPhrase = '';
  for (var i = 0; i < phraseNum; i++) {
    commentPhrase += COMMENTS[getRandomInt(0, COMMENTS.length - 1)];
  }
  return commentPhrase;
};

var removeChildren = function (element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

//  Создаем массив, состоящий из photoNumber сгенерированных JS объектов
var generatePhoto = function (index) {
  var photo = {};
  var comments = [];
  photo.url = getPhotoPath(index);
  photo.likes = getRandomInt(LIKES_MIN, LIKES_MAX);
  for (var i = 0; i < COMMENTS_NUMBER; i++) {
    comments[i] = generateCommentsPhrase(getRandomInt(1, MAX_PHRASE_IN_COMMENTS));
  }
  photo.comments = comments;
  photo.description = DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)];
  return photo;
};

var generatePhotos = function (photoNumber) {
  var photos = [];
  for (var i = 0; i < photoNumber; i++) {
    photos[i] = generatePhoto(i + 1);
  }
  return photos;
};

//  Функции отрисовки сетки фотографий на странице
var renderPhoto = function (pictureTemplate, picturesFragment, photo) {
  var pictureElement = pictureTemplate.cloneNode(true);
  var pictureImg = pictureElement.querySelector('.picture__img');
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__stat--likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;
  picturesFragment.appendChild(pictureElement);
  pictureImg.addEventListener('click', function () {
    renderBigPicture(photo);
  });
};

var renderPhotos = function (photos) {
  var pictureTemplate = document.querySelector('#picture').content;
  var pictureGridElement = document.querySelector('.pictures');
  var picturesFragment = document.createDocumentFragment();

  photos.forEach(function (photo) {
    renderPhoto(pictureTemplate, picturesFragment, photo);
  });
  pictureGridElement.appendChild(picturesFragment);
};

//  Работа с комментариями
var createCommentElement = function (comment) {
  var commentElement = document.createElement('li');
  commentElement.className = 'social__comment';

  var socialPictureElement = document.createElement('img');
  socialPictureElement.className = 'social__picture';
  socialPictureElement.src = getAvatarPath(getRandomInt(1, 6));
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

var renderBigPicture = function (picture) {
  var bigPictureElement = document.querySelector('.big-picture');

  var bigPictureImg = bigPictureElement.querySelector('.big-picture__img');
  bigPictureImg.querySelector('img').src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;

  bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = picture.description;

  openBigPicture(bigPictureElement);
  hideCommentsFeatures();

  var commentsElement = document.querySelector('.social__comments');
  removeChildren(commentsElement);
  commentsElement.appendChild(renderComments(picture));

  //  Закрытие окна с большой картинкой по клику на крестик
  var bigPictureCloseBtn = bigPictureElement.querySelector('.big-picture__cancel');
  bigPictureCloseBtn.addEventListener('click', function () {
    closeBigPicture(bigPictureElement);
  });
};

var initPage = function () {
  var photos = generatePhotos(PHOTO_NUMBER);
  renderPhotos(photos);
  var uploadFile = document.getElementById('upload-file');
  uploadFile.addEventListener('change', function () {
    uploadOverlay.classList.remove('hidden');
    imgZoomValueChange('default');
  });
};

initPage();

//  #15 Личный проект: подробности
var uploadOverlay = document.querySelector('.img-upload__overlay');

//  Закрытие окна редактирования по клике на крестик
var closeUploadOverlay = function () {
  uploadOverlay.classList.add('hidden');
};

var uploadCancel = document.getElementById('upload-cancel');
uploadCancel.addEventListener('click', function () {
  closeUploadOverlay();
});

//  Закрытие окна редактирования по нажатию Esc
var onUploadOverlayEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeUploadOverlay();
  }
};

document.addEventListener('keydown', onUploadOverlayEscPress);

//  Наложение эффекта на изображение
var targetImage = document.querySelector('.img-upload__preview');
var addFilter = function (filterName, proportion) {
  var scaleValue = uploadOverlay.querySelector('.scale__value');
  var filter = '';
  var intense;
  switch (filterName) {
    case 'chrome' :
      intense = proportion.toFixed(2);
      filter = 'grayscale(' + intense + ')';
      break;
    case 'sepia' :
      intense = proportion.toFixed(2);
      filter = 'sepia(' + intense + ')';
      break;
    case 'marvin' :
      intense = proportion.toFixed(2) * 100;
      filter = 'invert(' + intense + '%)';
      break;
    case 'phobos' :
      intense = proportion.toFixed(1) * 3;
      filter = 'blur(' + intense + 'px)';
      break;
    case 'heat' :
      intense = proportion.toFixed(2) * 3;
      filter = 'brightness(' + intense + ')';
      break;
    default :
      filter = 'none';
  }
  scaleValue.textContent = intense;
  targetImage.style.filter = filter;
};

var removeFilter = function () {
  targetImage.style.filter = '';
};

var oldEffect = '';
var addEffect = function (effectName) {
  removeFilter();
  var controlScale = uploadOverlay.querySelector('.img-upload__scale');
  targetImage.classList.remove('effects__preview--' + oldEffect);
  targetImage.classList.add('effects__preview--' + effectName);
  oldEffect = effectName;
  if (effectName === 'none') {
    controlScale.classList.add('hidden');
  } else {
    controlScale.classList.remove('hidden');
  }
};

uploadOverlay.addEventListener('click', function () {
  if (event.target.name === 'effect') {
    addEffect(event.target.value);
  }
});

//  Ползунок
var scalePin = uploadOverlay.querySelector('.scale__pin');
scalePin.addEventListener('mouseup', function () {
  var scaleLine = uploadOverlay.querySelector('.scale__line');
  var scaleLineWidth = scaleLine.offsetWidth;
  var pinX = scalePin.offsetLeft;
  var proportion = (pinX / scaleLineWidth);
  addFilter(oldEffect, proportion);
});

//  Изменение масштаба
var imgZoomValueChange = function (action) {
  var controlValue = uploadOverlay.querySelector('.resize__control--value');
  var RESIZE_STEP = 25;
  var IMG_SIZE_MIN = 25;
  var IMG_SIZE_MAX = 100;
  var DEFAULT_ZOOM = 100;
  var resizeValueNum = parseInt(controlValue.value, 10);

  switch (action) {
    case 'increase' :
      if (resizeValueNum < IMG_SIZE_MAX) {
        resizeValueNum += RESIZE_STEP;
      }
      break;
    case 'decrease' :
      if (resizeValueNum > IMG_SIZE_MIN) {
        resizeValueNum -= RESIZE_STEP;
      }
      break;
    case 'default' :
      resizeValueNum = DEFAULT_ZOOM;
      break;
  }

  targetImage.style.transform = 'scale(' + resizeValueNum / 100 + ')';
  controlValue.value = resizeValueNum + '%';
};

var controlPlus = uploadOverlay.querySelector('.resize__control--plus');
controlPlus.addEventListener('click', function () {
  imgZoomValueChange('increase');
});

var controlMinus = uploadOverlay.querySelector('.resize__control--minus');
controlMinus.addEventListener('click', function () {
  imgZoomValueChange('decrease');
});
