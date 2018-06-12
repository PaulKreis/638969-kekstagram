var jsObjects = [];

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
]
var getRandom = function(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
var generateJsObject = function(urlNum){
   
    var jsObject = {};
    var commentsArray = [];
    jsObject.url = 'photos/'+urlNum+'.jpg';
    jsObject.likes = getRandom(15,200);
    for(var i=0;i<2;i++){
        commentsArray[i]='';
        for(var j=0;j<getRandom(1,2);j++){
            commentsArray[i]+=commentsData[getRandom(0,5)];
        }
    }

    jsObject.comments = commentsArray;
    jsObject.description = descriptionData[getRandom(0,5)];
   
    return jsObject;
};

for (var i=0;i<25;i++){
    jsObjects[i] = generateJsObject(i+1);
}

var pictureTemplate = document.querySelector('#picture').content;
var pictureGrid = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

for (var i=0;i<25;i++){
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = jsObjects[i].url;
    pictureElement.querySelector('.picture__stat--likes').textContent = jsObjects[i].likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = jsObjects[i].comments;
    fragment.appendChild(pictureElement);
};

pictureGrid.appendChild(fragment);

var bigPic = document.querySelector('.big-picture');
bigPic.classList.remove('hidden');

bigPic.querySelector('.big-picture__img').src = jsObjects[0].url;
bigPic.querySelector('.likes-count').textContent = jsObjects[0].likes;

bigPic.querySelector('.comments-count').textContent = jsObjects[0].comments.length;
bigPic.querySelector('.social__caption').textContent = jsObjects[0].description;

var comments = document.querySelectorAll('.social__comment');
console.log(comments);

for (var i=0;i<comments.length;i++){
    comments[i].querySelector('.social__picture').src = 'img/avatar-'+getRandom(1,6)+'.svg';
    comments[i].querySelector('.social__text').textContent = jsObjects[i].comments[i];
}

var sCount = document.querySelector('.social__comment-count');
sCount.classList.add('visually-hidden');
var sCountLoadMore = document.querySelector('.social__loadmore');
sCountLoadMore.classList.add('visually-hidden');
