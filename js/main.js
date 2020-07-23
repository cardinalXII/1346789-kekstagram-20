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
  window.creatingphotoX = function (photos) {
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
    var commentsLoader = window.constants.bigPicture.querySelector('.comments-loader');
    commentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');

    // удаляет шаблонные комментарии
    var comments = window.constants.bigPicture.querySelector('.social__comments');
    var commentItems = window.constants.bigPicture.querySelectorAll('.social__comment');

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
        window.constants.fragment.appendChild(commentElement);
      }
    };
    createComments(bigPhoto);
    comments.appendChild(window.constants.fragment);
  };
})();
// --------------------------------------------------------//
