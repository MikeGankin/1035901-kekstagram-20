'use strict';

(function () {
  var pictures = document.querySelector('.pictures');

  // Рендерим карточки на страницу
  var renderCards = function (fragment) {
    pictures.appendChild(fragment);
  };
  renderCards(createElement(generateData));

  window.picture = {
    pictures: pictures
  };
})();
