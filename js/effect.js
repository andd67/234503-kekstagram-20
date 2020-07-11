'use strict';

window.effect = (function () {
  var EFFECTS_CLASS_PREFIX = 'effects__preview--';
  var EFFECTS_SETTINGS = {
    'none': {
      value: '',
      min: '',
      max: '',
      filter: ''
    },
    'chrome': {
      value: '',
      min: 0,
      max: 1,
      filter: 'grayscale',
    },
    'sepia': {
      value: '',
      min: 0,
      max: 1,
      filter: 'sepia'
    },
    'marvin': {
      value: '%',
      min: 0,
      max: 100,
      filter: 'invert'
    },
    'phobos': {
      value: 'px',
      min: 0,
      max: 3,
      filter: 'blur'
    },
    'heat': {
      value: '',
      min: 1,
      max: 3,
      filter: 'brightness'
    }
  };

  var imgUploadOverlay = document.querySelector('.img-upload__overlay'); // форма редактирования изображения
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var effectsList = document.querySelector('.effects__list'); // ul - список с кнопками переключения эффектов
  var imgUploadEffectLevel = imgUploadOverlay.querySelector('.img-upload__effect-level'); // блок слайдера fieldset

  var removeEffects = function () {
    var effects = Object.keys(EFFECTS_SETTINGS);
    for (var i = 0; i < effects.length; i++) {
      imgUploadPreview.classList.remove(EFFECTS_CLASS_PREFIX + effects[i]);
    }
  }; // удаление класса эффекта у картинки редактирования

  var changeEffect = function (evt) {
    var selectedEffect = evt.target.value;
    removeEffects();
    imgUploadPreview.classList.add(EFFECTS_CLASS_PREFIX + selectedEffect);
    if (selectedEffect === 'none') {
      imgUploadEffectLevel.classList.add('hidden');
    } else {
      imgUploadEffectLevel.classList.remove('hidden');
    }
  }; // добавление класса эффекта картинке редактирования

  effectsList.addEventListener('click', changeEffect); // обработчик изменения эффекта картинки редактирования

  // Слайдер ==================================================================================================================

  var effectLevelValue = imgUploadOverlay.querySelector('.effect-level__value'); // инпут глубины эффекта
  // var effectLevelLine = imgUploadOverlay.querySelector('.effect-level__line'); // шкала глубины эффекта
  var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin'); // ползунок
  // var effectLevelDepth = imgUploadOverlay.querySelector('.effect-level__depth'); // глубина эффекта
  var imageUploadPreviewElement = imgUploadOverlay.querySelector('.img-upload__preview').querySelector('img'); // img предварительного просмотра фото

  var calculatingEffectValue = function (value, min, max) {
    var result = (parseInt(value, 10) / 100) * (max - min) + min;
    return result.toFixed(2);
  }; // рассчитывает значение пина на шкале для  определённого диапазона (min-max)

  var changeIntensityEffect = function () {
    var effect = document.querySelector('.effects__radio:checked').value; // значение у нажатой кнопки эффекта
    if (effect === 'none') {
      imageUploadPreviewElement.style.filter = '';
    } else {
      var selectedEffectSettings = EFFECTS_SETTINGS[effect];
      var effectType = selectedEffectSettings.filter;
      var effectValue = selectedEffectSettings.value;
      var effectMin = selectedEffectSettings.min;
      var effectMax = selectedEffectSettings.max;
      var calculatedValue = calculatingEffectValue(effectLevelValue.value, effectMin, effectMax);
      imageUploadPreviewElement.style.filter = effectType + '(' + calculatedValue + effectValue + ')';
    }
  }; // рассчитывает значение интенсивности ээффекта для выделенного фильтра и передаёт картинке

  var onMouseUp = function (evt) {
    evt.preventDefault();
    changeIntensityEffect();
    // document.removeEventListener('mouseup', onMouseUp);
  }; // функция отпускания мыши (удаление обработчика перетаскивания и отпускания)

  effectLevelPin.addEventListener('mouseup', onMouseUp); // обработчик оепускания кнопки мыши (установка интенсивности эффекта)

  return {
    removeEffects: removeEffects
  };
})();
