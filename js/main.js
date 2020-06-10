'use strict';

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var names = [
  'Миша', 'Андрей', 'Дима', 'Никита', 'Таня', 'Тема'
];

// Случайное число от и до
var randomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

// Случайный элемент массива
function arrayRandElement(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

// Генерируем объекты с комментариями
var generateData = function () {
  var data = [];
  var comment = {
    avatar: 'img/avatar-' + randomInteger(1, 6) + '.svg',
    message: arrayRandElement(comments),
    name: arrayRandElement(names)
  };

  for (var i = 0; i < 25; i++) {
    var post = {
      url: 'photos/' + randomInteger(1, 25) + '.jpg',
      description: 'Вот так надо фоткать!',
      likes: randomInteger(15, 200),
      comments: comment
    };
    data.push(post);
  }
};
generateData();

// Рендерим карточки на страницу
var renderCards = function () {
  var pictures = document.querySelector('.pictures section');
  var template = document.querySelector('#picture').content.querySelector('a');

  for (var i = 1; i < 25; i++) {
    var element = template.cloneNode(true);
    element.querySelector('.picture__img').src = 'photos/' + i + '.jpg';
    pictures.insertAdjacentElement('beforebegin', element);
  }
};
renderCards();
