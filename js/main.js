'use strict';
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Кекс', 'Евгений', 'Ульяна', 'Сергей', 'Боб', 'Владыка', 'Кришна', 'Вишну', 'Хануман', 'Гонеш', 'Сварог', 'Велес', 'Ярослав'];
var PICTURE_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture');
var PICTURES_CONTAINER = document.querySelector('.pictures');
var MAX_NUMBER = 26;
var BIG_PICTURE = document.querySelector('.big-picture');
var BUTTON_CLOSE_FULLSCREEN = BIG_PICTURE.querySelector('#picture-cancel');

// Массив маленьких картинок для обработчика addEventListener
var SMALL_PICTURE = document.querySelectorAll('.picture');

var UPLOAD = document.querySelector('#upload-file');
var FORM = document.querySelector('.img-upload__overlay');
var BUTTON_CLOSE_UPLOAD = document.querySelector('#upload-cancel');

var BUTTON_SMALL = document.querySelector('.scale__control--smaller');
var BUTTON_BIG = document.querySelector('.scale__control--bigger');
var SCALE_VALUE = document.querySelector('.scale__control--value');

var EFFECTS = document.querySelectorAll('.effects__label');
var EFFECTS_CLASS = document.querySelectorAll('.effects__preview');
var IMG_EFECT = document.querySelector('.img-upload__preview');
var BUTTON_EFECT = document.querySelector('.effects__radio');
var SLIDER = document.querySelector('.effect-level__pin');
var EFFECT_VALUE = document.querySelector('.effect-level__value');
var EFFECT_VALUES = [];

var HASH_TAG = document.querySelector('.text__hashtags');

var FILDE_COMMENT = document.querySelector('.text__description');
var MAX_COMENT_LENGTH = 140;
//--------------------------------------------------------//
// случайное число от и до
var randomInteger = function (min, max) {
  var randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};
//--------------------------------------------------------//

// генерация коментариев
var messages = [];
for (var l = 0; l < MAX_NUMBER; l++) {
  var randomIndexWord = Math.floor(Math.random() * COMMENTS.length);
  var message = COMMENTS[randomIndexWord];
  messages.push(message);
}
//--------------------------------------------------------//

// генерация имени
var names = [];
for (var n = 0; n < MAX_NUMBER; n++) {
  var randomIndexName = Math.floor(Math.random() * NAMES.length);
  var nameUser = NAMES[randomIndexName];
  names.push(nameUser);
}
//--------------------------------------------------------//

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
//--------------------------------------------------------//

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
//--------------------------------------------------------//

// Пустой объект
var fragment = document.createDocumentFragment();
//--------------------------------------------------------//

// рисует много маленьких картинок
var renderPicture = function (photo) {
  var pictureElement = PICTURE_TEMPLATE.cloneNode(true);

  pictureElement.querySelector('img').setAttribute('src', photo.url);
  pictureElement.querySelector('img').setAttribute('alt', photo.description);
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return pictureElement;
};

for (var g = 0; g < photos.length; g++) {
  fragment.appendChild(renderPicture(photos[g]));
}

PICTURES_CONTAINER.appendChild(fragment);
//--------------------------------------------------------//


// при нажатии esc проверять обработчик
var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};
//--------------------------------------------------------//

// функция открытия
var openPopup = function () {
  // Показать окно
 BIG_PICTURE.classList.remove('hidden');

  // Добавить обработчики для закрытия
  document.addEventListener('keydown', onPopupEscPress);
};
// блокирует прокрутку фотографий на фоне
  document.body.classList.add('modal-open');
//--------------------------------------------------------//

// функция закрытия
var closePopup = function () {
  // Скрыть окно
  BIG_PICTURE.classList.add('hidden');;

  // Удалить обработчики для закрытия
  document.removeEventListener('keydown', onPopupEscPress);
   // разблокирует прокрутку фотографий на фоне
  document.body.classList.remove('modal-open');
};
//--------------------------------------------------------//

 // активация окна показа большой картинки клик, доделать на каждую картинку
var showFullPicture = function (SMALL_PICTURE, photos) {
SMALL_PICTURE.addEventListener('click', function () {
  openPopup();
  renderBigPicture(photos);
});
}
for (var b = 0; b < SMALL_PICTURE.length; b++) {
  showFullPicture(SMALL_PICTURE[b], photos[b]);
}
//--------------------------------------------------------//

// Деактивация окна установок клик
BUTTON_CLOSE_FULLSCREEN.addEventListener('click', function () {
  closePopup();
});
//--------------------------------------------------------//

