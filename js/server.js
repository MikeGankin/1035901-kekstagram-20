'use strict';

(function () {
  var LOAD_URL = 'https://javascript.pages.academy/kekstagram/data';
  var UPLOAD_URL = 'https://javascript.pages.academy/kekstagram';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var checkServerResponse = function (xhr, onSuccess, onError) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
  };

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    checkServerResponse(xhr, onSuccess, onError);

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    checkServerResponse(xhr, onSuccess, onError);

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  window.server = {
    load: load,
    upload: upload
  };
})();
