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

var getRandomNumberRange = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}; // функция, генерирующая целое число из заданного диапозона

var createComment = function (comments, names) {
  return {
    avatar: 'img/avatar-' + getRandomNumberRange(1, 6) + '.svg',
    message: comments[getRandomNumberRange(0, comments.length - 1)],
    name: names[getRandomNumberRange(0, names.length - 1)]
  }
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
  }
};// функция, создающая объект с описанием одной фотограффии

var generateArrayPhoto = function () {
  var arrayPhotos = [];
  for (var i = 0; i < 25; i++) {
    arrayPhotos.push(createObjectPhoto(i));
  }
  return arrayPhotos;
}; //функция, генерирующая массив с объектами описария фото

//=======================================================================================================================================

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

//makeFragment(generateArrayPhoto());