// Большая картинка
var renderBigPicture = function (bigPhoto) {
  // вставляет картинку просмотра, лайки для картинки и количество комментариев
  BIG_PICTURE.querySelector('img').setAttribute('src', bigPhoto.url);
  BIG_PICTURE.querySelector('.likes-count').textContent = bigPhoto.likes;
  BIG_PICTURE.querySelector('.comments-count').textContent = bigPhoto.comments.length;

  // вставляет описание картинки
  BIG_PICTURE.querySelector('.social__caption').textContent = bigPhoto.description;
  // скрывает счётчик комментариев и загрузку новых комментариев
  var commentCount = BIG_PICTURE.querySelector('.social__comment-count');
  var commentsLoader = BIG_PICTURE.querySelector('.comments-loader');
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  // удалаяет шаблонные комментарии
  var comments = BIG_PICTURE.querySelector('.social__comments');
  var commentItems = BIG_PICTURE.querySelectorAll('.social__comment');

  commentItems.forEach(function (element) {
    comments.removeChild(element);
  });
  // создает комментарий по шаблону
  var createComments = function (photoComment) {
    for (var v = 0; v < bigPhoto.comments.length; v++) {
      var commentElement = commentItems[0].cloneNode(true);
      commentElement.querySelector('.social__picture').setAttribute('src', photoComment.comments[v].avatar);
      commentElement.querySelector('.social__picture').setAttribute('alt', photoComment.comments[v].name);
      commentElement.querySelector('.social__text').textContent = photoComment.comments[v].message;
      fragment.appendChild(commentElement);
    }
  };
  createComments(bigPhoto);
  comments.appendChild(fragment);
};
//--------------------------------------------------------//

// обработка формы загрузки картинок на сайт
var onUploadEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeUpload();
  }
};

var openUpload = function () {
  FORM.classList.remove('hidden');
  // блокирует прокрутку фотографий на фоне
  document.body.classList.add('modal-open');
}

var closeUpload = function () {
  FORM.classList.add('hidden');
  // блокирует прокрутку фотографий на фоне
  document.body.classList.remove('modal-open');
}

UPLOAD.addEventListener('change', function () {
  openUpload();
});

BUTTON_CLOSE_UPLOAD.addEventListener('click', function () {
  closeUpload()
});
document.addEventListener('keydown', onUploadEscPress);
//--------------------------------------------------------//

// Масштаб картинки
SCALE_VALUE.value = 100 + '%';

var smaller = function(){
  var inputScale = parseInt(SCALE_VALUE.value)
  for (var b = inputScale; b > 25; b--){
  var outputScale = inputScale - 25;
  SCALE_VALUE.value = outputScale + '%';
  }
  var transform = outputScale / 100;
  IMG_EFECT.style.transform = 'scale(' + transform + ')';

}
var bigger = function(){
  var inputScale = parseInt(SCALE_VALUE.value)
  for (var n = inputScale; n < 100; n++){
  var outputScale = inputScale + 25;
  SCALE_VALUE.value = outputScale + '%';
  }
  var transform = outputScale / 100;
  IMG_EFECT.style.transform = 'scale(' + transform + ')';

}

BUTTON_SMALL.addEventListener('click', function () {
  smaller();
  });

BUTTON_BIG.addEventListener('click', function () {
  bigger();
 });

//--------------------------------------------------------//

// Движение ползунка эфектов
SLIDER.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
    };

    startCoords = {
      x: moveEvt.clientX,
    };

    SLIDER.style.left = (SLIDER.offsetLeft - shift.x) + 'px';
    // получение числовго значения ползунка
    var data = parseInt(SLIDER.style.left) / 450;
    // ограничение ползунка
    if (data < 0){
      onMouseUp();
    } else if (data > 1){
      onMouseUp();
    }

    // значения ползунка для каждого эффекта
    var chrome = data;
    var sepia = data;
    var marvin = parseInt(data*100);
    var fobos = data*3;
    var zoy = parseInt((data+1) + data);

    //массив значений ползунка
    EFFECT_VALUES = [chrome, sepia, marvin, fobos, zoy];
  };

   var onMouseUp = function (upEvt) {
    //upEvt.preventDefault();
    setEffectvalue();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

});
//--------------------------------------------------------//

//присвоение значений ползунка выбранному эффекту
var setEffectvalue = function () {
  switch(IMG_EFECT.classList.value){
  case EFFECTS_CLASS[1].classList[1]:
    EFFECT_VALUE.value = EFFECT_VALUES[0];
    IMG_EFECT.style.filter = 'grayscale(' + EFFECT_VALUE.value + ')';
  break;
  case EFFECTS_CLASS[2].classList[1]:
    EFFECT_VALUE.value = EFFECT_VALUES[1];
    IMG_EFECT.style.filter = 'sepia(' + EFFECT_VALUE.value + ')';
  break;
  case EFFECTS_CLASS[3].classList[1]:
    EFFECT_VALUE.value = EFFECT_VALUES[2];
    IMG_EFECT.style.filter = 'invert(' + EFFECT_VALUE.value + '%' + ')';
  break;
  case EFFECTS_CLASS[4].classList[1]:
    EFFECT_VALUE.value = EFFECT_VALUES[3];
    IMG_EFECT.style.filter = 'blur(' + EFFECT_VALUE.value + 'px' + ')';
  break;
  case EFFECTS_CLASS[5].classList[1]:
    EFFECT_VALUE.value = EFFECT_VALUES[4];
    IMG_EFECT.style.filter = 'brightness(' + EFFECT_VALUE.value + ')';
  break;
  default:
  EFFECT_VALUE.value = 0;
  IMG_EFECT.style.filter = 'none';
  break;
  }
};
//--------------------------------------------------------//

