'use strict';

var photos = [];

var commentsData = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var descriptionData = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var LIKES_MIN = 15;
var LIKES_MAX = 200;
var NUMBER_OF_COMMENTS = 2;
var NUMBER_OF_PHOTO = 25;
var MAX_PHRASE_IN_COMMENTS = 2;

var getRandomNum = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

//  Создаем массив из 25 сгенерированных JS объектов, которые будут описывать фотографии
var generatePhoto = function (urlNum) {
  var photo = {};
  var commentsArray = [];
  photo.url = 'photos/' + urlNum + '.jpg';
  photo.likes = getRandomNum(LIKES_MIN, LIKES_MAX);
  for (var i = 0; i < NUMBER_OF_COMMENTS; i++) {
    commentsArray[i] = '';
    for (var j = 0; j < getRandomNum(1, MAX_PHRASE_IN_COMMENTS); j++) {
      commentsArray[i] += commentsData[getRandomNum(0, commentsData.length - 1)];
    }
  }
  photo.comments = commentsArray;
  photo.description = descriptionData[getRandomNum(0, descriptionData.length - 1)];
  return photo;
};

for (var i = 0; i < NUMBER_OF_PHOTO; i++) {
  photos[i] = generatePhoto(i + 1);
}

//  Показываем сетку из фотографий
var pictureTemplate = document.querySelector('#picture').content;
var pictureGrid = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

for (i = 0; i < NUMBER_OF_PHOTO; i++) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photos[i].url;
  pictureElement.querySelector('.picture__stat--likes').textContent = photos[i].likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = photos[i].comments;
  fragment.appendChild(pictureElement);
}

pictureGrid.appendChild(fragment);

//  Показываем и заполняем элемент .big-picture данными из первого элемента массива
var bigPic = document.querySelector('.big-picture');
bigPic.classList.remove('hidden');

bigPic.querySelector('.big-picture__img').src = photos[0].url;
bigPic.querySelector('.likes-count').textContent = photos[0].likes;

bigPic.querySelector('.comments-count').textContent = photos[0].comments.length;
bigPic.querySelector('.social__caption').textContent = photos[0].description;

var comments = document.querySelectorAll('.social__comment');

for (i = 0; i < comments.length; i++) {
  comments[i].querySelector('.social__picture').src = 'img/avatar-' + getRandomNum(1, 6) + '.svg';
  comments[i].querySelector('.social__text').textContent = photos[i].comments[i];
}

//  Прячем блоки счётчика комментариев и загрузки новых комментариев
var sCount = document.querySelector('.social__comment-count');
sCount.classList.add('visually-hidden');
var sCountLoadMore = document.querySelector('.social__loadmore');
sCountLoadMore.classList.add('visually-hidden');
