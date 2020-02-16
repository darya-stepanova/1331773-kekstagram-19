'use strict';
(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var filter = document.querySelector('.img-filters');
  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        window.data.save(xhr.response);
        onSuccess(xhr.response);
        filter.classList.remove('img-filters--inactive');
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000;
    xhr.open('GET', URL);
    xhr.send();
  };
  window.loading = {
    filter: filter
  };
})();