// Смена фильтра картинки
var changeEfects = function (EFFECT, EFFECTS_CLASS){
  EFFECTS[n].onclick = function () {
    if (IMG_EFECT.classList.value != EFFECTS_CLASS.classList[1]){
    IMG_EFECT.classList.value = '';
    IMG_EFECT.classList.add(EFFECTS_CLASS.classList[1]);
    };
  }
}
  for (var n = 0; n < EFFECTS.length; n++) {
  changeEfects(EFFECTS[n],EFFECTS_CLASS[n]);
};
//--------------------------------------------------------//

//валидация хеш тегов
var hashtags = HASH_TAG;
// Блокирует escape при фокусе на имени
hashtags.addEventListener('focus', function () {
  document.removeEventListener('keydown', onUploadEscPress);
});
var validateMethods = {
  validateInput: function(arrayHashtag){
    var re = /^#[А-Яа-яA-Za-z0-9]*$/
    return re.test(arrayHashtag);
    },

  noMeta: function (arrayHashtag) {
    return arrayHashtag.some((hashtag) => hashtag.trim() === '#');
  },

   countExceeded: function (arrayHashtag, maxCount) {
    return arrayHashtag.length > maxCount;
  },

  lengthExceeded: function (arrayHashtag, maxLength) {
    return arrayHashtag.some((hashtag) => hashtag.length > maxLength);
  },

  isNotSeparated: function (arrayHashtag) {
    return arrayHashtag.some((hashtag) => {
      var arrayHash = hashtag.match(/#/g) || [];
      return arrayHash.length !== 1;
    });
  },

  isNotUnique: function (arrayHashtag) {
    var unique = {};

    return arrayHashtag.some((hashtag) => {
      var lowerCase = hashtag.toLowerCase();
      var isExist = unique[lowerCase];

      if (isExist) {
        return true;
      } else {
        unique[lowerCase] = true;
        return false;
      }
    });
  },
};

function validateHashtags(hashtags) {
  var array = hashtags.split(' ');

  if (validateMethods.validateInput(array)){
      console.log('ok');
    } else {
      console.log('Error');
    }

  if (validateMethods.noMeta(array)) {
    console.log('хеш-тег не может состоять только из одной решётки');
    return false;
  }

  if (validateMethods.isNotSeparated(array)) {
    console.log('хэш-теги разделяются пробелами;');
    return false;
  }

  if (validateMethods.lengthExceeded(array, 20)) {
    console.log('максимальная длина одного хэш-тега 20 символов, включая решётку');
    return false;
  }

  if (validateMethods.isNotUnique(array)) {
    console.log('один и тот же хэш-тег не может быть использован дважды');
    return false;
  }

  if (validateMethods.countExceeded(array, 5)) {
    console.log('нельзя указать больше пяти хэш-тегов');
    return false;
  }

  console.log('всё в порядке');
  return true;
}

hashtags.onblur = function () {
  validateHashtags(hashtags.value);
  document.addEventListener('keydown', onUploadEscPress);
};
//--------------------------------------------------------//
//Валидация комментария

// Блокирует escape при фокусе на имени
FILDE_COMMENT.addEventListener('focus', function () {
  document.removeEventListener('keydown', onUploadEscPress);
});
// Разблокирует escape при фокусе на имени
FILDE_COMMENT.addEventListener('blur', function () {
  document.addEventListener('keydown', onUploadEscPress);
});

FILDE_COMMENT.addEventListener('invalid', function () {
  if (FILDE_COMMENT.validity.tooLong) {

    FILDE_COMMENT.setCustomValidity('Коментарий не должн превышать ' + MAX_COMENT_LENGTH + ' символов');

  } else {

    FILDE_COMMENT.setCustomValidity('');
  }
});


FILDE_COMMENT.addEventListener('input', function () {
  var valueLength = FILDE_COMMENT.value.length;

  if (valueLength > MAX_COMENT_LENGTH) {

    FILDE_COMMENT.setCustomValidity('Удалите лишние ' + (valueLength - MAX_COMENT_LENGTH) + ' симв.');

  } else {

    FILDE_COMMENT.setCustomValidity('');
  }
});

//--------------------------------------------------------//
