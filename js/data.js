'use strict';

(function () {
  // Получаем данные с сервера
  var onError = function (message) {
    console.error(message);
  };
  var onSuccess = function (data) {
    console.log(data);

    var generateData = function () {
      var serverData = data;
      return serverData;
    };
    var generatedData = generateData();

    window.data = {
      generatedData: generatedData
    };
  };

  window.load(onSuccess, onError);
})();
