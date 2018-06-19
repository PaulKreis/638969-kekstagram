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

var renderPhotos = function (photos) {
  var pictureTemplate = document.querySelector('#picture').content;
  var pictureGridElement = document.querySelector('.pictures');
  var picturesFragment = document.createDocumentFragment();

  photos.forEach(function (currentValue) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = currentValue.url;
    pictureElement.querySelector('.picture__stat--likes').textContent = currentValue.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = currentValue.comments.length;
    picturesFragment.appendChild(pictureElement);
  });

  pictureGridElement.appendChild(picturesFragment);

  return photos;
};

var removeChildren = function (element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

var createCommentTemplate = function () {
  return document.querySelector('.social__comment');
};

var removeDefaultComments = function () {
  var commentsElement = document.querySelector('.social__comments');
  removeChildren(commentsElement);
  return commentsElement;
};

var renderComments = function (photos, commentsElement, commentTemplate) {
  var commentsFragment = document.createDocumentFragment();
  photos.comments.forEach(function (currentValue) {
    var commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = getAvatarPath(getRandomInt(1, 6));
    commentElement.querySelector('.social__text').textContent = currentValue;
    commentsFragment.appendChild(commentElement);
  });
  commentsElement.appendChild(commentsFragment);
};


var renderBigPicture = function (picture) {
  var bigPictureElement = document.querySelector('.big-picture');

  bigPictureElement.querySelector('.big-picture__img').src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;

  bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = picture.description;

  //  Прячем блоки счётчика комментариев и загрузки новых комментариев
  var commentCountElement = document.querySelector('.social__comment-count');
  commentCountElement.classList.add('visually-hidden');
  var loadMoreElement = document.querySelector('.social__loadmore');
  loadMoreElement.classList.add('visually-hidden');

  bigPictureElement.classList.remove('hidden');
};

var initPage = function () {
  var photos = generatePhotos(PHOTO_NUMBER);
  renderPhotos(photos);
  renderBigPicture(photos[0]);
  var commentTemplate = createCommentTemplate();
  var commentsList = removeDefaultComments();
  renderComments(photos[0], commentsList, commentTemplate);
};

initPage();
