'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  // Генерируем шаблонные элементы
  var createGalleryElement = function (data) {
    var template = document.querySelector('#picture').content.querySelector('.picture');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var element = template.cloneNode(true);
      element.setAttribute('data-order', i);
      element.querySelector('.picture__img').src = data[i].url;
      element.querySelector('.picture__comments').textContent = data[i].comments.length;
      element.querySelector('.picture__likes').textContent = data[i].likes;
      fragment.appendChild(element);
      pictures.appendChild(fragment);
    }
  };

  // Генерируем новую разметку комментариев под фотографией
  var generateNewComments = function (data) {
    var socialComments = document.querySelector('.social__comments');
    var socialCommentsLoader = document.querySelector('.social__comments-loader');
    var fragment = document.createDocumentFragment();
    var comments = data.comments;

    var createCommentHtml = function (item) {
      var newComment = document.createElement('li');
      newComment.classList.add('social__comment');
      fragment.appendChild(newComment);
      var avatar = '<img class="social__picture" src="' +
      item.avatar + '"' + 'alt="' +
      item.name + '"' + 'width="35" height="35">';
      var text = '<p class=social__text>' + item.message + '</p>';
      newComment.innerHTML = avatar + text;
      return newComment;
    };

    // Показываем первые 5 комментариев
    comments.slice(0, 5).forEach(function (item) {
      createCommentHtml(item);
    });
    socialComments.appendChild(fragment);

    // Показываем дополнительные 5 комментариев по нажатию кнопки
    socialCommentsLoader.addEventListener('click', function chunkArray() {
      comments.slice(5).forEach(function (item) {
        createCommentHtml(item);
      });
      socialComments.appendChild(fragment);
    });
  };

  window.gallery = {
    pictures: pictures,
    generateNewComments: generateNewComments,
    createGalleryElement: createGalleryElement
  };
})();
