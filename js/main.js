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
var uploadFile = document.querySelector('#upload-file');
var uploadCancel = document.querySelector('#upload-cancel');
var scaleControlValue = document.querySelector('.scale__control--value');
var smaller = document.querySelector('.scale__control--smaller');
var scaler = document.querySelector('.scale__control--bigger');
var imgUploadPreview = document.querySelector('.img-upload__preview img');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var effectsList = document.querySelector('.img-upload__effects');
var slider = document.querySelector('.img-upload__effect-level');
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelDepth = document.querySelector('.effect-level__depth');
var imgUploadForm = document.querySelector('.img-upload__form');
var textHashtags = document.querySelector('.text__hashtags');
var textDescription = document.querySelector('.text__description');

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

// Обрабатываем открытие формы загрузки фото
var onUploadChangeHandler = function () {
  openUpload();
};

// Открываем форму загрузки
var openUpload = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onUploadEscPress);
  uploadCancel.addEventListener('keydown', onUploadEnterPress);
};

// Обрабатываем нажатия на клавишу Esc
var onUploadEscPress = function (e) {
  if (textHashtags !== document.activeElement && textDescription !== document.activeElement && e.key === 'Escape') {
    e.preventDefault();
    closeUpload();
  }
};

// Обрабатываем нажатия на клавишу Enter
var onUploadEnterPress = function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    closeUpload();
  }
};

// Обрабатываем клик на кнопку 'закрыть'
var onUploadCancelClick = function () {
  closeUpload();
};

// Закрываем форму загрузки
var closeUpload = function () {
  imgUploadOverlay.classList.add('hidden');
  uploadFile.value = '';
  document.removeEventListener('keydown', onUploadEscPress);
  uploadCancel.removeEventListener('keydown', onUploadEnterPress);
  textHashtags.removeEventListener('input', hashtagsCustomValidation);
  textDescription.removeEventListener('input', descriptionCustomValidation);
};

// События открытия и закрытия окна загрузки
uploadFile.addEventListener('change', onUploadChangeHandler);
uploadCancel.addEventListener('click', onUploadCancelClick);

// Задаем размер фотографии по умолчанию
var setScaleValue = function () {
  scaleControlValue.setAttribute('value', '100%');
};
setScaleValue();

// Уменьшаем размер фотографии
var decreaseScaleValue = function () {
  var value = scaleControlValue.value;
  var newNumber = Number.parseInt(value, 10) - 25;
  if (newNumber >= 25) {
    var newString = String(newNumber) + '%';
    scaleControlValue.setAttribute('value', newString);
    imgUploadPreview.style = 'transform: scale(0.' + newNumber + ')';
  }
};

// Увеличиваем размер фотографии
var increaseScaleValue = function () {
  var value = scaleControlValue.value;
  var newNumber = Number.parseInt(value, 10) + 25;
  if (newNumber <= 100) {
    var newString = String(newNumber) + '%';
    scaleControlValue.setAttribute('value', newString);
    if (newNumber === 100) {
      imgUploadPreview.style = 'transform: scale(1)';
    } else {
      imgUploadPreview.style = 'transform: scale(0.' + newNumber + ')';
    }
  }
};

// События редактирования размера изображения
smaller.addEventListener('click', function () {
  decreaseScaleValue();
});
scaler.addEventListener('click', function () {
  increaseScaleValue();
});

// Скрываем слайдер эффектов
var sliderKeeper = function () {
  slider.classList.add('hidden');
};
sliderKeeper();

// Получаем позицию пина
var takePinPosition = function () {
  var width = effectLevelLine.clientWidth;
  var depth = effectLevelDepth.clientWidth;
  var position = (depth / width);
  return position;
};

// Управляем интенсивностью эффектов
var effectsIntensityChanger = function () {
  var fraction = takePinPosition().toFixed(1);
  var percent = (takePinPosition() * 100).toFixed() + '%';
  var pixel = (3 / 100) * (takePinPosition() * 100).toFixed() + 'px';

  if (imgUploadPreview.classList.contains('effects__preview--chrome')) {
    imgUploadPreview.style = 'filter: grayscale(' + fraction + ')';
  }
  if (imgUploadPreview.classList.contains('effects__preview--sepia')) {
    imgUploadPreview.style = 'filter: sepia(' + fraction + ')';
  }
  if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
    imgUploadPreview.style = 'filter: invert(' + percent + ')';
  }
  if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
    imgUploadPreview.style = 'filter: blur(' + pixel + ')';
  }
  if (imgUploadPreview.classList.contains('effects__preview--heat')) {
    imgUploadPreview.style = 'filter: brightness(' + fraction + ')';
  }
};

