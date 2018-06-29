'use strict';
(function () {
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
  var MAX_PHRASE_IN_COMMENTS = 2;
  var IMG_PATH = 'photos/';
  var IMG_EXT = '.jpg';

  var getPhotoPath = function (photoIndex) {
    return IMG_PATH + photoIndex + IMG_EXT;
  };

  var generateCommentsPhrase = function (phraseNum) {
    var commentPhrase = '';
    for (var i = 0; i < phraseNum; i++) {
      commentPhrase += COMMENTS[window.utils.getRandomInt(0, COMMENTS.length - 1)];
    }
    return commentPhrase;
  };

  //  Создаем массив, состоящий из photoNumber сгенерированных JS объектов
  var generatePhoto = function (index) {
    var photo = {};
    var comments = [];
    photo.url = getPhotoPath(index);
    photo.likes = window.utils.getRandomInt(LIKES_MIN, LIKES_MAX);
    for (var i = 0; i < COMMENTS_NUMBER; i++) {
      comments[i] = generateCommentsPhrase(window.utils.getRandomInt(1, MAX_PHRASE_IN_COMMENTS));
    }
    photo.comments = comments;
    photo.description = DESCRIPTIONS[window.utils.getRandomInt(0, DESCRIPTIONS.length - 1)];
    return photo;
  };

  window.data = {
    generatePhotos: function (photoNumber) {
      var photos = [];
      for (var i = 0; i < photoNumber; i++) {
        photos[i] = generatePhoto(i + 1);
      }
      return photos;
    }
  };
})();
