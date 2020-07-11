'use strict';

window.gallery = (function () {
  var NUMBER_FOTOS = 25; // количество фото
  var templatePicture = document.querySelector('#picture').content.querySelector('.picture'); // шаблон для создания DOM-элементов
  var blockPicture = document.querySelector('.pictures'); // блок для загрузки DOM-элементов

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

  makeFragment(window.data.generateArrayPhoto());
})();
