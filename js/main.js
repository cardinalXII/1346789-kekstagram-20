'use strict';
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Кекс', 'Евгений', 'Ульяна', 'Сергей', 'Боб', 'Владыка', 'Кришна', 'Вишну', 'Хануман', 'Гонеш', 'Сварог', 'Велес', 'Ярослав'];
var PICTURE_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture');
var PICTURES_CONTAINER = document.querySelector('.pictures');
var MAX_NUMBER = 26;

// случайное число от и до
var randomInteger = function (min, max) {
  var randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

// генерация коментариев
var messages = [];
for (var l = 0; l < MAX_NUMBER; l++) {
  var randomIndexWord = Math.floor(Math.random() * COMMENTS.length);
  var message = COMMENTS[randomIndexWord];
  messages.push(message);
}

// генерация имени
var names = [];
for (var n = 0; n < MAX_NUMBER; n++) {
  var randomIndexName = Math.floor(Math.random() * NAMES.length);
  var nameUser = NAMES[randomIndexName];
  names.push(nameUser);
}

// создание коментраиев
var generatorComments = function () {
  var num = randomInteger(3, MAX_NUMBER);
  var comments = [];
  for (var c = 0; c < num; c++) {
    comments.push({
      avatar: 'img/avatar-' + randomInteger(1, 6) + '.svg',
      message: messages[c],
      name: names[c]
    });
  }
  return comments;
};

// массив вывода фото
var photos = [];
for (var i = 1; i < MAX_NUMBER; i++) {
  photos.push({
    url: 'photos/' + i + '.jpg',
    description: 'Класная фотка',
    likes: randomInteger(15, 200),
    comments: generatorComments()
  });
}
var renderPicture = function (photo) {
  var pictureElement = PICTURE_TEMPLATE.cloneNode(true);

  pictureElement.querySelector('img').setAttribute('src', photo.url);
  pictureElement.querySelector('img').setAttribute('alt', photo.description);
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return pictureElement;
};

var fragment = document.createDocumentFragment();

for (var g = 0; g < photos.length; g++) {
  fragment.appendChild(renderPicture(photos[g]));
}

PICTURES_CONTAINER.appendChild(fragment);
