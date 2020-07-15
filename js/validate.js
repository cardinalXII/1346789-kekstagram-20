'use strict';
// валидация хеш тегов
// Блокирует escape при фокусе на имени
(function () {
  window.HASH_TAG.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.onUploadEscPress);
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
      window.HASH_TAG.setCustomValidity('хеш-тег содержит не допустивые символы или не начинается на символ "#"');
      return false;
    }

    if (validateMethods.noMeta(array)) {
      window.HASH_TAG.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      return false;
    }

    if (validateMethods.isNotSeparated(array)) {
      window.HASH_TAG.setCustomValidity('хэш-теги разделяются пробелами;');
      return false;
    }

    if (validateMethods.lengthExceeded(array, 20)) {
      window.HASH_TAG.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
      return false;
    }

    if (validateMethods.isNotUnique(array)) {
      window.HASH_TAG.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
      return false;
    }

    if (validateMethods.countExceeded(array, 5)) {
      window.HASH_TAG.setCustomValidity('нельзя указать больше пяти хэш-тегов');
      return false;
    }

    window.HASH_TAG.setCustomValidity('');
    return true;
  }

  window.HASH_TAG.addEventListener('input', function () {
    validateHashtags(window.HASH_TAG.value);
    document.removeEventListener('keydown', window.onUploadEscPress);
  });
  window.HASH_TAG.addEventListener('blur', function () {
    document.addEventListener('keydown', window.onUploadEscPress);
  });
})();
// --------------------------------------------------------//
// Валидация комментария
(function () {
  // Блокирует escape при фокусе на комментарии
  window.FILDE_COMMENT.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.onUploadEscPress);
  });
  // Разблокирует escape при фокусе на комментарии
  window.FILDE_COMMENT.addEventListener('blur', function () {
    document.addEventListener('keydown', window.onUploadEscPress);
  });

  window.FILDE_COMMENT.addEventListener('invalid', function () {
    if (window.FILDE_COMMENT.validity.tooLong) {
      window.FILDE_COMMENT.setCustomValidity('Имя не должно превышать 140-ка символов');
    }
  });
})();
// --------------------------------------------------------//
