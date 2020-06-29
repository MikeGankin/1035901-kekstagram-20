'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var pictures = window.gallery.pictures;
  var generatedData = window.data.generatedData;
  var generateNewComments = window.gallery.generateNewComments;

  // Рендерим большую карточку и новые комментарии на страницу
  var renderBigCard = function (data) {
    var bigPictureImg = document.querySelector('.big-picture__img img');
    var likesCount = document.querySelector('.likes-count');
    var commentsCount = document.querySelector('.comments-count');
    var socialComments = document.querySelector('.social__comments');
    var socialCommentCount = document.querySelector('.social__comment-count');
    var commentsLoader = document.querySelector('.comments-loader');
    var socialCaption = document.querySelector('.social__caption');
    showCard();
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    bigPictureImg.src = data.url;
    likesCount.textContent = data.likes;
    commentsCount.textContent = data.comments.length;
    socialCaption.textContent = data.description;
    socialComments.innerHTML = '';
    generateNewComments(data.comments);
  };

  // Реализуем показ всех фотографий
  var picturesHandler = function (e) {
    var target = e.target.closest('.picture');
    renderBigCard(generatedData[target.dataset.order]);
  };
  pictures.addEventListener('click', picturesHandler);

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
  };

  // Обрабатываем нажатия на клавишу Esc на фотографии
  var onPictureEscPress = function (e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      hideCard();
    }
  };
})();
