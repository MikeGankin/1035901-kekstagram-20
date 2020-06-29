'use strict';

(function () {
  // Массив комментариев
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  // Массив имен
  var NAMES = [
    'Миша', 'Андрей', 'Дима', 'Никита', 'Таня', 'Тема'
  ];

  // Получаем случайное число от и до
  var getRandomInteger = function (min, max) {
    var randNumber = min + Math.random() * (max + 1 - min);
    return Math.floor(randNumber);
  };

  // Получаем случайный элемент массива
  var getArrayRandElement = function (arr) {
    var randElement = Math.floor(Math.random() * arr.length);
    return arr[randElement];
  };

  // Генерируем объекты с комментариями к фотографиям
  var generateComments = function () {
    var comments = [];
    for (var i = 0; i < getRandomInteger(2, 6); i++) {
      var comment = {
        avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
        message: getArrayRandElement(COMMENTS),
        name: getArrayRandElement(NAMES)
      };
      comments.push(comment);
    }
    return comments;
  };

  // Генерируем объекты с фотографиям и добавляем комментарии
  var generateData = function () {
    var data = [];
    for (var i = 0; i < 25; i++) {
      var post = {
        url: 'photos/' + (i + 1) + '.jpg',
        description: 'Вот так надо фоткать!',
        likes: getRandomInteger(15, 200),
        comments: generateComments()
      };
      data.push(post);
    }
    return data;
  };
  var generatedData = generateData();

  window.data = {
    generatedData: generatedData
  };
})();
