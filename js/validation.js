'use strict';

window.validation = (function () {
  var imgUploadOverlay = document.querySelector('.img-upload__overlay'); // форма редактирования изображения
  var textHashtags = imgUploadOverlay.querySelector('.text__hashtags'); // поле ввода хэштэгов
  var re = /^#[a-zа-яA-ZА-Я0-9]*$/;
  var MIN_LENGTH_TEXT_HASHTAG = 2;
  var MAX_LENGTH_TEXT_HASHTAG = 20;
  var MAX_NUMBER_HASHTAGS = 5;

  var checkingValidityHashtags = function () {
    var textHashtagsToLowerCase = textHashtags.value.toLowerCase();
    var arrTextHashtags = textHashtagsToLowerCase.split(/\s+/);
    var uniqueTextHashtags = true;
    textHashtags.style.border = null;

    for (var i = 0; i < arrTextHashtags.length; i++) {
      for (var j = i + 1; j < arrTextHashtags.length; j++) {
        if (arrTextHashtags[i] === arrTextHashtags[j]) {
          uniqueTextHashtags = false;
        }
      }
    } // проверяем наличие одинаковых хэштэгов

    for (i = 0; i < arrTextHashtags.length; i++) {
      if (textHashtags.value !== '') {
        if (!re.test(arrTextHashtags[i])) {
          textHashtags.style.border = '5px solid red';
          textHashtags.setCustomValidity('Хэштэг должен содержать только буквы и цифры. Первый символ - #');
        } else if (arrTextHashtags[i].length < MIN_LENGTH_TEXT_HASHTAG) {
          textHashtags.style.border = '5px solid red';
          textHashtags.setCustomValidity('Длина хэштэга не менее двух символов');
        } else if (arrTextHashtags[i].length > MAX_LENGTH_TEXT_HASHTAG) {
          textHashtags.style.border = '5px solid red';
          textHashtags.setCustomValidity('Длина хэштэга не более двадцати символов');
        } else if (arrTextHashtags.length > MAX_NUMBER_HASHTAGS) {
          textHashtags.style.border = '5px solid red';
          textHashtags.setCustomValidity('Не более пяти хэштэгов');
        } else if (!uniqueTextHashtags) {
          textHashtags.style.border = '5px solid red';
          textHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
        } else {
          textHashtags.setCustomValidity('');
        }
      } else {
        textHashtags.setCustomValidity('');
      }
    }
  }; // функция проверки валидности хэштэгов

  textHashtags.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.form.onEditFormEscClose);
  }); // обработчик убирающий обработчик закрытия формы редактирования по ESC при фокусе на поле ввода хэштэгов
  textHashtags.addEventListener('input', checkingValidityHashtags); // обработчик проверки валидности хэштэгов
  textHashtags.addEventListener('blur', function () {
    document.addEventListener('keydown', window.form.onEditFormEscClose);
  }); // обработчик добавляющий обработчик закрытия формы редактирования по ESC при снятии фокуса с поля ввода хэштэгов

  //  Валидация комментов (в html атрибут maxLength)=======================================================================

  var textDescription = imgUploadOverlay.querySelector('.text__description');

  textDescription.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.form.onEditFormEscClose);
  }); // обработчик убирающий обработчик закрытия формы редактирования по ESC при фокусе на поле ввода комментов
  textDescription.addEventListener('blur', function () {
    document.addEventListener('keydown', window.form.onEditFormEscClose);
  }); // обработчик добавляющий обработчик закрытия формы редактирования по ESC при снятии фокуса с поля ввода комментов
})();
