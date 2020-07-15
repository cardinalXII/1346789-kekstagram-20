'use strict';

// генерация коментариев
(function () {
  var messages = [];
  for (var l = 0; l < window.MAX_NUMBER; l++) {
    var randomIndexWord = Math.floor(Math.random() * window.COMMENTS.length);
    var message = window.COMMENTS[randomIndexWord];
    messages.push(message);
  }
  window.messages = messages;
})();
// --------------------------------------------------------//
