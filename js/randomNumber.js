'use strict';

(function () {
// случайное число от и до
  var randomInteger = function (min, max) {
    var randomNumber = min + Math.random() * (max + 1 - min);
    return Math.floor(randomNumber);
  };
  window.randomInteger = randomInteger;
})();
// --------------------------------------------------------//
