'use strict';

(function () {
  var names = [];

  for (var n = 0; n < window.constants.maxNumber; n++) {
    var randomIndexName = Math.floor(Math.random() * window.constants.name.length);
    var nameUser = window.constants.name[randomIndexName];
    names.push(nameUser);
  }

  var messages = [];
  for (var l = 0; l < window.constants.maxNumber; l++) {
    var randomIndexWord = Math.floor(Math.random() * window.constants.comments.length);
    var message = window.constants.comments[randomIndexWord];
    messages.push(message);
  }

  window.creatingComments = {
    // случайное число от и до
    randomInteger: function (min, max) {
      var randomNumber = min + Math.random() * (max + 1 - min);
      return Math.floor(randomNumber);
    },

    creatingComment: function () {
      var num = window.creatingComments.randomInteger(3, window.constants.maxNumber);
      var comments = [];
      for (var c = 0; c < num; c++) {
        comments.push({
          avatar: 'img/avatar-' + window.creatingComments.randomInteger(1, 6) + '.svg',
          message: messages[c],
          name: names[c]
        });
      }
      return comments;
    }
  };

  window.creatingPhotos = {
    // массив вывода фото
    randomPictures: function () {
      var pictures = [];
      for (var i = 1; i < window.constants.maxNumber; i++) {
        pictures.push({
          url: 'photos/' + i + '.jpg',
          description: 'Классная фотка',
          likes: window.creatingComments.randomInteger(window.constants.minLikes, window.constants.maxLikes),
          comments: window.creatingComments.creatingComment()
        });
      }
      return pictures;
    }
  };
})();
// --------------------------------------------------------//
