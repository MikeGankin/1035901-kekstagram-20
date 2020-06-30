'use strict';

(function () {
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('#upload-cancel');
  var textHashtags = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');
  var effectsList = document.querySelector('.img-upload__effects');
  var smaller = document.querySelector('.scale__control--smaller');
  var scaler = document.querySelector('.scale__control--bigger');
  var uploadFile = document.querySelector('#upload-file');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var slider = document.querySelector('.img-upload__effect-level');
  var effectLevelHandler = window.move.effectLevelHandler;

  // Открываем форму загрузки
  var openUpload = function () {
    imgUploadOverlay.classList.remove('hidden');
    // События нажатия на клавиши
    document.addEventListener('keydown', onUploadEscPress);
    uploadCancel.addEventListener('keydown', onUploadEnterPress);
    // Событие закрытия окна загрузки
    uploadCancel.addEventListener('click', onUploadCancelClick);
    // События валидации
    textHashtags.addEventListener('input', hashtagsCustomValidation);
    textDescription.addEventListener('input', descriptionCustomValidation);
    // Событие переключения эффектов
    effectsList.addEventListener('change', effectsChangerHandler);
    // События редактирования размера изображения
    smaller.addEventListener('click', decreaseScaleValueHandler);
    scaler.addEventListener('click', increaseScaleValueHandler);
  };

  // Событие открытия формы загрузки
  uploadFile.addEventListener('change', function () {
    openUpload();
  });

  // Обрабатываем нажатия на клавишу Esc в форме
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
    effectsReset();
    document.removeEventListener('keydown', onUploadEscPress);
    uploadCancel.removeEventListener('keydown', onUploadEnterPress);
    uploadCancel.removeEventListener('click', onUploadCancelClick);
    textHashtags.removeEventListener('input', hashtagsCustomValidation);
    textDescription.removeEventListener('input', descriptionCustomValidation);
    effectsList.addEventListener('change', effectsChangerHandler);
    smaller.removeEventListener('click', decreaseScaleValueHandler);
    scaler.removeEventListener('click', increaseScaleValueHandler);
  };

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

  // Обрабатываем клик по кнопке уменьшения
  var decreaseScaleValueHandler = function () {
    decreaseScaleValue();
  };

  // Обрабатываем клик по кнопке увеличения
  var increaseScaleValueHandler = function () {
    increaseScaleValue();
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

  // Скрываем слайдер эффектов
  var sliderKeeper = function () {
    slider.classList.add('hidden');
  };
  sliderKeeper();

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
      effectLevelPin.addEventListener('mousedown', effectLevelHandler);
    } else {
      effectsReset();
      sliderKeeper();
    }
    if (target.matches(chrome)) {
      imgUploadPreview.className = '';
      imgUploadPreview.style = '';
      imgUploadPreview.classList.add('effects__preview--chrome');
    }
    if (target.matches(sepia)) {
      effectsReset();
      imgUploadPreview.classList.add('effects__preview--sepia');
    }
    if (target.matches(marvin)) {
      effectsReset();
      imgUploadPreview.classList.add('effects__preview--marvin');
    }
    if (target.matches(phobos)) {
      effectsReset();
      imgUploadPreview.classList.add('effects__preview--phobos');
    }
    if (target.matches(heat)) {
      effectsReset();
      imgUploadPreview.classList.add('effects__preview--heat');
    }

    effectsIntensityChanger();
  };

  // Сбрасываем эффект
  var effectsReset = function () {
    imgUploadPreview.className = '';
    imgUploadPreview.style = '';
  };

  // Обрабатываем переключение эффектов
  var effectsChangerHandler = function (e) {
    var target = e.target;
    effectLevelPin.removeEventListener('mouseup', effectLevelHandler);
    effectsChanger(target);
  };

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
})();
