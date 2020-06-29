'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var createElement = window.gallery.createElement;
  var generatedData = window.data.generatedData;

  // Рендерим карточки на страницу
  var renderCards = function (fragment) {
    pictures.appendChild(fragment);
  };
  renderCards(createElement(generatedData));

  window.picture = {
    pictures: pictures
  };
})();
