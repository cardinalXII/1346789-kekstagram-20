'use strict';
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Кекс', 'Евгений', 'Ульяна', 'Сергей', 'Боб', 'Владыка', 'Кришна', 'Вишну', 'Хануман', 'Гонеш', 'Сварог', 'Велес', 'Ярослав'];
var PICTURE_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture');
var PICTURES_CONTAINER = document.querySelector('.pictures');
var MAX_NUMBER = 26;
var BIG_PICTURE = document.querySelector('.big-picture');
var BUTTON_CLOSE_FULLSCREEN = BIG_PICTURE.querySelector('#picture-cancel');

var UPLOAD = document.querySelector('#upload-file');
var FORM = document.querySelector('.img-upload__overlay');
var BUTTON_CLOSE_UPLOAD = document.querySelector('#upload-cancel');

var BUTTON_SMALL = document.querySelector('.scale__control--smaller');
var BUTTON_BIG = document.querySelector('.scale__control--bigger');
var SCALE_VALUE = document.querySelector('.scale__control--value');

var EFFECTS = document.querySelectorAll('.effects__label');
var EFFECTS_CLASS = document.querySelectorAll('.effects__preview');
var IMG_EFFECT = document.querySelector('.img-upload__preview');
var SLIDER = document.querySelector('.effect-level__pin');
var EFFECT_VALUE = document.querySelector('.effect-level__value');
var EFFECT_DEPTH = document.querySelector('.effect-level__depth');
var EFFECT_FIELD = document.querySelector('.effect-level');

var HASH_TAG = document.querySelector('.text__hashtags');

var FILDE_COMMENT = document.querySelector('.text__description');
// --------------------------------------------------------//
// случайное число от и до
var randomInteger = function (min, max) {
  var randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};
// --------------------------------------------------------//

// генерация коментариев
var messages = [];
for (var l = 0; l < MAX_NUMBER; l++) {
  var randomIndexWord = Math.floor(Math.random() * COMMENTS.length);
  var message = COMMENTS[randomIndexWord];
  messages.push(message);
}
// --------------------------------------------------------//

// генерация имени
var names = [];
for (var n = 0; n < MAX_NUMBER; n++) {
  var randomIndexName = Math.floor(Math.random() * NAMES.length);
  var nameUser = NAMES[randomIndexName];
  names.push(nameUser);
}
// --------------------------------------------------------//

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
// --------------------------------------------------------//

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
// --------------------------------------------------------//

// Пустой объект
var fragment = document.createDocumentFragment();
// --------------------------------------------------------//

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
// --------------------------------------------------------//


// при нажатии esc проверять обработчик
var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};
// --------------------------------------------------------//


// Массив маленьких картинок для обработчика addEventListener
var smallPictures = document.querySelectorAll('.picture');

// функция открытия
var openPopup = function () {
  // Показать окно
  BIG_PICTURE.classList.remove('hidden');

  // Добавить обработчики для закрытия
  document.addEventListener('keydown', onPopupEscPress);
  // блокирует прокрутку фотографий на фоне
  document.body.classList.add('modal-open');
};
// --------------------------------------------------------//

// функция закрытия
var closePopup = function () {
  // Скрыть окно
  BIG_PICTURE.classList.add('hidden');

  // Удалить обработчики для закрытия
  document.removeEventListener('keydown', onPopupEscPress);
  // разблокирует прокрутку фотографий на фоне
  document.body.classList.remove('modal-open');
};
// --------------------------------------------------------//

// активация окна показа большой картинки клик
var showFullPicture = function (pictures, photo) {
  pictures.addEventListener('click', function () {
    openPopup();
    renderBigPicture(photo);
  });

  pictures.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openPopup();
      renderBigPicture(photo);
    }
  });
};
for (var b = 0; b < smallPictures.length; b++) {
  showFullPicture(smallPictures[b], photos[b]);
}
// --------------------------------------------------------//

// Деактивация окна установок клик
BUTTON_CLOSE_FULLSCREEN.addEventListener('click', function () {
  closePopup();
});
// --------------------------------------------------------//

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
// --------------------------------------------------------//

