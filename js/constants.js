'use strict';
(function () {
  var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var NAMES = ['Кекс', 'Евгений', 'Ульяна', 'Сергей', 'Боб', 'Владыка', 'Кришна', 'Вишну', 'Хануман', 'Гонеш', 'Сварог', 'Велес', 'Ярослав'];


  var PICTURE_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture');
  var PICTURES_CONTAINER = document.querySelector('.pictures');
  var MAX_NUMBER = 26;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var MAX_SIZE = 450;
  var MIN_ZOOM = 25;
  var MAX_ZOOM = 100;
  var BIG_PICTURE = document.querySelector('.big-picture');
  var COMMENTS_PICTURE = document.querySelectorAll('.social__comments');
  var BUTTON_SHOW_COMMENTS = document.querySelector('.comments-loader');
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
  var FORM_UPLOAD = document.querySelector('.img-upload__form');
  // Пустой объект
  var FRAGMENT = document.createDocumentFragment();

  var URLXML = 'https://javascript.pages.academy/kekstagram/data';
  var URLSEND = 'https://javascript.pages.academy/kekstagram';

  var ERROR = document.querySelector('#error').content.querySelector('.error');
  var SUCCESS = document.querySelector('#success').content.querySelector('.success');
  var MAIN = document.querySelector('main');
  // --------------------------------------------------------//

  window.constants = {

    bigPicture: BIG_PICTURE,

    commentsPicture: COMMENTS_PICTURE,

    buttonShowComments: BUTTON_SHOW_COMMENTS,

    form: FORM,

    comments: COMMENTS,

    name: NAMES,

    maxNumber: MAX_NUMBER,

    minLikes: MIN_LIKES,

    maxLikes: MAX_LIKES,

    minZoom: MIN_ZOOM,

    maxZoom: MAX_ZOOM,

    maxSize: MAX_SIZE,

    pictureTemplate: PICTURE_TEMPLATE,

    picturesContainer: PICTURES_CONTAINER,

    buttonCloseFullscreen: BUTTON_CLOSE_FULLSCREEN,

    upload: UPLOAD,

    buttonCloseUpload: BUTTON_CLOSE_UPLOAD,

    buttonSmall: BUTTON_SMALL,

    buttonBig: BUTTON_BIG,

    slider: SLIDER,

    effects: EFFECTS,

    effectsClass: EFFECTS_CLASS,

    hashTag: HASH_TAG,

    fieldComment: FILDE_COMMENT,

    imgEffect: IMG_EFFECT,

    scaleValue: SCALE_VALUE,

    effectField: EFFECT_FIELD,

    effectDepth: EFFECT_DEPTH,

    effectValue: EFFECT_VALUE,

    fragment: FRAGMENT,

    formUpload: FORM_UPLOAD,

    error: ERROR,

    success: SUCCESS,

    main: MAIN,

    urlxml: URLXML,

    urlsend: URLSEND,
  };
})();

// --------------------------------------------------------//

