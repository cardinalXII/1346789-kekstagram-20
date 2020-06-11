'use strict';
var WORDS_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES_COMENTS = ['Кекс', 'Евгений', 'Ульяна', 'Сергей', 'Боб', 'Владыка', 'Кришна', 'Вишну', 'Хануман', 'Гонеш', 'Сварог', 'Велес', 'Ярослав'];
var USERS_ORIGIN = document.querySelector('#picture').content.querySelector('.picture');
var USERS_CLONE = document.querySelector('.pictures');


// число от 1 до 6 для аватара
var avatars = [];
for (var t = 0; t < 25; t++) {
  var randomInteger = function (min, max) {
    // случайное число от min до (max+1)
    var randava = min + Math.random() * (max + 1 - min);
    return Math.floor(randava);
  };
  var randavas = randomInteger(1, 6);
  avatars.push(randavas);
}

// настройки лайков
var likes = [];
for (var j = 0; j < 25; j++) {
  var randomIntegerLikes = function (min, max) {
    // случайное число от min до (max+1)
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };
  var like = randomIntegerLikes(15, 200);
  likes.push(like);
}

// число от 1 до 25 для картинок
var numbers = [];
for (var k = 1; k < 26; k++) {
  var randNum = k;
  numbers.push(randNum);
}

// генерация коментариев
var messages = [];
for (var l = 0; l < 25; l++) {
  var randomIndexWord = Math.floor(Math.random() * WORDS_COMMENTS.length);
  var mess = WORDS_COMMENTS[randomIndexWord];
  messages.push(mess);
}

// генерация имени
var names = [];
for (var n = 0; n < 25; n++) {
  var randomIndexName = Math.floor(Math.random() * NAMES_COMENTS.length);
  var nameIndex = NAMES_COMENTS[randomIndexName];
  names.push(nameIndex);
}

// настройки вывода коментариев
// генерируем случайное число комментариев
var randomIntegerComments = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
// создание коментраиев
var generationComments = function () {

  var num = randomIntegerComments(3, 25);

  var comments = [];
  for (var c = 0; c < num; c++) {
    comments.push({
      avatar: 'img/avatar-' + avatars[c] + '.svg',
      message: messages[c],
      name: names[c]
    });
  }
  return comments;
};

// массив настройки вывода фото
var photos = [];
for (var i = 0; i < 25; i++) {
  photos.push({
    url: 'photos/' + numbers[i] + '.jpg',
    description: 'Класная фотка',
    likes: likes[i],
    comments: generationComments()
  });
}
var renderPicture = function (photo) {
  var userElement = USERS_ORIGIN.cloneNode(true);

  userElement.querySelector('img').setAttribute('src', photo.url);
  userElement.querySelector('img').setAttribute('alt', photo.description);
  userElement.querySelector('.picture__likes').textContent = photo.likes;
  userElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return userElement;
};

var fragment = document.createDocumentFragment();

for (var g = 0; g < photos.length; g++) {
  fragment.appendChild(renderPicture(photos[g]));
}

USERS_CLONE.appendChild(fragment);
