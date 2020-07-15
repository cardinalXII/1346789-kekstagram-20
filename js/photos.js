'use strict';// массив вывода фото
(function () {
  var photos = [];
  for (var i = 1; i < window.MAX_NUMBER; i++) {
    photos.push({
      url: 'photos/' + i + '.jpg',
      description: 'Класная фотка',
      likes: window.randomInteger(15, 200),
      comments: window.creatingComments()
    });
  }
  window.photos = photos;
})();
// --------------------------------------------------------//
