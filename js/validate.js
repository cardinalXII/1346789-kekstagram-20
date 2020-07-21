'use strict';
// валидация хеш тегов
// Блокирует escape при фокусе на имени
(function () {
  window.validate = {

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

    validateHashtags: function (hashtags) {
      var array = hashtags.split(' ');

      if (window.validate.validateInput(array) === false) {
        window.constants.hashTag.setCustomValidity('хеш-тег содержит не допустивые символы или не начинается на символ "#"');
        return false;
      }

      if (window.validate.noMeta(array)) {
        window.constants.hashTag.setCustomValidity('хеш-тег не может состоять только из одной решётки');
        return false;
      }

      if (window.validate.isNotSeparated(array)) {
        window.constants.hashTag.setCustomValidity('хэш-теги разделяются пробелами;');
        return false;
      }

      if (window.validate.lengthExceeded(array, 20)) {
        window.constants.hashTag.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
        return false;
      }

      if (window.validate.isNotUnique(array)) {
        window.constants.hashTag.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
        return false;
      }

      if (window.validate.countExceeded(array, 5)) {
        window.constants.hashTag.setCustomValidity('нельзя указать больше пяти хэш-тегов');
        return false;
      }

      window.constants.hashTag.setCustomValidity('');
      return true;
    }
  };
  window.constants.hashTag.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.modal.onUploadEscPress);
  });
  window.constants.hashTag.addEventListener('input', function () {
    window.validate.validateHashtags(window.constants.hashTag.value);
    document.removeEventListener('keydown', window.modal.onUploadEscPress);
  });
  window.constants.hashTag.addEventListener('blur', function () {
    document.addEventListener('keydown', window.modal.onUploadEscPress);
  });

  // --------------------------------------------------------//
  // Валидация комментария
  // Блокирует escape при фокусе на комментарии
  window.constants.fildeComment.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.modal.onUploadEscPress);
  });
  // Разблокирует escape при фокусе на комментарии
  window.constants.fildeComment.addEventListener('blur', function () {
    document.addEventListener('keydown', window.modal.onUploadEscPress);
  });

  window.constants.fildeComment.addEventListener('invalid', function () {
    if (window.constants.fildeComment.validity.tooLong) {
      window.constants.fildeComment.setCustomValidity('Имя не должно превышать 140-ка символов');
    }
  });
})();
// --------------------------------------------------------//
