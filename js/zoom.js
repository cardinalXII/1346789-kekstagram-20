'use strict';
// Масштаб картинки
(function () {
  window.zoom = {
    minimize: function () {
      var inputScale = parseInt(window.constants.scaleValue.value, 10);
      if (inputScale > window.constants.minZoom) {
        var outputScale = inputScale - window.constants.minZoom;
        window.constants.scaleValue.value = outputScale + '%';
      }
      var transform = outputScale / window.constants.maxZoom;
      window.constants.imgEffect.style.transform = 'scale(' + transform + ')';
    },

    maximize: function () {
      var inputScale = parseInt(window.constants.scaleValue.value, 10);
      if (inputScale < window.constants.maxZoom) {
        var outputScale = inputScale + window.constants.minZoom;
        window.constants.scaleValue.value = outputScale + '%';
      }
      var transform = outputScale / window.constants.maxZoom;
      window.constants.imgEffect.style.transform = 'scale(' + transform + ')';
    },
  };

  window.constants.buttonSmall.addEventListener('click', window.zoom.minimize);

  window.constants.buttonBig.addEventListener('click', window.zoom.maximize);
})();
// --------------------------------------------------------//
