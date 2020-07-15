'use strict';
// Масштаб картинки
(function () {
  var minimization = function () {
    var inputScale = parseInt(window.SCALE_VALUE.value, 10);
    var a = 25;
    if (inputScale > a) {
      var outputScale = inputScale - 25;
      window.SCALE_VALUE.value = outputScale + '%';
    }
    var transform = outputScale / 100;
    window.IMG_EFFECT.style.transform = 'scale(' + transform + ')';
  };

  var maximization = function () {
    var inputScale = parseInt(window.SCALE_VALUE.value, 10);
    var q = 100;
    if (inputScale < q) {
      var outputScale = inputScale + 25;
      window.SCALE_VALUE.value = outputScale + '%';
    }
    var transform = outputScale / 100;
    window.IMG_EFFECT.style.transform = 'scale(' + transform + ')';
  };
  window.BUTTON_SMALL.addEventListener('click', minimization);

  window.BUTTON_BIG.addEventListener('click', maximization);
})();
// --------------------------------------------------------//
