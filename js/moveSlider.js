'use strict';
// Движение ползунка эфектов
(function () {
  window.constants.slider.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };

      window.constants.slider.style.left = (window.constants.slider.offsetLeft - shift.x) + 'px';

      // получение числовго значения ползунка
      var data = parseInt(window.constants.slider.style.left, 10) / window.constants.maxSize;

      // ограничение ползунка
      if (data < 0) {
        window.constants.slider.style.left = 0 + 'px';
        onMouseUp();
      } else if (data > 1) {
        onMouseUp();
        window.constants.slider.style.left = window.constants.maxSize + 'px';
      }

      // значения ползунка для каждого эффекта
      window.setEffects.setEffectvalue(data);

      // глубина эффекта полоска
      window.constants.effectDepth.style.width = window.constants.slider.style.left;
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
})();
// --------------------------------------------------------//
