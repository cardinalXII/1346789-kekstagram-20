'use strict';
(function () {
  window.modal = {
    // при нажатии esc проверять обработчик
    onPopupEscPress: function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        window.modal.closePopup();
      }
    },
    // --------------------------------------------------------//
    // обработка формы загрузки картинок на сайт
    onUploadEscPress: function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        window.modal.closeUpload();
        window.constants.fieldComment.value = '';
        window.constants.hashTag.value = '';
      }
    },

    onPopupEscSuccess: function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        window.modal.closePopupSuccess();
      }
    },

    onPopupEscError: function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        window.modal.closePopupError();
      }
    },


    // функция открытия
    openPopup: function () {
      // Показать окно
      window.constants.bigPicture.classList.remove('hidden');

      // Добавить обработчики для закрытия
      document.addEventListener('keydown', window.modal.onPopupEscPress);
      // блокирует прокрутку фотографий на фоне
      document.body.classList.add('modal-open');
    },

    openUpload: function () {
      window.constants.form.classList.remove('hidden');
      // блокирует прокрутку фотографий на фоне
      document.body.classList.add('modal-open');
      // сбрасывает масштаб картинки по умолчанию 100%
      window.constants.imgEffect.style.transform = 'scale(1)';
      window.constants.scaleValue.value = 100 + '%';
      document.addEventListener('keydown', window.modal.onUploadEscPress);
    },

    // функция закрытия
    closePopup: function () {
      // Скрыть окно
      window.constants.bigPicture.classList.add('hidden');
      // Удалить обработчики для закрытия
      document.removeEventListener('keydown', window.modal.onPopupEscPress);
      // разблокирует прокрутку фотографий на фоне
      document.body.classList.remove('modal-open');
    },

    closeUpload: function () {
      window.constants.form.classList.add('hidden');
      // блокирует прокрутку фотографий на фоне
      document.body.classList.remove('modal-open');
    },

    closePopupSuccess: function () {
      // Скрыть окно
      var poupMessSuccess = document.querySelector('.success');
      poupMessSuccess.classList.add('hidden');
      // Удалить обработчики для закрытия
      document.removeEventListener('keydown', window.modal.onPopupEscSuccess);
      // разблокирует прокрутку фотографий на фоне
      document.body.classList.remove('modal-open');
    },

    closePopupError: function () {
      // Скрыть окно
      var poupMessError = document.querySelector('.error');
      poupMessError.classList.add('hidden');
      // Удалить обработчики для закрытия
      document.removeEventListener('keydown', window.modal.onPopupEscError);
      // разблокирует прокрутку фотографий на фоне
      document.body.classList.remove('modal-open');
    },

    showFilter: function (photosXhr) {
      var sorter = photosXhr.slice();

      window.constants.filter.classList.remove('img-filters--inactive');

      window.constants.filterDefault.addEventListener('click', function () {
        window.modal.removePicture(photosXhr);
        window.createPhotoX(photosXhr);

      });

      window.constants.filterRandom.addEventListener('click', function () {
        window.modal.removePicture(photosXhr);
        window.modal.sortingRandom(sorter);
      });

      window.constants.filterDiscussed.addEventListener('click', function () {
        window.modal.removePicture(photosXhr);
        window.modal.sortingComments(sorter);
      });
    },

    removePicture: function (photosXhr) {
      for (var u = 0; u < photosXhr.length; u++) {
        var node = document.querySelector('.picture');
        window.constants.picturesContainer.removeChild(node);
      }
    },

    sortingComments: function (sorter) {
      var parserComments = function (a, b) {
        return (a.comments.length > b.comments.length) ? -1 : 1;
      };
      sorter.sort(parserComments);
      window.createPhotoX(sorter);
    },

    sortingRandom: function (sorter) {
      var randoming = function () {
        return Math.random() - 0.5;
      };
      sorter.sort(randoming);
      window.createPhotoX(sorter);
    },
  };
  window.constants.upload.addEventListener('change', function () {
    window.modal.openUpload();
    window.setEffects.onloadUpload();
    window.setEffects.resetEffects();
  });

  window.constants.buttonCloseUpload.addEventListener('click', function () {
    window.modal.closeUpload();
    document.removeEventListener('keydown', window.modal.onUploadEscPress);
  });
})();
