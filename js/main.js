'use strict';

// Константы
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = [
  'Миша', 'Андрей', 'Дима', 'Никита', 'Таня', 'Тема'
];

// Переменные
var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = document.querySelector('.big-picture img');
var likesCount = document.querySelector('.likes-count');
var commentsCount = document.querySelector('.comments-count');
var socialComments = document.querySelector('.social__comments');
var socialCommentCount = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');

// Случайное число от и до
var getRandomInteger = function (min, max) {
  var randNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randNumber);
};

// Случайный элемент массива
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

// Создаем шаблонные элементы с данными
var createElement = function (data) {
  var template = document.querySelector('#picture').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 25; i++) {
    var element = template.cloneNode(true);
    element.querySelector('.picture__img').src = data[i].url;
    element.querySelector('.picture__comments').textContent = data[i].comments.length;
    element.querySelector('.picture__likes').textContent = data[i].likes;
    fragment.appendChild(element);
  }

  return fragment;
};

// Рендерим карточки на страницу
var renderCards = function (fragment) {
  var pictures = document.querySelector('.pictures');
  pictures.appendChild(fragment);
};
renderCards(createElement(generateData()));

// Генерируем новую разметку комментариев под фотографией
var generateNewComments = function (data) {
  var dataLength = data[0].comments.length;
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < dataLength; i++) {
    var newComment = document.createElement('li');
    newComment.classList.add('social__comment');
    var avatar = '<img class="social__picture" src="' +
        data[0].comments[i].avatar + '"' + 'alt="' +
        data[0].comments[i].name + '"' + 'width="35" height="35">';
    var text = '<p class=social__text>' + data[0].comments[i].message + '</p>';
    newComment.innerHTML = avatar + text;
    fragment.appendChild(newComment);
  }

  return fragment;
};

// Рендерим большую карточку и новые комментарии на страницу
var renderBigCard = function (data, fragment) {
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bigPictureImg.src = data[0].url;
  likesCount.textContent = data[0].likes;
  commentsCount.textContent = data[0].comments.length;
  socialComments.innerHTML = '';
  socialComments.appendChild(fragment);
};
renderBigCard(
    generateData(),
    generateNewComments(generateData())
);
