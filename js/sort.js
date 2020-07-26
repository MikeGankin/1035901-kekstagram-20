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

  // Комментарии, по 5 штук
  function chunkArray(arr) {
    var chunkedArray = [];
    for (var i = 0; i < arr.length; i += 5) {
      var myChunk = arr.slice(i, i + 5);
      chunkedArray.push(myChunk);
    }
    console.log(chunkedArray);
    return chunkedArray;
  }

  window.sort = {
    sortRandomPicturesQuantity: sortRandomPicturesQuantity,
    sortDiscussedPictures: sortDiscussedPictures,
    chunkArray: chunkArray
  };
})();
