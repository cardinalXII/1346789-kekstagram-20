'use strict';
var WORDS_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES_COMENTS = ['Кекс', 'Евгений', 'Ульяна', 'Сергей', 'Боб', 'Владыка', 'Кришна', 'Вишну', 'Хануман', 'Гонеш', 'Сварог', 'Велес', 'Ярослав'];
var USERS_ORIGIN = document.querySelector('#picture').content.querySelector('.picture');
var USERS_CLONE = document.querySelector('.pictures');


//число от 1 до 6 для аватара
var avatars = [];
for (var t = 0; t < NAMES_COMENTS.length; t++) {
  function randomInteger(min, max) {
    // случайное число от min до (max+1)
    var randava = min + Math.random() * (max + 1 - min);
    return Math.floor(randava);
  }
  var randavas = randomInteger(1, 6) ;
  avatars.push(randavas);
}

//настройки лайков
var likes = [];
for (var j = 0; j < 25; j++) {
  function randomInteger(min, max) {
    // случайное число от min до (max+1)
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
  var like = randomInteger(15, 200) ;
  likes.push(like);
}

//число от 1 до 25 для картинок
var numbers = [];
for (var k = 1; k < 26; k++) {
  var randNum = k;
  numbers.push(randNum);
}

//настройки вывода коментариев
var commmentSet = [];
for (var l = 0; l < WORDS_COMMENTS.length; l++) {
commmentSet.push ( {avatar: 'img/avatar-' + avatars[l] + '.svg',
  message: WORDS_COMMENTS [l],
  name: NAMES_COMENTS [l]
  })
}

//настройки вывода пользователя
  var userSets = [];
  for (var i = 0; i < NAMES_COMENTS.length; i++) {
  userSets.push({
  url: 'photos/' + numbers[i] + '.jpg',
  description: 'Класная фотка',
  likes: likes[i],
  comments:commmentSet[i]
  })};

var renderPicture = function(userSet) {
  var userElement = USERS_ORIGIN.cloneNode(true);

  userElement.querySelector('img').setAttribute('src', 'photos/' + numbers[g] + '.jpg');
  userElement.querySelector('img').setAttribute('alt', 'Класная фотка');
  userElement.querySelector('.picture__likes').textContent = likes[g];
  userElement.querySelector('.picture__comments').textContent = likes[g];

  return userElement;
};

var fragment = document.createDocumentFragment();
for (var g = 0; g < 25; g++) {
  fragment.appendChild(renderPicture(userSets[g]));
}
USERS_CLONE.appendChild(fragment);
