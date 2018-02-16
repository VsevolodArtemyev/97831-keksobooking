'use strict';

(function () {

  var sendRequest = function (url, type, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(type, url);
    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };
  window.backend = {
    load: function (onLoad, onError) {
      sendRequest('https://js.dump.academy/keksobooking/data', 'GET', onLoad, onError);
    },
    save: function (data, onLoad, onError) {
      sendRequest('https://js.dump.academy/keksobooking', 'POST', onLoad, onError, data);
    }
  };
})();