// обработка формы загрузки картинок на сайт
var onUploadEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeUpload();
    FILDE_COMMENT.value = '';
    HASH_TAG.value = '';
  }
};

var openUpload = function () {
  FORM.classList.remove('hidden');
  // блокирует прокрутку фотографий на фоне
  document.body.classList.add('modal-open');
  // сбрасывает масштаб картинки по умолчанию 100%
  IMG_EFFECT.style.transform = 'scale(1)';
  SCALE_VALUE.value = 100 + '%';
  document.addEventListener('keydown', onUploadEscPress);
};

var closeUpload = function () {
  FORM.classList.add('hidden');
  // блокирует прокрутку фотографий на фоне
  document.body.classList.remove('modal-open');
};

UPLOAD.addEventListener('change', function () {
  openUpload();
  onloadUpload();
  reset();
});

BUTTON_CLOSE_UPLOAD.addEventListener('click', function () {
  closeUpload();
  document.removeEventListener('keydown', onUploadEscPress);
});

// --------------------------------------------------------//

// Масштаб картинки

var minimization = function () {
  var inputScale = parseInt(SCALE_VALUE.value, 10);
  var a = 25;
  if (inputScale > a) {
    var outputScale = inputScale - 25;
    SCALE_VALUE.value = outputScale + '%';
  }
  var transform = outputScale / 100;
  IMG_EFFECT.style.transform = 'scale(' + transform + ')';
};

var maximization = function () {
  var inputScale = parseInt(SCALE_VALUE.value, 10);
  var q = 100;
  if (inputScale < q) {
    var outputScale = inputScale + 25;
    SCALE_VALUE.value = outputScale + '%';
  }
  var transform = outputScale / 100;
  IMG_EFFECT.style.transform = 'scale(' + transform + ')';
};

BUTTON_SMALL.addEventListener('click', minimization);

BUTTON_BIG.addEventListener('click', maximization);

// --------------------------------------------------------//

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
    var data = parseInt(SLIDER.style.left, 10) / 450;

    // ограничение ползунка
    if (data < 0) {
      onMouseUp();
    } else if (data > 1) {
      onMouseUp();
    }

    // значения ползунка для каждого эффекта
    setEffectvalue(data);

    // глубина эффекта полоска
    EFFECT_DEPTH.style.width = SLIDER.style.left;
  };

  var onMouseUp = function () {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

});
// --------------------------------------------------------//

// присвоение значений ползунка выбранному эффекту
var setEffectvalue = function (data) {
  switch (IMG_EFFECT.classList[1]) {
    case EFFECTS_CLASS[1].classList[1]:
      EFFECT_VALUE.value = data;
      IMG_EFFECT.style.filter = 'grayscale(' + EFFECT_VALUE.value + ')';
      break;
    case EFFECTS_CLASS[2].classList[1]:
      EFFECT_VALUE.value = data;
      IMG_EFFECT.style.filter = 'sepia(' + EFFECT_VALUE.value + ')';
      break;
    case EFFECTS_CLASS[3].classList[1]:
      EFFECT_VALUE.value = parseInt(data * 100, 10);
      IMG_EFFECT.style.filter = 'invert(' + EFFECT_VALUE.value + '%' + ')';
      break;
    case EFFECTS_CLASS[4].classList[1]:
      EFFECT_VALUE.value = data * 3;
      IMG_EFFECT.style.filter = 'blur(' + EFFECT_VALUE.value + 'px' + ')';
      break;
    case EFFECTS_CLASS[5].classList[1]:
      EFFECT_VALUE.value = parseInt((data + 1) + data, 10);
      IMG_EFFECT.style.filter = 'brightness(' + EFFECT_VALUE.value + ')';
      break;
    default:
      EFFECT_VALUE.value = 0;
      IMG_EFFECT.style.filter = 'none';
      break;
  }
};

// --------------------------------------------------------//

