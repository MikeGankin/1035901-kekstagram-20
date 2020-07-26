'use strict';
(function () {
  var imgFilters = document.querySelector('.img-filters');
  imgFilters.classList.remove('img-filters--inactive');

  // 10 случайных, не повторяющихся фотографий
  var sortRandomPicturesQuantity = function (arr, quantity) {
    return arr.slice()
      .sort(function () {
        return Math.random() - 0.5;
      })
      .slice(0, quantity);
  };

  // Фотографии, отсортированные в порядке убывания количества комментариев
  var sortDiscussedPictures = function (arr) {
    return arr.slice().sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
  };

  window.sort = {
    sortRandomPicturesQuantity: sortRandomPicturesQuantity,
    sortDiscussedPictures: sortDiscussedPictures
  };
})();
