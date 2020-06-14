'use strict';

var NUMBER_FOTOS = 25; // количество фото
var MIN_NUNBER_LIKES = 15; // минимальное число лайков
var MAX_NUNBER_LIKES = 200; // максимальное число лайков
var COMMENTS = [
  '"Всё отлично!"',
  '"В целом всё неплохо. Но не всё."',
  '"Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально."',
  '"Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше."',
  '"Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше."',
  '"Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"'
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
var bigPicture = document.querySelector('.big-picture'); // section полноэкранного показа изображения
var bigPictureImg = document.querySelector('.big-picture__img'); // блок просмотра большого изображения

var createRandomNumberRange = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}; // функция, генерирующая целое число из заданного диапозона

var createComments = function () {
  var comments = [];
  if (Math.random() > 0.5) {
    comments[0] = COMMENTS [createRandomNumberRange(0, COMMENTS.length - 1)] + ' Автор: ' + NAMES[createRandomNumberRange(0, NAMES.length - 1)] + '.';
    comments[1] = COMMENTS [createRandomNumberRange(0, COMMENTS.length - 1)] + ' Автор: ' + NAMES[createRandomNumberRange(0, NAMES.length - 1)] + '.';
  } else {
    comments[0] = COMMENTS [createRandomNumberRange(0, COMMENTS.length - 1)] + ' Автор: ' + NAMES[createRandomNumberRange(0, NAMES.length - 1)] + '.';
  }
  return comments;
}; // функция, создающая комментарии

var createDescriptionFoto = function (number) {
  return {
    url: 'photos/' + (number + 1) + '.jpg',
    likes: createRandomNumberRange(MAX_NUNBER_LIKES, MIN_NUNBER_LIKES),
    comments: createComments()
  };
}; // функция, создающая один объект описания фото

var createArrayPhoto = function (number) {
  var arrayPhotos = [];
  for (var i = 0; i < number; i++) {
    arrayPhotos[i] = createDescriptionFoto(i);
  }
  return arrayPhotos;
}; // функция, создающая массив с объектами описания фото


var makePicture = function (picture) {
  var elPicture = templatePicture.cloneNode(true);
  elPicture.querySelector('.picture__img').src = picture.url;
  elPicture.querySelector('.picture__comments').textContent = picture.comments;
  elPicture.querySelector('.picture__likes').textContent = picture.likes;
  return elPicture;
}; // фуекция, создающая один DOM-элемент по шаблону

var makeFragment = function (picture) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < NUMBER_FOTOS; i++) {
    fragment.appendChild(makePicture(picture[i]));
  }
  blockPicture.appendChild(fragment);
}; // функция, создающая все DOM-элементы, записывает их все в документ фрагмент и помещающая их на страницу.

var bigFoto = function (picture) {
  bigPicture.classList.remove('hidden');
  bigPictureImg.querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
}; // функция, большое фото

makeFragment(createArrayPhoto(NUMBER_FOTOS));

bigFoto(createArrayPhoto(NUMBER_FOTOS)[3]);





