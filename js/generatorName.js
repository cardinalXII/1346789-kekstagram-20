'use strict';

// генерация имени
(function () {
  var names = [];
  for (var n = 0; n < window.MAX_NUMBER; n++) {
    var randomIndexName = Math.floor(Math.random() * window.NAMES.length);
    var nameUser = window.NAMES[randomIndexName];
    names.push(nameUser);
  }
  window.names = names;
})();
// --------------------------------------------------------//
