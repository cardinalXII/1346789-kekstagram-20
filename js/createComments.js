'use strict';
// создание коментраиев
(function () {
  var creatingComments = function () {
    var num = window.randomInteger(3, window.MAX_NUMBER);
    var comments = [];
    for (var c = 0; c < num; c++) {
      comments.push({
        avatar: 'img/avatar-' + window.randomInteger(1, 6) + '.svg',
        message: window.messages[c],
        name: window.names[c]
      });
    }
    return comments;
  };
  window.creatingComments = creatingComments;
})();
// --------------------------------------------------------//
