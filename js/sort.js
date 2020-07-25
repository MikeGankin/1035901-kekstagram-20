'use strict';
(function () {

  var filter = function () {
    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');

    // Фотографии в изначальном порядке с сервера

    // 10 случайных, не повторяющихся фотографий
    var filterRandomPicturesQuantity = function (arr, quantity) {
      var shuffledArr = arr.sort(function () {
        return Math.random() - 0.5;
      });
      var filteredData = [];
      for (var i = 0; i < quantity; i++) {
        filteredData.push(shuffledArr[i]);
      }
      return filteredData;
    };
    // Фотографии, отсортированные в порядке убывания количества комментариев
  };

  window.sort = {
    filter: filter,
    filterRandomPicturesQuantity: filterRandomPicturesQuantity
  };
})();
