'use strict';(function () {
  // функция закрытия
  var closePopup = function () {
    // Скрыть окно
    window.BIG_PICTURE.classList.add('hidden');

    // Удалить обработчики для закрытия
    document.removeEventListener('keydown', window.onPopupEscPress);
    // разблокирует прокрутку фотографий на фоне
    document.body.classList.remove('modal-open');
  };
  window.closePopup = closePopup;
})();
// --------------------------------------------------------//

(function () {
  var closeUpload = function () {
    window.FORM.classList.add('hidden');
    // блокирует прокрутку фотографий на фоне
    document.body.classList.remove('modal-open');
  };

  window.UPLOAD.addEventListener('change', function () {
    window.openUpload();
    window.onloadUpload();
    window.reset();
  });

  window.BUTTON_CLOSE_UPLOAD.addEventListener('click', function () {
    closeUpload();
    document.removeEventListener('keydown', window.onUploadEscPress);
  });
  window.closeUpload = closeUpload;
})();
// --------------------------------------------------------//
