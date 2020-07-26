'use strict';
(function () {
  var imgFilters = document.querySelector('.img-filters');
  imgFilters.classList.remove('img-filters--inactive');

  // 10 случайных, не повторяющихся фотографий
  window.filterRandomPicturesQuantity = function (arr, quantity) {
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
  window.filterDiscussedPictures = function (arr) {
    var filteredData = [];
    for (var i = 0; i < arr.length; i++) {
      var commentsLength = [];
      var commentsLength = arr[i].comments.length;
      var shuffledArr = arr.sort(function (a, b) {
        return b.commentsLength - a.commentsLength;
      });
    }
    filteredData.push(shuffledArr);
    console.log(filteredData);
  };
})();
