'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  // Генерируем шаблонные элементы
  var createGalleryPicture = function (data) {
    var template = document.querySelector('#picture').content.querySelector('.picture');
    var fragment = document.createDocumentFragment();
    data.forEach(function (item) {
      var element = template.cloneNode(true);
      var elementIndex = window.main.pictures.indexOf(item);
      element.setAttribute('data-order', elementIndex);
      element.querySelector('.picture__img').src = item.url;
      element.querySelector('.picture__comments').textContent = item.comments.length;
      element.querySelector('.picture__likes').textContent = item.likes;
      fragment.appendChild(element);
      pictures.appendChild(fragment);
    });
  };

  window.gallery = {
    pictures: pictures,
    createGalleryPicture: createGalleryPicture,
  };
})();
