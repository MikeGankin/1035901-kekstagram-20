'use strict';
(function () {
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  var effectLevelHandler = function (e) {
    e.preventDefault();

    var width = effectLevelLine.clientWidth;

    var startCoords = {
      x: e.clientX,
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };

      var totalCord = effectLevelPin.offsetLeft - shift.x;

      if (totalCord < 0) {
        return;
      }
      if (totalCord === 0) {
        effectLevelPin.style.left = '0';
        effectLevelDepth.style.width = '0';
      }
      if (totalCord <= width) {
        effectLevelPin.style.left = totalCord + 'px';
        effectLevelDepth.style.width = totalCord + 'px';
      }
      window.form.changeEffectsIntensity();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          effectLevelPin.removeEventListener('click', onClickPreventDefault);
        };
        effectLevelPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.move = {
    effectLevelHandler: effectLevelHandler
  };
})();