// Смена фильтра картинки
var reset = function () {
  IMG_EFFECT.style.filter = 'none';
  EFFECT_DEPTH.style.width = 0;
  SLIDER.style.left = 0;
};
var onloadUpload = function () {
  if (IMG_EFFECT.className === 'img-upload__preview') {
    EFFECT_FIELD.classList.add('hidden');
  }
};
var changeEffects = function (effect, effectClass) {
  effect.onclick = function () {
    if (IMG_EFFECT.classList.value !== effectClass.classList[1]) {
      EFFECT_FIELD.classList.remove('hidden');
      IMG_EFFECT.classList.value = 'img-upload__preview ';
      IMG_EFFECT.classList.add(effectClass.classList[1]);
      reset();
    }
    if (IMG_EFFECT.className === 'img-upload__preview effects__preview--none') {
      EFFECT_FIELD.classList.add('hidden');
    }
  };
};
for (var r = 0; r < EFFECTS.length; r++) {
  changeEffects(EFFECTS[r], EFFECTS_CLASS[r]);
}
// --------------------------------------------------------//

// валидация хеш тегов
// Блокирует escape при фокусе на имени
HASH_TAG.addEventListener('focus', function () {
  document.removeEventListener('keydown', onUploadEscPress);
});

var validateMethods = {

  validateInput: function (arrayHashtag) {

    return arrayHashtag.every(function (hashtag) {
      var re = /^#[А-Яа-яA-Za-z0-9]*$/;
      return re.test(hashtag);
    });
  },

  noMeta: function (arrayHashtag) {
    return arrayHashtag.some(function (hashtag) {
      return hashtag.trim() === '#';
    });
  },

  countExceeded: function (arrayHashtag, maxCount) {
    return arrayHashtag.length > maxCount;
  },

  lengthExceeded: function (arrayHashtag, maxLength) {
    return arrayHashtag.some(function (hashtag) {
      return hashtag.length > maxLength;
    });
  },

  isNotSeparated: function (arrayHashtag) {
    return arrayHashtag.some(function (hashtag) {
      var arrayHash = hashtag.match(/#/g) || [];
      return arrayHash.length !== 1;
    });
  },

  isNotUnique: function (arrayHashtag) {
    var unique = {};

    return arrayHashtag.some(function (hashtag) {
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

  if (validateMethods.validateInput(array) === false) {
    HASH_TAG.setCustomValidity('хеш-тег содержит не допустивые символы или не начинается на символ "#"');
    return false;
  }

  if (validateMethods.noMeta(array)) {
    HASH_TAG.setCustomValidity('хеш-тег не может состоять только из одной решётки');
    return false;
  }

  if (validateMethods.isNotSeparated(array)) {
    HASH_TAG.setCustomValidity('хэш-теги разделяются пробелами;');
    return false;
  }

  if (validateMethods.lengthExceeded(array, 20)) {
    HASH_TAG.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
    return false;
  }

  if (validateMethods.isNotUnique(array)) {
    HASH_TAG.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
    return false;
  }

  if (validateMethods.countExceeded(array, 5)) {
    HASH_TAG.setCustomValidity('нельзя указать больше пяти хэш-тегов');
    return false;
  }

  HASH_TAG.setCustomValidity('');
  return true;
}

HASH_TAG.addEventListener('input', function () {
  validateHashtags(HASH_TAG.value);
  document.removeEventListener('keydown', onUploadEscPress);
});
HASH_TAG.addEventListener('blur', function () {
  document.addEventListener('keydown', onUploadEscPress);
});
// --------------------------------------------------------//
// Валидация комментария

// Блокирует escape при фокусе на комментарии
FILDE_COMMENT.addEventListener('focus', function () {
  document.removeEventListener('keydown', onUploadEscPress);
});
// Разблокирует escape при фокусе на комментарии
FILDE_COMMENT.addEventListener('blur', function () {
  document.addEventListener('keydown', onUploadEscPress);
});

FILDE_COMMENT.addEventListener('invalid', function () {
  if (FILDE_COMMENT.validity.tooLong) {
    FILDE_COMMENT.setCustomValidity('Имя не должно превышать 140 символов');
  }
});
// --------------------------------------------------------//
