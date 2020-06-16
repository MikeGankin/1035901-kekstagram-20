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
var ENTER = 13;
var ESC = 27;

// Переменные
var uploadFile = document.querySelector('#upload-file');
var uploadCancel = document.querySelector('#upload-cancel');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
// var effectLevelPin = document.querySelector('.effect-level__pin');
var scaleControlValue = document.querySelector('.scale__control--value');
var smaller = document.querySelector('.scale__control--smaller');
var scaler = document.querySelector('.scale__control--bigger');

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
renderCards(createElement(generatedData));

// Генерируем новую разметку комментариев под фотографией
var generateNewComments = function (data) {
  var socialComments = document.querySelector('.social__comments');
  var dataLength = data.length;
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < dataLength; i++) {
    var newComment = document.createElement('li');
    newComment.classList.add('social__comment');
    var avatar = '<img class="social__picture" src="' +
        data[i].avatar + '"' + 'alt="' +
        data[i].name + '"' + 'width="35" height="35">';
    var text = '<p class=social__text>' + data[i].message + '</p>';
    newComment.innerHTML = avatar + text;
    fragment.appendChild(newComment);
  }
  socialComments.appendChild(fragment);
};

// Рендерим большую карточку и новые комментарии на страницу
var renderBigCard = function (data) {
  // var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = document.querySelector('.big-picture__img img');
  var likesCount = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');
  var socialComments = document.querySelector('.social__comments');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var socialCaption = document.querySelector('.social__caption');
  // document.body.classList.add('modal-open');
  // bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bigPictureImg.src = data.url;
  likesCount.textContent = data.likes;
  commentsCount.textContent = data.comments.length;
  socialCaption.textContent = data.description;
  socialComments.innerHTML = '';

  generateNewComments(data.comments);
};
renderBigCard(generatedData[0]);

// Обрабатываем нажатия на клавишу Esc
var onUploadEscPress = function (e) {
  if (e.keyCode === ESC) {
    e.preventDefault();
    closeUpload();
  }
};

// Обрабатываем нажатия на клавишу Enter
var onUploadEnterPress = function (e) {
  if (e.keyCode === ENTER) {
    e.preventDefault();
    closeUpload();
  }
};

// Открываем форму загрузки
var openUpload = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onUploadEscPress);
  uploadCancel.addEventListener('keydown', onUploadEnterPress);
};

// Закрываем форму загрузки
var closeUpload = function () {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onUploadEscPress);
  uploadCancel.removeEventListener('keydown', onUploadEnterPress);
};

// События открытия и закрытия окна загрузки
uploadFile.addEventListener('change', openUpload);
uploadCancel.addEventListener('click', closeUpload);

// Задаем размер фотографии по умолчанию
var setScaleValue = function () {
  scaleControlValue.setAttribute('value', '100%');
};
setScaleValue();

// Уменьшаем размер фотографии
var decreaseScaleValue = function () {
  var value = scaleControlValue.value;
  var NewNumber = Number.parseInt(value, 10) - 25;
  var newString = String(NewNumber) + '%';
  scaleControlValue.setAttribute('value', newString);
};

// Увеличиваем размер фотографии
var increaseScaleValue = function () {
  var value = scaleControlValue.value;
  var NewNumber = Number.parseInt(value, 10) + 25;
  var newString = String(NewNumber) + '%';
  scaleControlValue.setAttribute('value', newString);
};

// События редактирования изображения
smaller.addEventListener('click', function () {
  if (scaleControlValue.value === 0 && scaleControlValue.value < 100) {
    increaseScaleValue();
  }
});
scaler.addEventListener('click', function () {
  if (scaleControlValue.value === 100 && scaleControlValue.value > 0) {
    decreaseScaleValue();
  }
});
