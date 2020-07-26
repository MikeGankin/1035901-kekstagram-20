'use strict';
(function () {
  var imgFilters = document.querySelector('.img-filters');
  imgFilters.classList.remove('img-filters--inactive');

  // 10 случайных, не повторяющихся фотографий
  window.filterRandomPicturesQuantity = function (arr, quantity) {
    return arr.slice()
      .sort(function () {
        return Math.random() - 0.5;
      })
      .slice(0, quantity);
  };

  // Фотографии, отсортированные в порядке убывания количества комментариев
  window.filterDiscussedPictures = function (arr) {
    return arr.slice().sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
  };
})();
