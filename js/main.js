'use strict';

var NUMBER_FOTOS = 25; // количество фото
var MIN_NUNBER_LIKES = 15; // минимальное число лайков
var MAX_NUNBER_LIKES = 200; // максимальное число лайков
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]; // массив комментариев
var NAMES = [
  'Игорь',
  'Милана',
  'Швед',
  'Барин',
  'Николай',
  'Фатима',
  'Владимир Владимирович',
  'Тутанхамон'
]; // массив имён
var templatePicture = document.querySelector('#picture').content.querySelector('.picture'); // шаблон для создания DOM-элементов
var blockPicture = document.querySelector('.pictures'); // блок для загрузки DOM-элементов

// Создаём МОК (массив с объектами описания фотот) =================================================================================

var getRandomNumberRange = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}; // функция, генерирующая целое число из заданного диапозона

var createComment = function (comments, names) {
  return {
    avatar: 'img/avatar-' + getRandomNumberRange(1, 6) + '.svg',
    message: comments[getRandomNumberRange(0, comments.length - 1)],
    name: names[getRandomNumberRange(0, names.length - 1)]
  };
}; // функция, создающая один комментарий

var createArrayComments = function () {
  var arrayComments = [];
  var arrayCommentsLength = getRandomNumberRange(1, 4);
  for (var i = 0; i < arrayCommentsLength; i++) {
    arrayComments.push(createComment(COMMENTS, NAMES));
  }
  return arrayComments;
}; // функция, создающая массив комментов (от одного до 4ёх штук)

var createObjectPhoto = function (number) {
  return {
    url: 'photos/' + (number + 1) + '.jpg',
    description: 'descriptionPhoto',
    likes: getRandomNumberRange(MIN_NUNBER_LIKES, MAX_NUNBER_LIKES),
    comments: createArrayComments()
  };
};// функция, создающая объект с описанием одной фотограффии

var generateArrayPhoto = function () {
  var arrayPhotos = [];
  for (var i = 0; i < 25; i++) {
    arrayPhotos.push(createObjectPhoto(i));
  }
  return arrayPhotos;
}; // функция, генерирующая массив с объектами описария фото

// Создаём DOM-лементы на основании данных МОК =======================================================================================================

var makePicture = function (picture) {
  var elPicture = templatePicture.cloneNode(true);
  elPicture.querySelector('.picture__img').src = picture.url;
  elPicture.querySelector('.picture__likes').textContent = picture.likes;
  elPicture.querySelector('.picture__comments').textContent = picture.comments.length;
  return elPicture;
}; // функция, создающая один DOM-элемент по шаблону

var makeFragment = function (picture) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < NUMBER_FOTOS; i++) {
    fragment.appendChild(makePicture(picture[i]));
  }
  blockPicture.appendChild(fragment);
}; // функция, создающая все DOM-элементы, записывает их все в документ фрагмент и помещающая их на страницу.

makeFragment(generateArrayPhoto());

// Открываем и закрываем окно настройки =============================================================================================

var uploadFile = document.querySelector('#upload-file'); // поле, при изменении к-го происходит открытие формы редактирования изображения
var imgUploadOverlay = document.querySelector('.img-upload__overlay'); // форма редактирования изображения
var uploadCancel = document.querySelector('#upload-cancel'); // кнопка для закрытия формы изображения
var ESC = 27;

var onEditFormEscClose = function (evt) {
  if (evt.keyCode === ESC) {
    evt.preventDefault();
    imgUploadOverlay.classList.add('hidden');
    uploadFile.value = '';
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEditFormEscClose);
  }
}; // функция закрытие формы редактирования изображения через ESC

var closeEditForm = function (evt) {
  evt.preventDefault();
  imgUploadOverlay.classList.add('hidden');
  uploadFile.value = '';
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEditFormEscClose);
}; // функция закрытия формы редактирования изображения через кнопку закрытия

var openEditForm = function (evt) {
  evt.preventDefault();
  imgUploadOverlay.classList.remove('hidden');
  imgUploadEffectLevel.classList.add('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEditFormEscClose);
}; // функция открытия формы редактирования изображения

uploadFile.addEventListener('change', openEditForm); // обработчик открытия окна редактирования
uploadCancel.addEventListener('click', closeEditForm); // обработчик закрытия окнаредактирования по крестику

// Увеличиваем, уменьшаем изображение в окне редактирования ===========================================================

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

scaleControlSmaller.addEventListener('click', scaleImageSmaller); // обработчик уменьшения изображения (пока не сбрасывается при закрытии изображения)*/

scaleControlBigger.addEventListener('click', scaleImageBigger); // обработчик увеличения изображения (пока не сбрасывается при закрытии изображения)*/

// ====================================================================================================================

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

var effectsList = document.querySelector('.effects__list'); // ul - список с кнопками переключения эффектов

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



// Валидация хэштэгов (событие input в обработчике работает как change (возможно из-за старой версии хрома) ==================

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

  for ( i = 0; i < arrTextHashtags.length; i++) {
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
  document.removeEventListener('keydown', onEditFormEscClose);
}); // обработчик убирающий обработчик закрытия формы редактирования по ESC при фокусе на поле ввода хэштэгов
textHashtags.addEventListener('input', checkingValidityHashtags); // обработчик проверки валидности хэштэгов
textHashtags.addEventListener('blur', function () {
  document.addEventListener('keydown', onEditFormEscClose);
}); // обработчик добавляющий обработчик закрытия формы редактирования по ESC при снятии фокуса с поля ввода хэштэгов

//  Валидация комментов (в html атрибут maxLength)=======================================================================

var textDescription = imgUploadOverlay.querySelector('.text__description');

textDescription.addEventListener('focus', function () {
  document.removeEventListener('keydown', onEditFormEscClose);
}); // обработчик убирающий обработчик закрытия формы редактирования по ESC при фокусе на поле ввода комментов
textDescription.addEventListener('blur', function () {
  document.addEventListener('keydown', onEditFormEscClose);
}); // обработчик добавляющий обработчик закрытия формы редактирования по ESC при снятии фокуса с поля ввода комментов

// менете глубины эффекта при mouseap==================================================================================================================

var imgUploadEffectLevel = imgUploadOverlay.querySelector('.img-upload__effect-level'); // блок слайдера fieldset
var effectLevelValue = imgUploadOverlay.querySelector('.effect-level__value'); // инпут глубины эффекта
//var effectLevelLine = imgUploadOverlay.querySelector('.effect-level__line'); // шкала глубины эффекта
var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin'); // ползунок
//var effectLevelDepth = imgUploadOverlay.querySelector('.effect-level__depth'); // глубина эффекта
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
