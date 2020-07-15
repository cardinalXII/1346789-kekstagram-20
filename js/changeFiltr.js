'use strict';
(function () {
// Смена фильтра картинки
  var reset = function () {
    window.IMG_EFFECT.style.filter = 'none';
    window.EFFECT_DEPTH.style.width = 0;
    window.SLIDER.style.left = 0;
  };
  var onloadUpload = function () {
    if (window.IMG_EFFECT.className === 'img-upload__preview') {
      window.EFFECT_FIELD.classList.add('hidden');
    }
  };
  var changeEffects = function (effect, effectClass) {
    effect.onclick = function () {
      if (window.IMG_EFFECT.classList.value !== effectClass.classList[1]) {
        window.EFFECT_FIELD.classList.remove('hidden');
        window.IMG_EFFECT.classList.value = 'img-upload__preview ';
        window.IMG_EFFECT.classList.add(effectClass.classList[1]);
        reset();
      }
      if (window.IMG_EFFECT.className === 'img-upload__preview effects__preview--none') {
        window.EFFECT_FIELD.classList.add('hidden');
      }
    };
  };

  for (var r = 0; r < window.EFFECTS.length; r++) {
    changeEffects(window.EFFECTS[r], window.EFFECTS_CLASS[r]);
  }
  window.onloadUpload = onloadUpload;
  window.reset = reset;
  window.changeEffects = changeEffects;
})();
// --------------------------------------------------------//
