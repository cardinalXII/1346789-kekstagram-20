'use strict';
(function () {
  // функция открытия
  var openPopup = function () {
    // Показать окно
    window.BIG_PICTURE.classList.remove('hidden');

    // Добавить обработчики для закрытия
    document.addEventListener('keydown', window.onPopupEscPress);
    // блокирует прокрутку фотографий на фоне
    document.body.classList.add('modal-open');
  };
  window.openPopup = openPopup;
})();
// --------------------------------------------------------//

(function () {
  var openUpload = function () {
    window.FORM.classList.remove('hidden');
    // блокирует прокрутку фотографий на фоне
    document.body.classList.add('modal-open');
    // сбрасывает масштаб картинки по умолчанию 100%
    window.IMG_EFFECT.style.transform = 'scale(1)';
    window.SCALE_VALUE.value = 100 + '%';
    document.addEventListener('keydown', window.onUploadEscPress);
  };
  window.openUpload = openUpload;
})();

