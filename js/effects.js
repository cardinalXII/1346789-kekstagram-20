'use strict';
(function () {
  window.setEffects = {
  // Смена фильтра картинки
    reset: function () {
      window.constants.imgEffect.style.filter = 'none';
      window.constants.effectDepth.style.width = 0;
      window.constants.slider.style.left = 0;
    },

    onloadUpload: function () {
      if (window.constants.imgEffect.className === 'img-upload__preview') {
        window.constants.effectField.classList.add('hidden');
      }
    },
    changeEffects: function (effect, effectClass) {
      effect.onclick = function () {
        if (window.constants.imgEffect.classList.value !== effectClass.classList[1]) {
          window.constants.effectField.classList.remove('hidden');
          window.constants.imgEffect.classList.value = 'img-upload__preview ';
          window.constants.imgEffect.classList.add(effectClass.classList[1]);
          window.setEffects.reset();
        }
        if (window.constants.imgEffect.className === 'img-upload__preview effects__preview--none') {
          window.constants.effectField.classList.add('hidden');
        }
      };
    },

    // --------------------------------------------------------//

    // присвоение значений ползунка выбранному эффекту
    setEffectValue: function (data) {
      switch (window.constants.imgEffect.classList[1]) {
        case window.constants.effectsClass[1].classList[1]:
          window.constants.effectValue.value = data;
          window.constants.imgEffect.style.filter = 'grayscale(' + window.constants.effectValue.value + ')';
          break;
        case window.constants.effectsClass[2].classList[1]:
          window.constants.effectValue.value = data;
          window.constants.imgEffect.style.filter = 'sepia(' + window.constants.effectValue.value + ')';
          break;
        case window.constants.effectsClass[3].classList[1]:
          window.constants.effectValue.value = parseInt(data * 100, 10);
          window.constants.imgEffect.style.filter = 'invert(' + window.constants.effectValue.value + '%' + ')';
          break;
        case window.constants.effectsClass[4].classList[1]:
          window.constants.effectValue.value = data * 3;
          window.constants.imgEffect.style.filter = 'blur(' + window.constants.effectValue.value + 'px' + ')';
          break;
        case window.constants.effectsClass[5].classList[1]:
          window.constants.effectValue.value = (data + 1) + data;
          window.constants.imgEffect.style.filter = 'brightness(' + window.constants.effectValue.value + ')';
          break;
        default:
          window.constants.effectValue.value = 0;
          window.constants.imgEffect.style.filter = 'none';
          break;
      }
    }
  };
  for (var r = 0; r < window.constants.effects.length; r++) {
    window.setEffects.changeEffects(window.constants.effects[r], window.constants.effectsClass[r]);
  }
})();
// --------------------------------------------------------//
