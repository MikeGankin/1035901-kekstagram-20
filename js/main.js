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

    // Сортируем фотографии
    var sortPictures = function () {
      var filterDefault = document.querySelector('#filter-default');
      var filterRandom = document.querySelector('#filter-random');
      var filterDiscussed = document.querySelector('#filter-discussed');
      var element = window.gallery.pictures;

      // Меняем стили переключателей
      var toggleButtonStyle = function (btn) {
        var filters = document.querySelectorAll('.img-filters__button');
        filters.forEach(function (item) {
          item.classList.remove('img-filters__button--active');
        });
        btn.classList.add('img-filters__button--active');
      };

      // Формируем разметку фотографий по умолчанию
      var onDefaultBtnClick = window.debounce(function () {
        var children = document.querySelectorAll('.picture');
        children.forEach(function (item) {
          element.removeChild(item);
        });
        window.gallery.createGalleryElement(pictures);
      });
      filterDefault.addEventListener('click', function (e) {
        toggleButtonStyle(e.target);
        onDefaultBtnClick();
      });

      // Формируем разметку фотографий по первому фильтру
      var onRandomBtnClick = window.debounce(function () {
        var tenRndPict = window.sort.sortRandomPicturesQuantity(pictures, 10);
        var children = document.querySelectorAll('.picture');
        children.forEach(function (item) {
          element.removeChild(item);
        });
        window.gallery.createGalleryElement(tenRndPict);
      });
      filterRandom.addEventListener('click', function (e) {
        toggleButtonStyle(e.target);
        onRandomBtnClick();
      });

      // Формируем разметку фотографий по второму фильтру
      var onDiscussedBtnClick = window.debounce(function () {
        var discussedPict = window.sort.sortDiscussedPictures(pictures);
        var children = document.querySelectorAll('.picture');
        children.forEach(function (item) {
          element.removeChild(item);
        });
        window.gallery.createGalleryElement(discussedPict);
      });
      filterDiscussed.addEventListener('click', function (e) {
        toggleButtonStyle(e.target);
        onDiscussedBtnClick();
      });
    };
    sortPictures();

    // Сортируем комментарии
    window.sort.chunkArray(pictures);

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
