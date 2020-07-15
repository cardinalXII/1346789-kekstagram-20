'use strict';
// Движение ползунка эфектов
(function () {
  window.SLIDER.addEventListener('mousedown', function (evt) {
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

      window.SLIDER.style.left = (window.SLIDER.offsetLeft - shift.x) + 'px';

      // получение числовго значения ползунка
      var data = parseInt(window.SLIDER.style.left, 10) / 450;

      // ограничение ползунка
      if (data < 0) {
        onMouseUp();
      } else if (data > 1) {
        onMouseUp();
      }

      // значения ползунка для каждого эффекта
      window.setEffectvalue(data);

      // глубина эффекта полоска
      window.EFFECT_DEPTH.style.width = window.SLIDER.style.left;
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