// Меняем эффекты на фотографии
var effectsChanger = function (target) {
  var none = '#effect-none';
  var chrome = '#effect-chrome';
  var sepia = '#effect-sepia';
  var marvin = '#effect-marvin';
  var phobos = '#effect-phobos';
  var heat = '#effect-heat';

  if (!target.matches(none)) {
    slider.classList.remove('hidden');
    effectLevelPin.addEventListener('mouseup', effectsIntensityChanger);
  } else {
    imgUploadPreview.className = '';
    imgUploadPreview.style = '';
    slider.classList.add('hidden');
  }
  if (target.matches(chrome)) {
    imgUploadPreview.className = '';
    imgUploadPreview.style = '';
    imgUploadPreview.classList.add('effects__preview--chrome');
  }
  if (target.matches(sepia)) {
    imgUploadPreview.className = '';
    imgUploadPreview.style = '';
    imgUploadPreview.classList.add('effects__preview--sepia');
  }
  if (target.matches(marvin)) {
    imgUploadPreview.className = '';
    imgUploadPreview.style = '';
    imgUploadPreview.classList.add('effects__preview--marvin');
  }
  if (target.matches(phobos)) {
    imgUploadPreview.className = '';
    imgUploadPreview.style = '';
    imgUploadPreview.classList.add('effects__preview--phobos');
  }
  if (target.matches(heat)) {
    imgUploadPreview.className = '';
    imgUploadPreview.style = '';
    imgUploadPreview.classList.add('effects__preview--heat');
  }
};

// Событие переключения эффектов
effectsList.addEventListener('change', function (e) {
  var target = e.target;
  effectLevelPin.removeEventListener('mouseup', effectsIntensityChanger);
  effectsChanger(target);
});

// Валидируем хеш-теги
var hashtagsCustomValidation = function () {
  var reg = /^#[0-9a-zA-Zа-яА-Я]+$/;
  var hashtagsArr = textHashtags.value.trim().toLowerCase().split(' ');

  for (var i = 0; i < hashtagsArr.length; i++) {
    if (hashtagsArr[i] === '') {
      continue;
    } else if (hashtagsArr[i][0] !== '#') {
      textHashtags.setCustomValidity('Хеш-тег должен начинаться с решётки');
      textHashtags.reportValidity();
      return;
    } else if (hashtagsArr[i].length > 20) {
      textHashtags.setCustomValidity('Хеш-тег не должен быть длиннее 20 символов');
      textHashtags.reportValidity();
      return;
    } else if (hashtagsArr.length > 5) {
      textHashtags.setCustomValidity('Максимальное количество хеш-тегов 5');
      textHashtags.reportValidity();
      return;
    } else if (hashtagsArr[i].length <= 1) {
      textHashtags.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
      textHashtags.reportValidity();
      return;
    } else if (i !== hashtagsArr.indexOf(hashtagsArr[i]) || i !== hashtagsArr.lastIndexOf(hashtagsArr[i])) {
      textHashtags.setCustomValidity('Хеш-теги не должны повторяться');
      textHashtags.reportValidity();
      return;
    } else if (hashtagsArr[i].search(reg) === -1) {
      textHashtags.setCustomValidity('Хеш-теги пишутся через пробел и могут состоять только из букв и цифр');
      textHashtags.reportValidity();
      return;
    } else {
      textHashtags.setCustomValidity('');
    }
  }
};

// Валидируем описание
var descriptionCustomValidation = function () {
  var descriptionArr = textDescription.value.toLowerCase();

  for (var i = 0; i < descriptionArr.length; i++) {
    if (descriptionArr.length > 140) {
      textDescription.reportValidity();
      textDescription.setCustomValidity('Количество символов не должно превышать 140');
    } else {
      textHashtags.setCustomValidity('');
    }
  }
};

// События валидации
textHashtags.addEventListener('input', hashtagsCustomValidation);
textDescription.addEventListener('input', descriptionCustomValidation);
