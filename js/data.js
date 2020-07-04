'use strict';

(function () {
  // Получаем данные с сервера
  var onError = function (message) {
    console.error(message);
  };
  var onSuccess = function (data) {
    console.log(data);
    return data;
  };

  window.load(onSuccess, onError);

  window.data = {
    serverData: onSuccess
  };
})();
