'use strict';
(function () {
  // при нажатии esc проверять обработчик
  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      window.closePopup();
    }
  };
  window.onPopupEscPress = onPopupEscPress;
})();
// --------------------------------------------------------//

// обработка формы загрузки картинок на сайт
(function () {
  var onUploadEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      window.closeUpload();
      window.FILDE_COMMENT.value = '';
      window.HASH_TAG.value = '';
    }
  };
  window.onUploadEscPress = onUploadEscPress;
})();
