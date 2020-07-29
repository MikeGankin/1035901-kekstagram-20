'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var socialCommentsLoader = document.querySelector('.social__comments-loader');
  var socialComments = document.querySelector('.social__comments');
  var baseCount = document.querySelector('.base-count');
  var comments = [];
  var count = 0;

  // Рендерим большую карточку и новые комментарии на страницу
  var renderBigCard = function (data) {
    var bigPictureImg = document.querySelector('.big-picture__img img');
    var likesCount = document.querySelector('.likes-count');
    var commentsCount = document.querySelector('.comments-count');
    var socialCaption = document.querySelector('.social__caption');
    showCard();
    bigPictureImg.src = data.url;
    likesCount.textContent = data.likes;
    commentsCount.textContent = data.comments.length;
    socialCaption.textContent = data.description;
    socialComments.innerHTML = '';
    generateNewComments(data);
  };

  // Генерируем новую разметку комментариев под фотографией
  var generateNewComments = function (data) {
    comments = data.comments;
    var newComments = comments.slice(0, 5);
    var fragment = createNewComments(newComments);
    count += newComments.length;
    socialComments.appendChild(fragment);
    baseCount.textContent = count;
    if (comments.length <= 5) {
      socialCommentsLoader.classList.add('hidden');
    } else {
      socialCommentsLoader.classList.remove('hidden');
    }
    return fragment;
  };

  // Показываем дополнительные 5 комментариев по нажатию кнопки
  var createNewComments = function (newComments) {
    var fragment = document.createDocumentFragment();
    newComments.forEach(function (item) {
      var newComment = document.createElement('li');
      newComment.classList.add('social__comment');
      fragment.appendChild(newComment);
      var avatar = '<img class="social__picture" src="' +
      item.avatar + '"' + 'alt="' +
      item.name + '"' + 'width="35" height="35">';
      var text = '<p class=social__text>' + item.message + '</p>';
      newComment.innerHTML = avatar + text;
    });
    return fragment;
  };

  socialCommentsLoader.addEventListener('click', function () {
    var newComments = comments.slice(count, count + 5);
    var fragment = createNewComments(newComments);
    count += newComments.length;
    baseCount.textContent = count;
    socialComments.appendChild(fragment);
    if (count === comments.length) {
      socialCommentsLoader.classList.add('hidden');
    }
  });

  // Показываем карточку в разметке
  var showCard = function () {
    document.body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onPictureEscPress);
    bigPictureCancel.addEventListener('click', hideCard);
  };

  // Скрываем карточку из разметки
  var hideCard = function () {
    document.body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    bigPictureCancel.removeEventListener('click', hideCard);
    document.removeEventListener('keydown', onPictureEscPress);
    comments = [];
    count = 0;
  };

  // Обрабатываем нажатия на клавишу Esc на фотографии
  var onPictureEscPress = function (e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      hideCard();
    }
  };

  window.preview = {
    renderBigCard: renderBigCard,
    generateNewComments: generateNewComments,
    bigPicture: bigPicture
  };
})();
