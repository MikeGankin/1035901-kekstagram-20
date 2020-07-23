'use strict';

(function () {
  // Получаем данные с сервера
  var onLoadError = function (message) {
    throw new Error(message);
  };

  var onLoadSuccess = function (data) {
    // Формируем разметку фотографий
    window.gallery.createGalleryElement(data);

    // Реализуем показ всех фотографий
    var picturesHandler = function (e) {
      var target = e.target.closest('.picture');
      if (target) {
        window.preview.renderBigCard(data[target.dataset.order]);
      }
    };

    // Событие клика по миниатюре фотографии
    window.gallery.pictures.addEventListener('click', picturesHandler);
  };

  window.load(onLoadSuccess, onLoadError);
})();
