'use strict';
// присвоение значений ползунка выбранному эффекту
(function () {
  var setEffectvalue = function (data) {
    switch (window.IMG_EFFECT.classList[1]) {
      case window.EFFECTS_CLASS[1].classList[1]:
        window.EFFECT_VALUE.value = data;
        window.IMG_EFFECT.style.filter = 'grayscale(' + window.EFFECT_VALUE.value + ')';
        break;
      case window.EFFECTS_CLASS[2].classList[1]:
        window.EFFECT_VALUE.value = data;
        window.IMG_EFFECT.style.filter = 'sepia(' + window.EFFECT_VALUE.value + ')';
        break;
      case window.EFFECTS_CLASS[3].classList[1]:
        window.EFFECT_VALUE.value = parseInt(data * 100, 10);
        window.IMG_EFFECT.style.filter = 'invert(' + window.EFFECT_VALUE.value + '%' + ')';
        break;
      case window.EFFECTS_CLASS[4].classList[1]:
        window.EFFECT_VALUE.value = data * 3;
        window.IMG_EFFECT.style.filter = 'blur(' + window.EFFECT_VALUE.value + 'px' + ')';
        break;
      case window.EFFECTS_CLASS[5].classList[1]:
        window.EFFECT_VALUE.value = parseInt((data + 1) + data, 10);
        window.IMG_EFFECT.style.filter = 'brightness(' + window.EFFECT_VALUE.value + ')';
        break;
      default:
        window.EFFECT_VALUE.value = 0;
        window.IMG_EFFECT.style.filter = 'none';
        break;
    }
  };
  window.setEffectvalue = setEffectvalue;
})();
// --------------------------------------------------------//

