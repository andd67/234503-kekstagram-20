'use strict';

window.form = (function () {
  var uploadFile = document.querySelector('#upload-file'); // поле, при изменении к-го происходит открытие формы редактирования изображения
  var imgUploadOverlay = document.querySelector('.img-upload__overlay'); // форма редактирования изображения
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var uploadCancel = document.querySelector('#upload-cancel'); // кнопка для закрытия формы изображения
  var imgUploadEffectLevel = imgUploadOverlay.querySelector('.img-upload__effect-level'); // блок слайдера fieldset
  var ESC = 27;

  var onEditFormEscClose = function (evt) {
    if (evt.keyCode === ESC) {
      evt.preventDefault();
      imgUploadOverlay.classList.add('hidden');
      uploadFile.value = '';
      window.effect.removeEffects();
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', onEditFormEscClose);
    }
  }; // функция закрытие формы редактирования изображения через ESC

  var closeEditForm = function (evt) {
    evt.preventDefault();
    imgUploadOverlay.classList.add('hidden');
    uploadFile.value = '';
    window.effect.removeEffects();
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEditFormEscClose);
  }; // функция закрытия формы редактирования изображения через кнопку закрытия

  var openEditForm = function (evt) {
    evt.preventDefault();
    imgUploadOverlay.classList.remove('hidden');
    imgUploadPreview.classList.add('effects__preview--none');
    imgUploadEffectLevel.classList.add('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onEditFormEscClose);
  }; // функция открытия формы редактирования изображения

  uploadFile.addEventListener('change', openEditForm); // обработчик открытия окна редактирования
  uploadCancel.addEventListener('click', closeEditForm); // обработчик закрытия окнаредактирования по крестику

  return {
    onEditFormEscClose: onEditFormEscClose
  };
})();
