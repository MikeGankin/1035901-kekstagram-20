'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  // Генерируем шаблонные элементы
  window.createElement = function (data) {
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
  window.generateNewComments = function (data) {
    var socialComments = document.querySelector('.social__comments');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
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

  window.gallery = {
    pictures: pictures
  };
})();
