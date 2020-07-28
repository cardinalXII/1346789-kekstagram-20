'use strict';
(function () {
  // рисует много маленьких картинок
  var renderPicture = function (photo) {
    var pictureElement = window.constants.pictureTemplate.cloneNode(true);

    pictureElement.querySelector('img').setAttribute('src', photo.url);
    pictureElement.querySelector('img').setAttribute('alt', photo.description);
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return pictureElement;
  };

  window.createPhotoX = function (photos) {
    for (var g = 0; g < photos.length; g++) {
      window.constants.fragment.appendChild(renderPicture(photos[g]));
    }

    window.constants.picturesContainer.appendChild(window.constants.fragment);

    var smallPictures = document.querySelectorAll('.picture');

    for (var b = 0; b < smallPictures.length; b++) {
      showFullPicture(smallPictures[b], photos[b]);
    }
  };
  // --------------------------------------------------------//

  // активация окна показа большой картинки клик
  var showFullPicture = function (pictures, photo) {
    pictures.addEventListener('click', function () {
      window.modal.openPopup();
      renderBigPicture(photo);
    });

    pictures.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        window.modal.openPopup();
        renderBigPicture(photo);
      }
    });
  };
  // --------------------------------------------------------//

  // Массив маленьких картинок для обработчика addEventListener

  // Деактивация Большой картинки
  window.constants.buttonCloseFullscreen.addEventListener('click', function () {
    window.modal.closePopup();
  });
  // --------------------------------------------------------//

  // Большая картинка
  var renderBigPicture = function (bigPhoto) {
    // вставляет картинку просмотра, лайки для картинки и количество комментариев
    window.constants.bigPicture.querySelector('img').setAttribute('src', bigPhoto.url);
    window.constants.bigPicture.querySelector('.likes-count').textContent = bigPhoto.likes;
    window.constants.bigPicture.querySelector('.comments-count').textContent = bigPhoto.comments.length;

    // вставляет описание картинки
    window.constants.bigPicture.querySelector('.social__caption').textContent = bigPhoto.description;
    // скрывает счётчик комментариев и загрузку новых комментариев
    var commentCount = window.constants.bigPicture.querySelector('.social__comment-count');
    commentCount.classList.add('hidden');

    // удаляет шаблонные комментарии
    var comments = window.constants.bigPicture.querySelector('.social__comments');
    var commentItems = window.constants.bigPicture.querySelectorAll('.social__comment');

    commentItems.forEach(function (element) {
      comments.removeChild(element);
    });
    // создает комментарий по шаблону
    var createComments = function (photoComment) {
      for (var v = 0; v < 5; v++) {
        var commentElement = commentItems[0].cloneNode(true);
        commentElement.querySelector('.social__picture').setAttribute('src', photoComment.comments[v].avatar);
        commentElement.querySelector('.social__picture').setAttribute('alt', photoComment.comments[v].name);
        commentElement.querySelector('.social__text').textContent = photoComment.comments[v].message;
        window.constants.fragment.appendChild(commentElement);
      }
    };

    var addComments = function (photoComment) {
      for (var f = 5; f < bigPhoto.comments.length; f++) {
        var commentElement = commentItems[0].cloneNode(true);
        commentElement.querySelector('.social__picture').setAttribute('src', photoComment.comments[f].avatar);
        commentElement.querySelector('.social__picture').setAttribute('alt', photoComment.comments[f].name);
        commentElement.querySelector('.social__text').textContent = photoComment.comments[f].message;
        window.constants.fragment.appendChild(commentElement);
      }
      if (bigPhoto.comments.length === bigPhoto.comments.length) {
        window.constants.buttonShowComments.classList.add('hidden');
      }
    };
    createComments(bigPhoto);
    comments.appendChild(window.constants.fragment);
    window.constants.buttonShowComments.addEventListener('click', function () {
      addComments(bigPhoto);
      comments.appendChild(window.constants.fragment);
    });
  };

  window.onSuccess = function () {
    window.modal.closeUpload();
    window.setEffects.resetEffects();
    window.renderMessageSuccess();

    var closeButtonMess = document.querySelector('.success__button');

    closeButtonMess.addEventListener('click', function () {
      window.modal.closePopupSuccess();
    });

    window.addEventListener('click', function () {
      window.modal.closePopupSuccess();
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        window.modal.onPopupEscSuccess(evt);
      }
    });
  };
  window.renderMessageSuccess = function () {
    var messageElement = window.constants.success.cloneNode(true);
    window.constants.fragment.appendChild(messageElement);
    window.constants.main.appendChild(window.constants.fragment);
  };

  window.onError = function () {
    window.modal.closeUpload();
    window.setEffects.resetEffects();
    window.renderMessageError();

    var closeButtonMess = document.querySelector('.error__button');

    closeButtonMess.addEventListener('click', function () {
      window.modal.closePopupError();
    });

    window.addEventListener('click', function () {
      window.modal.closePopupError();
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        window.modal.onPopupEscError(evt);
      }
    });
  };

  window.renderMessageError = function () {
    var messageElement = window.constants.error.cloneNode(true);
    window.constants.fragment.appendChild(messageElement);
    window.constants.main.appendChild(window.constants.fragment);
  };


  window.constants.formUpload.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(window.constants.formUpload));
  });
})();
// --------------------------------------------------------//
