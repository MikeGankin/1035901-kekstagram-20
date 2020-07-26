'use strict';

(function () {
  // Получаем данные с сервера
  var onLoadError = function (message) {
    throw new Error(message);
  };

  var pictures = [];

  var onLoadSuccess = function (data) {
    // Сохраняем данные
    pictures = data;

    // Передаем данные в галерею
    window.gallery.createGalleryElement(pictures);

    var filterDefault = document.querySelector('#filter-default');
    var filterRandom = document.querySelector('#filter-random');
    var filterDiscussed = document.querySelector('#filter-discussed');
    var element = window.gallery.pictures;

    // Получаем количество фотографий
    // var getChildren = function () {
    //   var children = document.querySelectorAll('.picture');
    //   return children;
    // };

    // Формируем разметку фотографий по умолчанию
    filterDefault.addEventListener('click', function () {
      var children = document.querySelectorAll('.picture');
      for (var i = 0; i < children.length; i++) {
        element.removeChild(children[i]);
      }
      setTimeout(function () {
        window.gallery.createGalleryElement(pictures);
      }, 500);
    });

    // Формируем разметку фотографий по первому фильтру
    var tenRndPict = window.filterRandomPicturesQuantity(pictures, 10);
    filterRandom.addEventListener('click', function () {
      var children = document.querySelectorAll('.picture');
      for (var i = 0; i < children.length; i++) {
        element.removeChild(children[i]);
      }
      setTimeout(function () {
        window.gallery.createGalleryElement(tenRndPict);
      }, 500);
    });

    // Формируем разметку фотографий по первому фильтру
    var discussedPict = window.filterDiscussedPictures(pictures);
    filterDiscussed.addEventListener('click', function () {
      var children = document.querySelectorAll('.picture');
      for (var i = 0; i < children.length; i++) {
        element.removeChild(children[i]);
      }
      setTimeout(function () {
        window.gallery.createGalleryElement(discussedPict);
      }, 500);
    });

    // Реализуем показ больших фотографий
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
