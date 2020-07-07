'use strict';

(function () {
  // Получаем данные с сервера
  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    console.log(data);

    // Формируем разметку фотографий
    window.createElement(data);

    // Реализуем показ всех фотографий
    var picturesHandler = function (e) {
      var target = e.target.closest('.picture');
      if (target) {
        window.renderBigCard(data[target.dataset.order]);
      }
    };

    // Событие клика по миниатюре фотографии
    window.gallery.pictures.addEventListener('click', picturesHandler);
  };

  window.load(onSuccess, onError);
})();
