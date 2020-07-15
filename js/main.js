'use strict';
// рисует много маленьких картинок
(function () {
  var renderPicture = function (photo) {
    var pictureElement = window.PICTURE_TEMPLATE.cloneNode(true);

    pictureElement.querySelector('img').setAttribute('src', photo.url);
    pictureElement.querySelector('img').setAttribute('alt', photo.description);
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return pictureElement;
  };

  for (var g = 0; g < window.photos.length; g++) {
    window.fragment.appendChild(renderPicture(window.photos[g]));
  }

  window.PICTURES_CONTAINER.appendChild(window.fragment);
})();
// --------------------------------------------------------//

(function () {
// активация окна показа большой картинки клик
  var showFullPicture = function (pictures, photo) {
    pictures.addEventListener('click', function () {
      window.openPopup();
      window.renderBigPicture(photo);
    });

    pictures.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        window.openPopup();
        window.renderBigPicture(photo);
      }
    });
  };

  // Массив маленьких картинок для обработчика addEventListener
  var smallPictures = document.querySelectorAll('.picture');
  for (var b = 0; b < smallPictures.length; b++) {
    showFullPicture(smallPictures[b], window.photos[b]);
  }
  window.showFullPicture = showFullPicture;
  // Деактивация Большой картинки
  window.BUTTON_CLOSE_FULLSCREEN.addEventListener('click', function () {
    window.closePopup();
  });
})();
// --------------------------------------------------------//

// Большая картинка
(function () {
  var renderBigPicture = function (bigPhoto) {
    // вставляет картинку просмотра, лайки для картинки и количество комментариев
    window.BIG_PICTURE.querySelector('img').setAttribute('src', bigPhoto.url);
    window.BIG_PICTURE.querySelector('.likes-count').textContent = bigPhoto.likes;
    window.BIG_PICTURE.querySelector('.comments-count').textContent = bigPhoto.comments.length;

    // вставляет описание картинки
    window.BIG_PICTURE.querySelector('.social__caption').textContent = bigPhoto.description;
    // скрывает счётчик комментариев и загрузку новых комментариев
    var commentCount = window.BIG_PICTURE.querySelector('.social__comment-count');
    var commentsLoader = window.BIG_PICTURE.querySelector('.comments-loader');
    commentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');

    // удалаяет шаблонные комментарии
    var comments = window.BIG_PICTURE.querySelector('.social__comments');
    var commentItems = window.BIG_PICTURE.querySelectorAll('.social__comment');

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
        window.fragment.appendChild(commentElement);
      }
    };
    createComments(bigPhoto);
    comments.appendChild(window.fragment);
  };
  window.renderBigPicture = renderBigPicture;
})();
// --------------------------------------------------------//



