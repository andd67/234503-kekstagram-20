'use strict';

window.scale = (function () {
  var imgUploadOverlay = document.querySelector('.img-upload__overlay'); // форма редактирования изображения
  var scaleControlSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
  var scaleControlBigger = imgUploadOverlay.querySelector('.scale__control--bigger');
  var scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var SCALE_MIN = 25;
  var SCALE_MAX = 100;
  var SCALE_STEP = 25;

  scaleControlValue.value = SCALE_MAX + '%';

  var scaleImageSmaller = function (evt) {
    evt.preventDefault();
    if (parseInt(scaleControlValue.value, 10) > SCALE_MIN) {
      scaleControlValue.value = (parseInt(scaleControlValue.value, 10) - SCALE_STEP) + '%';
      imgUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value, 10) * 0.01 + ' )';
    }
  }; // функция уменьшения мзображения

  var scaleImageBigger = function (evt) {
    evt.preventDefault();
    if (parseInt(scaleControlValue.value, 10) < SCALE_MAX) {
      scaleControlValue.value = (parseInt(scaleControlValue.value, 10) + SCALE_STEP) + '%';
      imgUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value, 10) * 0.01 + ')';
    }
  }; // функция увеличения изображения

  scaleControlSmaller.addEventListener('click', scaleImageSmaller); // обработчик уменьшения изображения (пока не сбрасывается при закрытии изображения)
  scaleControlBigger.addEventListener('click', scaleImageBigger); // обработчик увеличения изображения (пока не сбрасывается при закрытии изображения)
})();