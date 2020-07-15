'use strict';
(function () {
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

  // Пустой объект
  var fragment = document.createDocumentFragment();
  // --------------------------------------------------------//

  window.BIG_PICTURE = BIG_PICTURE;
  window.FORM = FORM;
  window.COMMENTS = COMMENTS;
  window.NAMES = NAMES;
  window.MAX_NUMBER = MAX_NUMBER;
  window.PICTURE_TEMPLATE = PICTURE_TEMPLATE;
  window.PICTURES_CONTAINER = PICTURES_CONTAINER;
  window.BUTTON_CLOSE_FULLSCREEN = BUTTON_CLOSE_FULLSCREEN;
  window.UPLOAD = UPLOAD;
  window.BUTTON_CLOSE_UPLOAD = BUTTON_CLOSE_UPLOAD;
  window.BUTTON_SMALL = BUTTON_SMALL;
  window.BUTTON_BIG = BUTTON_BIG;
  window.SLIDER = SLIDER;
  window.EFFECTS = EFFECTS;
  window.EFFECTS_CLASS = EFFECTS_CLASS;
  window.HASH_TAG = HASH_TAG;
  window.FILDE_COMMENT = FILDE_COMMENT;
  window.IMG_EFFECT = IMG_EFFECT;
  window.SCALE_VALUE = SCALE_VALUE;
  window.EFFECT_FIELD = EFFECT_FIELD;
  window.EFFECT_DEPTH = EFFECT_DEPTH;
  window.EFFECT_VALUE = EFFECT_VALUE;
  window.fragment = fragment;
})();

// --------------------------------------------------------//
