'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var generatedData = window.data.generatedData;
  var createElement = window.gallery.createElement();

  // Рендерим карточки на страницу
  var renderCards = function (fragment) {
    pictures.appendChild(fragment);
  };
  renderCards(createElement(generatedData));

  window.picture = {
    pictures: pictures
  };
})();
