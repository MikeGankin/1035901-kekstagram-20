'use strict';

(function () {
  // Получаем данные с сервера
  var onLoadError = function (message) {
    throw new Error(message);
  };

  var pictures = [];

  var onLoadSuccess = function (data) {
    // Формируем разметку фотографий по умолчанию
    window.gallery.createGalleryElement(data);

    // Формируем разметку фотографий по первому фильтру
    var filterRandom = document.querySelector('#filter-random');
    var tenRndPict = window.sort.filterRandomPicturesQuantity(data, 10);
    filterRandom.addEventListener('click', function () {
      window.gallery.createGalleryElement(tenRndPict);
    });

    // Реализуем показ всех фотографий
    var picturesHandler = function (e) {
      var target = e.target.closest('.picture');
      if (target) {
        window.preview.renderBigCard(data[target.dataset.order]);
      }
    };

    // Событие клика по миниатюре фотографии
    window.gallery.pictures.addEventListener('click', picturesHandler);

    // Сохраняем данные
    pictures = data;
    window.sort.filter(pictures);
  };

  window.load(onLoadSuccess, onLoadError);
})();
